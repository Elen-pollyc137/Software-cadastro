import { GetServerSideProps } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import styles from '../styles/styles.module.scss'
import { getFamilyReference } from '@/services/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import TabMenu from '@/components/TabMenu'

export default function Formulario() {
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
        <div>
          <TabMenu />
        </div>
        <div className={styles.box_search_info}></div>
      </div>
    </section>
  )
}
