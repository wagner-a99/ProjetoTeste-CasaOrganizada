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
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TransaçãoModal from "./TransaçãoModal";
import { TipoTransação, TransaçãoService, type Transação } from "../../../services/Transação/TransaçãoService";

function Transações() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);

  const [transações, setTransações] = useState<Transação[]>([]);

  var service = new TransaçãoService();
  useEffect(() => {
    service.buscarTransaçãos().then((result) => setTransações(result));
  }, []);


  return (
    <div className="Transações">
      <h1>Transações!</h1>

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
                  <Th maxW="100" fontSize="20px">Tipo</Th>
                  <Th maxW="100" fontSize="20px">Valor</Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transações.map(({ descrição, tipo, valor }, index) => (
                  <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                    <Td>{descrição}</Td>
                      <Td maxW="100">{TipoTransação[tipo]}</Td>
                      <Td maxW="100">R$ {valor.toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen && (
          <TransaçãoModal
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
          />
        )}
      </Flex>
    </div>
  );
}

export default Transações;