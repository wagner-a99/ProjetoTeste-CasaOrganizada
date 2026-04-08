import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../components/pages/Home'
import Pessoas from '../components/pages/Pessoa/Pessoas'
import Categorias from '../components/pages/Categoria/Categorias'
import Transações from '../components/pages/Transação/Transações'
import ConsultaTotaisPessoa from '../components/pages/Consulta/ConsultaTotaisPessoa'
import ConsultaTotaisCategoria from '../components/pages/Consulta/ConsultaTotaisCategoria'

function DefinirRotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/transacoes" element={<Transações />} />
        <Route path="/consulta-totais-pessoa" element={<ConsultaTotaisPessoa />} />
        <Route path="/consulta-totais-categoria" element={<ConsultaTotaisCategoria />} />
      </Routes>
    </Router>
  )
}

export default DefinirRotas;