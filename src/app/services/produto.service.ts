
import { AxiosResponse } from "axios";
import { httpClient } from "../http/http";
import { Produto } from "../models/produtos/produtos";



const resouceUrl: string = '/produtos'

export default function useProdutoService() {
    async function salvar(produto: Produto): Promise<Produto> {
     

       
        const response: AxiosResponse<Produto> =await httpClient.post<Produto>(resouceUrl, produto)
        return response.data
    }
    async function atualizar(produto:Produto):Promise<Produto>{
      const url:string=`${resouceUrl}/${produto.id}`
      const response:AxiosResponse<Produto>=await httpClient.put<Produto>(url,produto)
      return response.data
    }
    async function carregar(id:number):Promise<Produto>{
       const url:string=`${resouceUrl}/${id}`
       const response:AxiosResponse<Produto>=await httpClient.get<Produto>(url)
       return response.data
    }
    async function deletar(id:number){
      const url:string=`${resouceUrl}/${id}`
      const response:AxiosResponse<Produto>=await httpClient.delete<Produto>(url)
     
    }
    return {salvar,atualizar,carregar}
}