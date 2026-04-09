import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div className="d-grid gap-2">
        <div className="text-center" style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
          <Button as={Link as any} to="/pessoas" variant="primary" size="lg">PESSOAS</Button>
          <Button as={Link as any} to="/categorias" variant="primary" size="lg">CATEGORIAS</Button>
          <Button as={Link as any} to="/transacoes" variant="primary" size="lg">TRANSAÇÕES</Button>
        </div>
        <Button as={Link as any} to="/consulta-totais-pessoa" variant="info" size="lg">CONSULTAR TOTAIS POR PESSOA</Button>
        <Button as={Link as any} to="/consulta-totais-categoria" variant="info" size="lg">CONSULTAR TOTAIS POR CATEGORIA</Button>
      </div>
    </div>
  );
}

export default Home;