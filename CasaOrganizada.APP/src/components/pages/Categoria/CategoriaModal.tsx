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
    Textarea,
    Box,
    Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { Categoria, CategoriaService } from "../../../services/categoria/categoriaService";

const CategoriaModal = ({ isOpen, onClose }: any) => {
    const [descrição, setDescrição] = useState("");
    const [finalidade, setFinalidade] = useState(0);

    async function salvarCategoria(e: any) {
        e.preventDefault();

        var categoria = new Categoria();
        categoria.descrição = descrição;
        categoria.finalidade = finalidade;

        try {
            var service = new CategoriaService();
            await service.incluirCategoria(categoria)
                .then(() => { resetarCampos(); location.reload(); })
                .catch((error) => { alert("ops! \n" + error.response.data.message); });
        } catch (err) {
            console.error("Erro: " + err);
        }
    };

    function resetarCampos() {
        setDescrição("");
        setFinalidade(0);
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Categoria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Finalidade:</FormLabel>
                                <Select onChange={(e) => setFinalidade(Number(e.target.value))}>
                                    <option value='0'>Despesa</option>
                                    <option value='1'>Receita</option>
                                    <option value='2'>Ambas</option>
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel>Descrição:</FormLabel>
                                <Textarea rows={5} onChange={(e) => setDescrição(e.target.value)} maxLength={400} />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={salvarCategoria}>SALVAR</Button>
                        <Button colorScheme="red" onClick={onClose}>CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CategoriaModal;