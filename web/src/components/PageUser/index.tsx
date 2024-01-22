import styles from './styles.module.scss'
import { MdClose } from 'react-icons/md'

interface PageUserProps {
  data: {
    id: string
    name: string
    cpf: string
    nis: string
    rg: string
    titulo: string
    naturalness: string
    nameMother: string
    nameFather: string
    birthdayDate: string
    surname: string
    phoneNumber: string
    matrialStatus: string
    education: string
    elderlyPerson: string
    disabledPerson: string
    folderNunber: string
    domicileLocation: string
    neighborhood: string
    serviceHistory: string
  }
  setClickedFamily: () => void
}

const PageUser: React.FC<PageUserProps> = ({ data, setClickedFamily }) => {
  console.log(`Data     ooooo`, data)
  function handleActive() {
    setClickedFamily(false)
  }
  return (
    <section className={styles.container}>
      <div className={styles.close}>
        <MdClose onClick={handleActive} size={32} />
      </div>
      <div className={styles.box}>
        <div>
          <h1>
            <span> Nome:</span>
            {data?.name}
          </h1>
          <h2>Documentos</h2>
          <text>
            <span>CPF:</span> {data?.cpf}
          </text>
          <text>
            <span>NIS:</span> {data?.nis}
          </text>
          <text>
            <span>RG:</span> {data?.rg}
          </text>
          <text>
            <span>Titulo:</span> {data?.titulo}
          </text>
          <text>
            <span>Naturalidade:</span> {data?.naturalness}
          </text>
          <br />
          <h2>Filiação</h2>
          <text>
            <span>Mae:</span>
            {data?.nameMother}
          </text>
          <text>
            <span>Pai:</span>
            {data?.nameFather}
          </text>
          <h2>Informação Pessoal</h2>
          <text>
            <span>Data de nascimento:</span>
            {data?.birthdayDate}
          </text>
          <text>
            <span>Apelido:</span>
            {data?.surname}
          </text>
          <text>
            <span>Telefone:</span>
            {data?.phoneNumber}
          </text>
          <text>
            <span>Estado Civil:</span>
            {data?.matrialStatus}
          </text>
          <br />
          <br />
          <text>
            <span>Formação:</span>
            {data?.education}
          </text>
          <text>
            <span>Pessoa idosa:</span>
            {data?.elderlyPerson}
          </text>
          <text>
            <span>Pessoa deficiente:</span>
            {data?.disabledPerson}
          </text>
          <h2>Endereço</h2>
          <text>
            <span>Localzação:</span>
            {data?.domicileLocation}
          </text>
          <text>
            <span>Bairro:</span>
            {data?.neighborhood}
          </text>
          <h2>Historico de atendimento</h2>
          <text>{data?.serviceHistory}</text>
        </div>
      </div>
      <div className={styles.box_numb}>
        {' '}
        <text>
          <span>Numero da pasta:</span> {data?.folderNunber}
        </text>
      </div>
    </section>
  )
}

export default PageUser
