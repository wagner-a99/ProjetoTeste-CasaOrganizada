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
} from "@chakra-ui/react";
import { useState } from "react";
import { Pessoa, PessoaService } from "../../../services/pessoa/PessoaService";

const PessoaModal = ({ data, setData, dataEdit, isOpen, onClose }: any) => {
  const [id, setId] = useState(dataEdit.id || 0);
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [idade, setIdade] = useState(dataEdit.idade || "");

  async function salvarPessoa(e: any) {
    e.preventDefault();

    var pessoa = new Pessoa();
    pessoa.id = id;
    pessoa.nome = nome;
    pessoa.idade = idade ? idade : 0;

    try {
      var service = new PessoaService();

      if (id) {
        await service.alterarPessoa(pessoa)
          .then(() => { resetarCampos(); location.reload(); })
          .catch((error) => { alert("ops! \n" + error.response.data.message); });
      } else {
        await service.incluirPessoa(pessoa)
          .then(() => { resetarCampos(); location.reload(); })
          .catch((error) => { alert("ops! \n" + error.response.data.message); });
      }
    } catch (err: any) {
      console.error("Erro: " + err);
    }
  };

  function resetarCampos() {
    setId(0);
    setNome("");
    setIdade(0);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Pessoa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Idade</FormLabel>
                <Input
                  type="number"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={salvarPessoa}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PessoaModal;