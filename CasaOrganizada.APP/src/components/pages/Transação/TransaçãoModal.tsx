import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    Alert,
    Select,
    Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TipoTransação, Transação, TransaçãoService } from "../../../services/Transação/TransaçãoService";
import { CategoriaService, Finalidade, type Categoria } from "../../../services/categoria/CategoriaService";
import { PessoaService, type Pessoa } from "../../../services/pessoa/PessoaService";

const TransaçãoModal = ({ isOpen, onClose }: any) => {

    const [descrição, setDescrição] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState(TipoTransação.Despesa);
    const [categoriaId, setCategoriaId] = useState(0);
    const [pessoaId, setPessoaId] = useState(0);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriasTela, setCategoriasTela] = useState<Categoria[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    function filtrarCategorias() {
        if (tipo === 0) {
            setCategoriasTela(categorias.filter((categoria) => categoria.finalidade !== 1));
        } else {
            setCategoriasTela(categorias.filter((categoria) => categoria.finalidade !== 0));
        }
    }

    useEffect(() => {
        new CategoriaService().buscarCategorias().then((result) => setCategorias(result));
        new PessoaService().buscarPessoas().then((result) => setPessoas(result));
    }, []);

    useEffect(() => {
        filtrarCategorias();
    }, [tipo, categorias]);

    async function salvarTransação(e: any) {
        e.preventDefault();

        var transação = new Transação();
        transação.descrição = descrição;
        transação.tipo = tipo;
        transação.valor = valor ? parseFloat(valor) : 0;
        transação.categoriaId = categoriaId;
        transação.pessoaId = pessoaId;

        try {
            var service = new TransaçãoService();
            await service.incluirTransação(transação)
                .then(() => { resetarCampos(); location.reload(); })
                .catch((error) => { alert("ops! ocorreu um erro" + error.response.data.message); });

        } catch (err) {
            console.error("Erro: " + err);
            alert("ops!" + err);
        }
    };

    function resetarCampos() {
        setDescrição("");
        setTipo(TipoTransação.Despesa);
        setValor("");
        setCategoriaId(0);
        setPessoaId(0);
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Transação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Tipo:</FormLabel>
                                <Select value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
                                    <option value='0'>Despesa</option>
                                    <option value='1'>Receita</option>
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel>Categoria:</FormLabel>
                                <Select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))}>
                                    <option value="">Selecionar Categoria...</option>
                                    {categoriasTela.map((categoria: any) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.descrição} - {Finalidade[categoria.finalidade]}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel>Descrição:</FormLabel>
                                <Textarea rows={5} onChange={(e) => setDescrição(e.target.value)} maxLength={400} />
                            </Box>
                            <Box>
                                <FormLabel>Valor:</FormLabel>
                                <Input type="number" step="0.01" onChange={(e) => setValor(Number(e.target.value))} />
                            </Box>
                            <Box>
                                <FormLabel>Pessoa:</FormLabel>
                                <Select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
                                    <option value="">Selecionar Pessoa...</option>
                                    {pessoas.map((pessoa: any) => (
                                        <option key={pessoa.id} value={pessoa.id}>
                                            {pessoa.nome}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={salvarTransação}>SALVAR</Button>
                        <Button colorScheme="red" onClick={onClose}>CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

};

export default TransaçãoModal;