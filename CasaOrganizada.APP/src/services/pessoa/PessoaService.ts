import api from "../casaorganizada.api";

export class Pessoa {
  public id: number = 0;
  public nome: string = "";
  public idade: number = 0;
}

export class PessoaService {

  public async buscarPessoas(): Promise<Pessoa[]> {
    var pessoas: Pessoa[] = [];

    try {
      const response = await api.get("/pessoa");
      pessoas = response.data.map((item: any) => Object.assign(new Pessoa(), item));
    } catch (err) {
      console.error("ops! ocorreu um erro" + err);
    }

    return pessoas;
  }

  public async buscarPessoa(identificador: number): Promise<Pessoa> {
    var pessoa = new Pessoa();

    try {
      const response = await api.get(`/pessoa/${identificador}`);
      pessoa = Object.assign(new Pessoa(), response.data);
    } catch (err) {
      console.error("ops! ocorreu um erro" + err);
    }

    return pessoa;
  }

  public async incluirPessoa(pessoa: Pessoa): Promise<void> {
    try {
      const response = await api.post("/pessoa", pessoa)
        .catch(error => {
          if (error.response) {
            throw error;
          } else if (error.request) {
            console.error('Erro de rede:', error.request);
          }
        });
    }
    catch (err) {
      console.error("Erro servidor:" + err);
      throw err;
    }
  }

  public async alterarPessoa(pessoa: Pessoa): Promise<void> {
    try {
      const response = await api.put(`/pessoa/${pessoa.id}`, pessoa)
        .catch(error => {
          if (error.response) {
            throw error;
          } else if (error.request) {
            console.error('Erro de rede:', error.request);
          }
        });
    }
    catch (err) {
      console.error("Erro servidor:" + err);
      throw err;
    }
  }

  public async deletarPessoa(pessoa: Pessoa): Promise<void> {
    try {
      await api.delete(`/pessoa/${pessoa.id}`);
    } catch (err) {
      console.error("ops! ocorreu um erro" + err);
      throw err;
    }
  }
};
