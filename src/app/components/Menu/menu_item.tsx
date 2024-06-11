import Link from "next/link"
interface props{
    name:string,
    link:string, 
}

export default function MenuItem(props: props){
   return(
    <li className={props.name}>
        <Link href={props.link}>
            <span>{props.name}</span>
        </Link>
    </li>
   )
}