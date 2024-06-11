import { Cliente } from "@/app/models/clientes/clientes";
import { useFormik } from "formik";
import Input, { InputCPF, InputTelefone, InputData } from "../commom/input/input";

interface formProps {
    cliente: Cliente,
    onSubmit: (cliente: Cliente) => void
}

const formSchema: Cliente = {
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    id: "",
    cpf: "",
    data_cadastro: "",
    endereco: ""
}

export default function Form({ cliente, onSubmit }: formProps) {
    const formik = useFormik<Cliente>({
        initialValues: { ...formSchema, ...cliente },
        onSubmit: values => {
            // Remove campos desnecessários
            const { id, data_cadastro, ...clienteData } = values;
            onSubmit(clienteData);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="columns">
                <Input
                    id="nome"
                    name="nome"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    columns_class="is-full"
                    label="Nome"
                />
            </div>
            <div className="columns">
                <InputCPF
                    id="cpf"
                    name="cpf"
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    columns_class="is-half"
                    label="CPF"
                />
                <InputData
                    id="nascimento"
                    name="nascimento"
                    onChange={formik.handleChange}
                    value={formik.values.nascimento}
                    columns_class="is-half"
                    label="Data de Nascimento"
                />
            </div>
            <div className="columns">
                <Input
                    id="endereco"
                    name="endereco"
                    onChange={formik.handleChange}
                    value={formik.values.endereco}
                    columns_class="is-full"
                    label="Endereço"
                />
            </div>
            <div className="columns">
                <Input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    columns_class="is-half"
                    label="Email"
                    type="email"
                />
                <InputTelefone
                    id="telefone"
                    name="telefone"
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                    columns_class="is-half"
                    label="Telefone"
                />
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-link is-light">Enviar</button>
                </div>
            </div>
        </form>
    );
}
