import { ReactNode } from "react"
import Menu from "../Menu/Menu"
import Message,{Alert} from "../commom/message/message"
interface props{
    titulo?:string,
    children?:ReactNode
    message?:Array<Alert>

}
export default function Layout(props:props){
  return(
    <div className="app">
        <section className="main-content columns is fullheight">
            <Menu></Menu>
            <div className="container column is-10">
                <div className="section">
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title">{props.titulo}</p>
                        </div>
                        <div className="card-content"> 
                           <div className="content">
                            {props.message && props.message.map(msg=><Message {...msg} key={msg.id}></Message>)}
                            {props.children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}