'use client';
import Layout from '../../components/layout/Layout';
import styles from '../../page.module.css';
import 'bulma/css/bulma.css';
import { useState, useEffect } from 'react';
import Input from '@/app/components/commom/input/input';
import useProdutoService from '@/app/services/produto.service';
import { Produto } from '@/app/models/produtos/produtos';
import { Alert } from '@/app/components/commom/message/message';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const schemaValidacao = yup.object().shape({
    sku: yup.string().trim().required('O campo SKU é obrigatório'),
    nome: yup.string().trim().required('O campo nome é obrigatório'),
    preco: yup.number().required('O campo preço é obrigatório'),
    descricao: yup.string().trim().required('O campo descrição é obrigatório')
});

interface InputErrors {
    nome?: string,
    sku?: string,
    preco?: string,
    descricao?: string
}

export default function CadastroProdutos() {
    const service = useProdutoService();
    const [sku, setSku] = useState('');
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [mensagens, setMensagens] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<InputErrors>({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryID = searchParams.get('id');

    useEffect(() => {
        if (queryID) {
            service.carregar(parseInt(queryID)).then(produtoEncontrado => {
                setSku(produtoEncontrado.sku||'');
                setPreco(produtoEncontrado.preco || '');
                setNome(produtoEncontrado.nome || '');
                setDescricao(produtoEncontrado.descricao||'');
            });
        }
    }, [queryID]);

    const cancelSubmit = () => {
        setSku('');
        setPreco('');
        setNome('');
        setDescricao('');
      
    };

    const handleSubmit = () => {
        const produto: Produto = {
            id: (queryID) ? parseInt(queryID ) : undefined,
            sku,
            preco: (preco.replace('.', '').replace(',', '.')),
            nome,
            descricao,
        };

        schemaValidacao.validate(produto, { abortEarly: false })
            .then(() => {
                setErrors({});
                if (queryID) {
                    return service.atualizar(produto);
                } else {
                    return service.salvar(produto);
                }
            })
            .then(response => {
                setMensagens([{ tipo: 'success', texto: 'Produto salvo com sucesso!', id: response.id }]);
                setTimeout(() => {
                    router.push('/consultas/produtos');
                }, 2000); 
            })
            .catch(err => {
                if (err.inner) {
                    const validationErrors: InputErrors = {};
                    err.inner.forEach((validationError: yup.ValidationError) => {
                        validationErrors[validationError.path as keyof InputErrors] = validationError.message;
                    });
                    setErrors(validationErrors);
                } else {
                    setMensagens([{ tipo: 'error', texto: 'Erro ao salvar produto' }]);
                }
            });
    };

    const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');

        if (!numericValue) {
            setPreco('');
            return;
        }

        const parsedValue = (parseFloat(numericValue) / 100).toFixed(2);
        const [parteInteira, parteDecimal] = parsedValue.split('.');
        const reversedInteiraArray = parteInteira.split('').reverse().join('');
        const matchedGroups = reversedInteiraArray.match(/.{1,3}/g);
        const formattedParteInteira = matchedGroups ? matchedGroups.join('.').split('').reverse().join('') : parteInteira;
        const formattedValue = `${formattedParteInteira},${parteDecimal}`;

        setPreco(formattedValue);
    };

    return (
        <main className={styles.main}>
            <Layout titulo="Produto" message={mensagens}>
                <div className="columns">
                    <Input
                        onChange={e => setSku(e.target.value)}
                        label="SKU:*"
                        value={sku}
                        columns_class="is-half"
                        id="input-sku"
                        type="text"
                        placeholder="Digite o SKU do produto"
                        error={errors.sku}
                    />
                    <Input
                        onChange={handlePrecoChange}
                        label="PREÇO:*"
                        value={preco}
                        columns_class="is-half"
                        id="input-preco"
                        type="text"
                        placeholder="Digite o preço do produto"
                        
                        maxLength={16}
                        error={errors.preco}
                    />
                </div>
                <Input
                    onChange={e => setNome(e.target.value)}
                    label="NOME:*"
                    value={nome}
                    id="input-nome"
                    type="text"
                    columns_class='is-full'
                    placeholder="Digite o nome do produto"
                    error={errors.nome}
                />
                <div className="field">
                    <label htmlFor="text-descricao">DESCRIÇÃO:</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            id="text-descricao"
                            placeholder="Digite a descrição do produto"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                        {errors.descricao && <p className="help is-danger">{errors.descricao}</p>}
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={handleSubmit}>Salvar</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={cancelSubmit}>Cancelar</button>
                    </div>
                    <div className="control">
                        <Link href={'/consultas/produtos'}>
                            <button className="button is-link">Voltar</button>
                        </Link>
                    </div>
                </div>
            </Layout>
        </main>
    );
}
