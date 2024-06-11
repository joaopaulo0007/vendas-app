import { httpClient } from "../http/http";
import { Cliente } from "../models/clientes/clientes";

const url:string='/clientes'
export default function clienteService(){
   async function salvar(cliente:Cliente){
        const response=await httpClient.post(url,cliente) 
        return response.data;
    }
    async function listar(){
        const response=await httpClient.get(url)
        return response.data;
    }
    async function atualizar(cliente:Cliente){
        const response=await httpClient.put(`${url}/${cliente.id}`,cliente)
        return response.data;
    }
    async function deletar(id:number){
        const response=await httpClient.delete(`${url}/${id}`)
        return response.data;
    }
    async function listarCliente(id:number){
        const response=await httpClient.get(`${url}/${id}`)
        return response.data;
    }
    return {salvar,listar,atualizar,deletar,listarCliente}
}