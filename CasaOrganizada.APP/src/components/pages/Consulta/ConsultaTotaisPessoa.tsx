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
import { PessoaService } from "../../../services/pessoa/PessoaService";
import { TransaçãoService } from "../../../services/Transação/TransaçãoService";

function ConsultarTotaisPessoa() {
    const [totais, setTotais] = useState<{ nome: string, despesa: number, receita: number, total: number }[]>([]);
    const [totalReceita, setTotalReceita] = useState(0);
    const [totalDespesa, setTotalDespesa] = useState(0);
    const [totalCasa, setTotalCasa] = useState(0);

    useEffect(() => {
        const carregarDados = async () => {
            var servicePessoa = new PessoaService();
            var serviceTransação = new TransaçãoService();

            var pessoas = await servicePessoa.buscarPessoas();
            var transações = await serviceTransação.buscarTransaçãos();

            calcularTotaisPorPessoa(pessoas, transações);
        };
        carregarDados();
    }, []);

    function calcularTotaisPorPessoa(pessoas: any, transações: any) {
        let somaTotalCasa = 0;
        let somaReceita = 0;
        let somaDespesa = 0;


        const totaisCasa = pessoas.map((pessoa: any) => {
            const nome = pessoa.nome;
            const transaçõesPessoa = transações.filter((transação: any) => transação.pessoaId === pessoa.id);
            const despesa = transaçõesPessoa.filter((transação: any) => transação.tipo === 0).reduce((acc: number, transação: any) => acc + transação.valor, 0);
            const receita = transaçõesPessoa.filter((transação: any) => transação.tipo === 1).reduce((acc: number, transação: any) => acc + transação.valor, 0);
            const totalPessoa = receita - despesa;

            somaTotalCasa += totalPessoa;
            somaReceita += receita;
            somaDespesa += despesa;
            return { nome, despesa, receita, total: totalPessoa };
        });

        setTotais(totaisCasa);
        setTotalCasa(somaTotalCasa);
        setTotalReceita(somaReceita);
        setTotalDespesa(somaDespesa);
    }

    return (
        <div className="Pessoas">
            <h1>Consultar Totais por Pessoa!</h1>

            <Flex direction="column" gap={6}>
                <TableContainer borderColor="gray.200">
                    <Table variant='simple'>
                        <Thead bg="gray.50">
                            <Tr>
                                <Th>Nome</Th>
                                <Th isNumeric>Receita</Th>
                                <Th isNumeric>Despesa</Th>
                                <Th isNumeric>Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {totais.map(({ nome, despesa, receita, total }, index) => (
                                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                                    <Td>{nome}</Td>
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

export default ConsultarTotaisPessoa;