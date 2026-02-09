import { api } from "@/constants/axios"
import { endpoints } from "@/constants/endpoints"
import { SignInResponse, SignUpResponse } from "@/types/response"

export const signIn = async (email: string, password: string) => {
    const response = await api.post<SignInResponse>(endpoints.AUTH.login, { email, password })
    return response.data
}

export const signUp = async (email: string, password: string) => {
    const response = await api.post<SignUpResponse>(endpoints.AUTH.register, { email, password })
    return response.data
}