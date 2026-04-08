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
import CategoriaModal from "./CategoriaModal";
import { Categoria, CategoriaService, Finalidade } from "../../../services/categoria/CategoriaService";

function Categorias() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  var service = new CategoriaService();
  useEffect(() => {
    service.buscarCategorias().then((result) => setCategorias(result));
  }, []);

  return (
    <div className="Categorias">
      <h1>Categorias!</h1>

      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
      >
        <Box w="100%" h="100vh" py={10} px={2}>
          <Button colorScheme="blue" onClick={() => [onOpen()]}>
            Adicionar
          </Button>

          <Box overflowY="auto" height="100%">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontSize="20px">Descrição</Th>
                  <Th maxW="100" fontSize="20px">Finalidade</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {categorias.map(({ descrição, finalidade }, index) => (
                  <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                    <Td>{descrição}</Td>
                    <Td maxW="100">{Finalidade[finalidade]}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen && (
          <CategoriaModal
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Flex>
    </div>
  );
}

export default Categorias;