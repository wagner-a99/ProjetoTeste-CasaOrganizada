
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import DefinirRotas from "./router/config.router";

function App() {
  return (
    <div className="App">
      <Header />
      <DefinirRotas />
      <Footer />
    </div>
  );
};

export default App;