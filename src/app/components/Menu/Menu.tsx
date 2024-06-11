import MenuItem from "./menu_item"
export default function Menu() {
    return(
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch">Minhas vendas</p>
            <ul>
                <MenuItem link="/" name="home"></MenuItem>
                <MenuItem link="/consultas/produtos" name="produtos"></MenuItem>
                <MenuItem link="/cadastro/clientes" name="clientes"></MenuItem>
                <MenuItem link="#" name="config"></MenuItem>
                <MenuItem link="#" name="sair"></MenuItem>
            </ul>
        </aside>
    )
}