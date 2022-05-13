import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
// signIn é a função que faz autenticação do usuário.
import { signIn, signOut, useSession } from 'next-auth/react'

export const SignInButton = () => {// Estou desestruturando data de useSession e renomeando ela para session.
  const { data: session } = useSession()

  console.log('session:', session)

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX
        color="#737380"
        className={styles.closeIcon}
        onClick={() => signOut()}
      />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#EBA417" />
      Sign in with Github
    </button>
  )
}