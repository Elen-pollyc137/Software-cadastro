import styles from '../styles/styles.module.scss'
import { useState, FormEventHandler } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

export default function Home() {
  const { push } = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const inputValue = (e: any) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/',
    })
    console.log(data)

    if (result?.url) {
      return push(result?.url)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.box_log}>
        <h1>Faça seu login</h1>
        <form
          action=""
          method="post"
          autoComplete="off"
          className={styles.form_box}
          onSubmit={handleSubmit}
        >
          <div className={styles.input_label_box}>
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" onChange={inputValue} />
          </div>
          <div className={styles.input_label_box}>
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" onChange={inputValue} />
          </div>
          <button>Fazer Login</button>
        </form>
      </div>
    </section>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
