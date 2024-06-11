'use client';
import { useEffect, useState } from 'react';
import Layout from "@/app/components/layout/Layout";
import Link from "next/link";
import Tabela from "@/app/components/commom/tabela/tabela";
import { httpClient } from "@/app/http/http";
import useSWR from "swr";
import Loader from "@/app/components/commom/loader/loader";
import { Produto } from "@/app/models/produtos/produtos";
import { useRouter } from 'next/navigation';
import { Alert } from '@/app/components/commom/message/message';

export default function ListaProdutos() {
    const { data: result, error } = useSWR('/produtos', url => httpClient.get(url));
    const [isClient, setIsClient] = useState(false);
    const [message,setMessage]=useState<Array<Alert>>([])
    const [lista,setlista]=useState<Array<Produto>>([])
    const router = useRouter();
    
    useEffect(() => {
        setIsClient(true);
        setlista(result?.data || [])
    }, [result]);

    function editar(produto: Produto) {
        if (isClient) {
            const url = `/cadastro/produtos?id=${produto.id}`;
            router.push(url);
        }
    }

    async function deletar(produto:Produto) {
        const url=`/produtos/${produto.id}`;
        await httpClient.delete(url).then(response=>{
            setMessage([{tipo:'success',texto:'Produto excluido com sucesso!'}])
        });
        const listaAlterada=lista.filter(item=>item.id!==produto.id);
        setlista(listaAlterada);
    }

    return (
        <Layout titulo="Produtos" message={message}>
            <Link href={'/cadastro/produtos'}>
                <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <Loader show={!result}></Loader>
            {isClient && (
                <Tabela onDelete={deletar} onEdit={editar} produtos={lista}></Tabela>
            )}
        </Layout>
    );
}
