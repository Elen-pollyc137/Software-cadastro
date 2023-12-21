// api.ts

import axios, { AxiosResponse } from 'axios'

// Defina a URL da sua API
const apiUrl = 'http://localhost:3333' // Substitua pela URL real da sua API

// Defina os tipos para os dados que você espera receber
interface FamilyReference {
  name: string
}

// Função para fazer a solicitação à rota '/familyreference'
export const getFamilyReference = async (): Promise<FamilyReference> => {
  try {
    const response: AxiosResponse<FamilyReference> = await axios.get(
      `${apiUrl}/familyreference`,
    )
    return response.data
  } catch (error) {
    // Trate os erros aqui, por exemplo, lançando ou retornando uma mensagem de erro personalizada
    throw new Error('Erro ao obter dados da família')
  }
}
export const getFamilyReferenceId = async (): Promise<FamilyReference> => {
  try {
    const response: AxiosResponse<FamilyReference> = await axios.get(
      `${apiUrl}/familyreference:id`,
    )
    return response.data
  } catch (error) {
    // Trate os erros aqui, por exemplo, lançando ou retornando uma mensagem de erro personalizada
    throw new Error('Erro ao obter dados da família')
  }
}
