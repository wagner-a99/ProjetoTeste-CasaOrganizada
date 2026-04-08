import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div className="d-grid gap-2">
        <Link to="/pessoas">
          <Button variant="primary" size="lg">
            Pessoas
          </Button>
        </Link>
        <Link to="/categorias">
          <Button variant="secondary" size="lg">
            Categorias
          </Button>
        </Link>
        <Link to="/transacoes">
          <Button variant="success" size="lg">
            Transações
          </Button>
        </Link>
        <Link to="/consulta-totais-pessoa">
          <Button variant="warning" size="lg">
            Consulta Totais Pessoa
          </Button>
        </Link>
        <Link to="/consulta-totais-categoria">
          <Button variant="info" size="lg">
            Consulta Totais Categoria
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;