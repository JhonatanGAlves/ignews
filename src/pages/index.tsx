import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            New about<br />
            the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications<br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton
            priceId={product.priceId}
          />
        </section>
        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>
  )
}

// A partir do momento que eu crio um component exatamente com esse nome, digo que é async e tipo ele com 
// GetStaticProps que está vindo de next, dentro do meu return eu passo ter acesso a algumas propriedades,
// entre elas a props. Dessa forma, quando passo props como dependência do meu component Home, eu consigo ter
// aos valores passados na propriedade props de getStaticProps.
// E esse componente todo está rodando dentro do servidor node e não no client (browser).
export const getStaticProps: GetStaticProps = async () => {
  // Esta entrando dentro de prices, pegando um unico preço através do retrieve, passando a key do product específico
  // que quero pegar o preço.
  const price = await stripe.prices.retrieve('price_1KuoRpEwYOImdQT7TjGfwdi5')

  // Crio uma varável e passo um objeto pra dentro dela pegando o id e o preço do pruduto.
  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    // Passo minha variável de objeto que contém os valores do produto buscado.
    props: {
      product
    },
    // Digo ao Next quanto tempo eu quero que a minha página (requições, estrutura HTML) seja revalidade (reconstruida).
    revalidate: 60 * 60 * 24 // 24 hours.
  }
}
