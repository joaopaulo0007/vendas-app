'use client'
import Layout from "@/app/components"
import 'bulma/css/bulma.css';
import Form from "@/app/components/clients/form"
import { useState } from "react"
import { Cliente } from "@/app/models/clientes/clientes"
import clienteService from "@/app/services/cliente.service";

export default function Page() {
    const [cliente, setCliente] = useState<Cliente>({
        nome: "",
        nascimento: "",
        cpf: "",
        email: "",
        telefone: "",
        endereco: "",
        data_cadastro: "",
        id: ""
    });

    const service = clienteService();

    function handleSubmit(client: Cliente) {
        console.log(client);
        if (client.id) {
            service.atualizar(client).then(response => console.log('cliente atualizado'));
        } else {
            service.salvar(client).then(response => {
                setCliente(response);
                console.log(response);
            });
        }
    }

    return (
        <Layout titulo="clientes">
            <Form cliente={cliente} onSubmit={handleSubmit} />
        </Layout>
    );
}
