import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import styles from '../styles/styles.module.scss'
import { getFamilyReference } from '@/services/api'
import { useEffect, useState } from 'react'
import TabMenu from '@/components/TabMenu'
import NavBar from '@/components/NavBar'
import PageUser from '@/components/PageUser'

function lower(string: any) {
  return string.toLowerCase()
}

export default function Dashboard() {
  const [search, setSearch] = useState<string>('')
  const [familyReference, setFamilyReference] = useState<any>()
  const { data: session } = useSession()

  const [clickedFamily, setClickedFamily] = useState<any>(null)
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
  const filteredList = familyReference
    ? familyReference
        .filter((item: any) => {
          if (!search || /\d/.test(search)) return item
          return lower(`${item.name}`).includes(lower(search))
        })
        .filter((item: any) => {
          if (!search) return item

          return item.cpf.includes(search.replace(/\D/g, ''))
        })
    : []

  const handleButtonClick = (id: string) => {
    const clickedFamilyData = familyReference.find(
      (family: any) => family.id === id,
    )
    setClickedFamily(clickedFamilyData)
  }

  return (
    <section className={styles.container}>
      <div>
        <NavBar title="Pesquisa" />
      </div>
      <div className={styles.box}>
        <div className={styles.cont_dashboard}>
          <div className={styles.box_dash_search}>
            <div>
              <TabMenu />
            </div>
            <div className={styles.box_search_princi}>
              <div className={styles.box_search_input}>
                {' '}
                <input
                  type="text"
                  placeholder="Pesquisa"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className={styles.box_search_info}>
                <table>
                  <tbody>
                    {filteredList.map((family: any) => (
                      <tr key={family.id}>
                        <td>
                          <span> Nome:</span>
                          {family.name} <br />
                          <span>CPF:</span>
                          {family.cpf} <br />
                          <span>NIS:</span> {family.nis} <br />
                          <span>RG:</span>
                          {family.rg}
                          <button onClick={() => handleButtonClick(family.id)}>
                            Ver mais
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{' '}
                <div>
                  {clickedFamily && (
                    <PageUser
                      data={clickedFamily}
                      setClickedFamily={setClickedFamily}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
