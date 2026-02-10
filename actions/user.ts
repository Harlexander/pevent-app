import { api } from "@/constants/axios"
import { endpoints } from "@/constants/endpoints"
import { User } from "@/types"
import { ResponseType } from "@/types/response"

export type ChangePasswordInput = {
    currentPassword: string
    newPassword: string
}

export const getUser = async () => {
    const response = await api.get<ResponseType<User>>(endpoints.user.get)
    return response.data
}

export const updateUser = async (data: Partial<User>) => {
    const response = await api.put<ResponseType<User>>(endpoints.user.update, data)
    return response.data
}

export const changePassword = async (data: ChangePasswordInput) => {
    const response = await api.post<ResponseType<null>>(endpoints.user.changePassword, data)
    return response.data
}