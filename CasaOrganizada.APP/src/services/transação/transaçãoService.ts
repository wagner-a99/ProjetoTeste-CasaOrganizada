import api from "../casaorganizada.api";

export enum TipoTransação {
  Despesa = 0,
  Receita = 1
}

export class Transação {
  public descrição: string = "";
  public valor: number = 0;
  public tipo: TipoTransação = TipoTransação.Despesa;
  public categoriaId: number = 0;
  public pessoaId: number = 0;
}

export class TransaçãoService {
  public async buscarTransaçãos(): Promise<Transação[]> {
    var transaçãos: Transação[] = [];

    try {
      const response = await api.get("/transação");
      transaçãos = response.data.map((item: any) => Object.assign(new Transação(), item));
    } catch (err) {
      console.error("ops! ocorreu um erro" + err);
    }

    return transaçãos;
  }

  public async buscarTransação(identificador: number): Promise<Transação> {
    var transação = new Transação();

    try {
      const response = await api.get(`/transação/${identificador}`);
      transação = Object.assign(new Transação(), response.data);
    } catch (err) {
      console.error("ops! ocorreu um erro" + err);
    }

    return transação;
  }

  public async incluirTransação(transação: Transação): Promise<void> {
    try {
      const response = await api.post("/transação", transação)
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
};
