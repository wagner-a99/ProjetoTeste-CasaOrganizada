import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PessoaModal from "./PessoaModal";
import { Pessoa, PessoaService } from "../../../services/pessoa/PessoaService";

function Pessoas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataEdit, setDataEdit] = useState({});
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  var service = new PessoaService();
  useEffect(() => {
    service.buscarPessoas().then((result) => setPessoas(result));
  }, []);

  function deletarPessoa(id: number) {
    service.deletarPessoa({ id } as Pessoa)
      .then(() => {
        setPessoas(pessoas.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.error("ops! ocorreu um erro" + error.response.data);
      });
  }

  return (
    <div className="Pessoas">
      <h1>Pessoas!</h1>

      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
      >
        <Box w="100%" h="100vh" py={10} px={2}>
          <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
            Adicionar
          </Button>

          <Box overflowY="auto" height="100%">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th hidden>
                    Id
                  </Th>
                  <Th fontSize="20px">
                    Nome
                  </Th>
                  <Th maxW="100" fontSize="20px">
                    Idade
                  </Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {pessoas.map(({ id, nome, idade }, index) => (
                  <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                    <Td hidden>{id}</Td>
                    <Td>{nome}</Td>
                    <Td maxW="100">{idade}</Td>
                    <Td p={0}>
                      <button onClick={() => [
                        setDataEdit({ id, nome, idade }),
                        onOpen(),
                      ]} aria-label="Edit item">
                        Editar
                      </button>
                    </Td>
                    <Td p={0}>
                      <button onClick={() => deletarPessoa(id)} aria-label="Delete item">
                        Deletar
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen && (
          <PessoaModal
            isOpen={isOpen}
            onClose={onClose}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )}
      </Flex>
    </div>
  );
}

export default Pessoas;