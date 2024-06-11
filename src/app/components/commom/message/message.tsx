
interface messageProps{
    tipo:String,
    field?:String,
    texto:String,
}
export interface Alert{
    tipo:String,
    field?:String,
    texto:String,
    id?:number
}
export default function message(props:messageProps){
    return(
      <article className={`message is-${props.tipo}`}>
        <div className="message-body">
            {props.field && `${props.field}:`}{props.texto}
        </div>
      </article>
    )
}