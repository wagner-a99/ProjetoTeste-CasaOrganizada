import api from "../casaorganizada.api";

export enum Finalidade {
    Despesa = 0,
    Receita = 1,
    Ambas = 2
}

export class Categoria {
    public id: number = 0;
    public descrição: string = "";
    public finalidade: Finalidade = Finalidade.Despesa;
}

export class CategoriaService {
    public async buscarCategorias(): Promise<Categoria[]> {
        var categorias: Categoria[] = [];

        try {
            const response = await api.get("/categorias");
            categorias = response.data.map((item: any) => Object.assign(new Categoria(), item));
        } catch (err) {
            console.error("1 - ops! ocorreu um erro" + err);
        }

        return categorias;
    }

    public async buscarCategoria(identificador: number): Promise<Categoria> {
        var categoria = new Categoria();

        try {
            const response = await api.get(`/categorias/${identificador}`);
            categoria = Object.assign(new Categoria(), response.data);
        } catch (error: any) {
            console.error("ops! ocorreu um erro" + error.response.data);
        }

        return categoria;
    }

    public async incluirCategoria(categoria: Categoria): Promise<void> {
        try {
            const response = await api.post("/categorias", categoria)
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
}