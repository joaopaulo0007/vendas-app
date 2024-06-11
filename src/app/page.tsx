import 'bulma/css/bulma.css'
import Layout from './components/index'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      
      <Layout titulo='cadastro'>
        conteudo
      </Layout>
      
    </main>
  );
}
