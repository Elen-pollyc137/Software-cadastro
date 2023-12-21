import { GetServerSideProps } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import styles from '../styles/styles.module.scss'
import { getFamilyReference } from '@/services/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [familyReference, setFamilyReference] = useState<any>()
  const { data: session } = useSession()
  console.log('🚀 ~ file: dashboard.tsx:7 ~ Dashboard ~ session:', session)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyReferenceData = await getFamilyReference()
        if (familyReferenceData) {
          setFamilyReference(familyReferenceData)
        }
        console.log('Dados da família:', familyReferenceData)
      } catch (error: any) {
        console.error('Erro ao obter dados da família:', error?.message)
      }
    }

    fetchData()
  }, [])

  return (
    <section className={styles.cont_dashboard}>
      <div className={styles.box_navbar}>
        <h2>Dashboard</h2>
        {session?.user?.name}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <div className={styles.box_dash_search}>
        <div className={styles.box_search_info}>
          <input type="text" placeholder="Pesquisa" />
          <table>
            <tbody>
              {familyReference &&
                familyReference.map((family: any) => (
                  <tr key={family.id}>
                    <td>
                      <span> Nome:</span>
                      {family.name} <br />
                      <span>CPF:</span>
                      {family.cpf} <br />
                      <span>NIS:</span> {family.nis} <br />
                      <span>RG:</span>
                      {family.rg}
                      <Link href={`/users/${family.id}`}>Ver mais</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>{' '}
        <div></div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
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
