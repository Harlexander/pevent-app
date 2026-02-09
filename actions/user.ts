import { api } from "@/constants/axios"
import { endpoints } from "@/constants/endpoints"
import { User } from "@/types"
import { ResponseType } from "@/types/response"

export const getUser = async () => {
    const response = await api.get<ResponseType<User>>(endpoints.user.get)
    return response.data
}