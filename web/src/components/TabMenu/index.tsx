import Link from 'next/link'
import styles from './styles.module.scss'
function TabMenu() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.box}>
          <a className={styles.box_button}>
            <div>
              <IconSSearch />
            </div>
            <Link href="/form" className={styles.buton}>
              Cadastrar
            </Link>
          </a>
          <a className={styles.box_button}>
            <div>
              <IconAdd />
            </div>
            <Link href="/dashboard" className={styles.buton}>
              Pesquisar
            </Link>
          </a>
        </div>
      </main>
    </>
  )
}

export default TabMenu

function IconSSearch() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#F5F5F5"
        d="M14.5 10.97a4 4 0 000-7.94A5.977 5.977 0 0116 7a5.977 5.977 0 01-1.5 3.97zM20 20a1 1 0 102 0v-2a5 5 0 00-4.698-4.991 8.007 8.007 0 012.303 3.503c.252.439.395.947.395 1.488v2z"
      ></path>
      <path
        fill="#F5F5F5"
        fillRule="evenodd"
        d="M7 15a3 3 0 00-3 3v2a1 1 0 11-2 0v-2a5 5 0 015-5h6a5 5 0 015 5v2a1 1 0 11-2 0v-2a3 3 0 00-3-3H7zM10 5a2 2 0 100 4 2 2 0 000-4zM6 7a4 4 0 118 0 4 4 0 01-8 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
function IconAdd() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
      ></path>
      <path
        stroke="#fff"
        strokeWidth="2"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      ></path>
    </svg>
  )
}
