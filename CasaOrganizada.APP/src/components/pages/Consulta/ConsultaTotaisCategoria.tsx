import {
    Flex,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    TableContainer,
    TableCaption,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CategoriaService } from "../../../services/categoria/CategoriaService";
import { TransaçãoService } from "../../../services/Transação/TransaçãoService";

function ConsultarTotaisCategoria() {
    const [totais, setTotais] = useState<{ descrição: string, despesa: number, receita: number, total: number }[]>([]);
    const [totalReceita, setTotalReceita] = useState(0);
    const [totalDespesa, setTotalDespesa] = useState(0);
    const [totalCasa, setTotalCasa] = useState(0);

    useEffect(() => {
        const carregarDados = async () => {
            var serviceCategoria = new CategoriaService();
            var serviceTransação = new TransaçãoService();

            var categorias = await serviceCategoria.buscarCategorias();
            var transações = await serviceTransação.buscarTransaçãos();

            calcularTotaisPorCategoria(categorias, transações);
        };
        carregarDados();
    }, []);

    function calcularTotaisPorCategoria(categorias: any, transações: any) {
        let somaReceitaCategoria = 0;
        let somaDespesaCategoria = 0;
        let somaTotalCasa = 0;

        const totaisCasa = categorias.map((categoria: any) => {          
            const descrição = categoria.descrição;
            const transaçõesCategoria = transações.filter((transação: any) => transação.categoriaId === categoria.id);
            const despesa = transaçõesCategoria.filter((transação: any) => transação.tipo === 0).reduce((acc: number, transação: any) => acc + transação.valor, 0);
            const receita = transaçõesCategoria.filter((transação: any) => transação.tipo === 1).reduce((acc: number, transação: any) => acc + transação.valor, 0);            
            const totalCategoria = receita - despesa;

            somaReceitaCategoria += receita;
            somaDespesaCategoria += despesa;
            somaTotalCasa += totalCategoria;

            return { descrição, despesa, receita, totalReceita: somaReceitaCategoria, totalDespesa: somaDespesaCategoria, total: totalCategoria };
        });

        setTotais(totaisCasa);
        setTotalReceita(somaReceitaCategoria);
        setTotalDespesa(somaDespesaCategoria);
        setTotalCasa(somaTotalCasa);
    }

    return (
        <div className="Categorias">
            <h1>Consultar Totais por Categoria!</h1>

            <Flex direction="column" gap={6}>
                <TableContainer borderColor="gray.200">
                    <Table variant='simple'>
                        <Thead bg="gray.50">
                            <Tr>
                                <Th>Descrição</Th>
                                <Th isNumeric>Receita</Th>
                                <Th isNumeric>Despesa</Th>
                                <Th isNumeric>Saldo</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {totais.map(({ descrição, despesa, receita, total }, index) => (
                                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                                    <Td>{descrição}</Td>
                                    <Td maxW="100" isNumeric>R${receita.toFixed(2)}</Td>
                                    <Td maxW="100" isNumeric>R${despesa.toFixed(2)}</Td>
                                    <Td maxW="100" isNumeric>R${total.toFixed(2)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Total</Th>
                                <Th isNumeric>R${totalReceita.toFixed(2)}</Th>
                                <Th isNumeric>R${totalDespesa.toFixed(2)}</Th>
                                <Th isNumeric>R${totalCasa.toFixed(2)}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Flex>
        </div>
    );
}

export default ConsultarTotaisCategoria;