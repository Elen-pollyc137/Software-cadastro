import styles from '../styles/styles.module.scss'

import { FunctionComponent } from 'react'
import TabMenu from '@/components/TabMenu'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NavBar from '@/components/NavBar'
import { postFormData } from '@/services/api'
import { useRouter } from 'next/router'

interface IUserFormData {
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
  isPublic: boolean
  handleSubmit: () => void
  handleSubmitForm: () => void
}
const schema = yup.object({
  name: yup.string().required(),
  cpf: yup.string().required(),
  nis: yup.string().required(),
  rg: yup.string().required(),
  titulo: yup.string().required(),
  naturalness: yup.string().required(),
  nameMother: yup.string().required(),
  nameFather: yup.string().required(),
  birthdayDate: yup.string().required(),
  surname: yup.string().required(),
  phoneNumber: yup.string().required(),
  matrialStatus: yup.string().required(),
  education: yup.string().required(),
  elderlyPerson: yup.string().required(),
  disabledPerson: yup.string().required(),
  folderNunber: yup.string().required(),
  domicileLocation: yup.string().required(),
  neighborhood: yup.string().required(),
  serviceHistory: yup.string().required(),
  isPublic: yup.boolean().default(true).required(),
})

const Formulario: FunctionComponent = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormData>({
    resolver: yupResolver(schema),
  })
  const handleSubmitForm = async (FormData: IUserFormData) => {
    try {
      // Chame a função postFormData com os dados do formulário
      const response = await postFormData(FormData)
      if (response) {
        router.push('/dashboard')
      }
      // Lide com a resposta do backend conforme necessário
      console.log('Resposta do backend:', response)
    } catch (error: any) {
      // Trate os erros aqui, por exemplo, exibindo uma mensagem de erro
      console.error('Erro ao enviar formulário:', error.message)
    }
  }
  // function handleSubmitForm(data: IUserFormData) {
  //   console.log(data)
  // }
  return (
    <section className={styles.cont_form}>
      <div className={styles.box_navbar}>
        <NavBar title="Formulario" />
      </div>
      <div className={styles.box_dash_login}>
        <div>
          <TabMenu />
        </div>
        <div className={styles.box_form_info}>
          <main className={styles.box_cad_form}>
            <Flex
              width="100%"
              align="center"
              justifyContent="center"
              background="gray.100"
            >
              <Box
                px={12}
                py={12}
                boxShadow="lg"
                background="gray.150"
                borderRadius="6px"
              >
                <Heading>
                  <Text color="#045741" fontSize="24px">
                    Cadastrar Referencia Familiar
                  </Text>
                </Heading>
                <Box>
                  <form
                    action=""
                    autoComplete="on"
                    onSubmit={handleSubmit(handleSubmitForm)}
                  >
                    <Flex justify="space-between">
                      <FormControl isRequired marginTop="1rem" width="30%">
                        <FormLabel color="#045741" fontSize="20px">
                          Nome
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Nome completo"
                          {...register('name')}
                        />
                        <p style={{ color: 'red' }}>{errors?.name?.message}</p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          CPF
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. 111.111.111-11"
                          {...register('cpf')}
                        />
                        <p style={{ color: 'red' }}>{errors?.cpf?.message}</p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Nis
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. 0000.000000-0"
                          {...register('nis')}
                        />
                        <p style={{ color: 'red' }}>{errors?.nis?.message}</p>
                      </FormControl>
                    </Flex>
                    <Flex justify="space-between">
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          RG
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. MG 0000000-0"
                          {...register('rg')}
                        />
                        <p style={{ color: 'red' }}>{errors?.rg?.message}</p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Titulo
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="0000.0000.0000.0000"
                          {...register('titulo')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.titulo?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="19%">
                        <FormLabel color="#045741" fontSize="20px">
                          Naturalidade
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Brasileira"
                          {...register('naturalness')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.naturalness?.message}
                        </p>
                      </FormControl>
                    </Flex>
                    <Flex justify="space-between">
                      <FormControl isRequired marginTop="15px" width="35%">
                        <FormLabel color="#045741" fontSize="20px">
                          Nome da Mae
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Maria Aparecida"
                          {...register('nameMother')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.nameMother?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="35%">
                        <FormLabel color="#045741" fontSize="20px">
                          Nome do Pai
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Jose Silva"
                          {...register('nameFather')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.nameFather?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Data de Nascimento
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="01/01/1998"
                          {...register('birthdayDate')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.birthdayDate?.message}
                        </p>
                      </FormControl>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Apelido
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="...."
                          {...register('surname')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.surname?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Telefone
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="+55 (DDD)99999-9999"
                          {...register('phoneNumber')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.phoneNumber?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="25%">
                        <FormLabel color="#045741" fontSize="20px">
                          Estado Civil
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Solteiro, Casado.."
                          {...register('matrialStatus')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.matrialStatus?.message}
                        </p>
                      </FormControl>
                    </Flex>
                    <Flex justify="space-between">
                      <FormControl isRequired marginTop="15px" width="25%">
                        <FormLabel color="#045741" fontSize="20px">
                          Formaçao
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Ensino Medio"
                          {...register('education')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.education?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Pessoa Idosa
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Sim ou Nao"
                          {...register('elderlyPerson')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.elderlyPerson?.message}
                        </p>
                      </FormControl>

                      <FormControl isRequired marginTop="15px" width="20%">
                        <FormLabel color="#045741" fontSize="20px">
                          Pessoa com Deficiencia
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Sim ou Nao"
                          {...register('disabledPerson')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.disabledPerson?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="25%">
                        <FormLabel color="#045741" fontSize="20px">
                          Numero da Pasta
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Numero"
                          {...register('folderNunber')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.folderNunber?.message}
                        </p>
                      </FormControl>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <FormControl isRequired marginTop="15px" width="50%">
                        <FormLabel color="#045741" fontSize="20px">
                          Endereço
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Ex. Sim ou Nao"
                          {...register('domicileLocation')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.domicileLocation?.message}
                        </p>
                      </FormControl>
                      <FormControl isRequired marginTop="15px" width="45%">
                        <FormLabel color="#045741" fontSize="20px">
                          Bairro ou Comunidade
                        </FormLabel>
                        <Input
                          type="text"
                          border="none"
                          outline="none"
                          width="100%"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          placeholder="Numero"
                          {...register('neighborhood')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.neighborhood?.message}
                        </p>
                      </FormControl>
                    </Flex>
                    <Flex display="flex" width="90%">
                      <FormControl marginTop="1rem">
                        <FormLabel color="#045741" fontSize="20px">
                          Historico de Atendimento
                        </FormLabel>
                        <Textarea
                          width="1000px"
                          border="none"
                          outline="none"
                          borderBottom="1px solid #045741"
                          focusBorderColor="gray.600"
                          color="gray.600"
                          resize="none"
                          placeholder="Desceva o Atendimento...."
                          {...register('serviceHistory')}
                        />
                        <p style={{ color: 'red' }}>
                          {errors?.serviceHistory?.message}
                        </p>
                      </FormControl>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Button
                        type="submit"
                        padding="1rem"
                        borderRadius="6px"
                        width="150px"
                        bgColor="#045741"
                        mt={4}
                        color="gray.200"
                        _hover={{
                          color: 'black',
                        }}
                      >
                        Cadastrar
                      </Button>
                      {/* <Button
                        type="submit"
                        width="150px"
                        bgColor="#045741"
                        mt={4}
                        color="gray.200"
                        _hover={{
                          color: 'black',
                        }}
                      >
                        Adicionar Familiar
                      </Button> */}
                    </Flex>
                  </form>
                </Box>
              </Box>
            </Flex>
          </main>
        </div>
      </div>
    </section>
  )
}
export default Formulario
