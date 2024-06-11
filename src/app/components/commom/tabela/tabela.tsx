import { Produto } from "@/app/models/produtos/produtos"
import { useState } from "react"

interface tabelaprops{
    produtos:Array<Produto>
    onEdit:(produto:Produto)=>void
    onDelete:(produto:Produto)=>void
}
export default function Tabela(props:tabelaprops) {
    
    return (
        <table className="table is-striped is-hoverable">
            <thead>
                <tr>
                   <th>sku</th>
               <th>nome</th>
               <th>preco</th>
               <th>descricao</th>
               <th>ações</th> 
                </tr>
               
            </thead>
            <tbody>
                {props.produtos.map(produto=><Linha {...props} key={produto.id} produto={produto}></Linha>)}
            </tbody>

        </table>
    )
}
interface LinhaProps{
    produto: Produto
    onEdit:(produto:Produto)=>void
    onDelete:(produto:Produto)=>void
}
function Linha(props:LinhaProps){
    const [aviso,setAviso]=useState(false)
    function onDeleteClick(produto:Produto){
        if(aviso){
            props.onDelete(produto)
            setAviso(false)
        }
        else{
            setAviso(true)
        }
    }
    function cancel(){
        setAviso(false)
    }
   return(
    <tr>
        <td>{props.produto.sku}</td>
        <td>{props.produto.nome}</td>
        <td>{props.produto.preco}</td>
        <td>{props.produto.descricao}</td>
        <td>
             {!aviso && <button className="button is-warning is-rounded is-small" onClick={evente=>props.onEdit(props.produto)}>editar</button>}
            
            <button className="button is-danger is-rounded is-small" onClick={evente=>onDeleteClick(props.produto)}>{aviso? "confirmar": "excluir"}</button>
            { aviso &&
                    <button onClick={cancel} 
                        className="button is-rounded is-small">
                        Cancelar
                    </button>
                }
        </td>
    </tr>
   )
}