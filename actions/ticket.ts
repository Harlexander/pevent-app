import { TicketBought } from "@/types"
import { api } from "@/constants/axios"
import { endpoints } from "@/constants/endpoints"
import { ResponseType } from "@/types/response"

export const getAppTickets = async () => {
    const response = await api.get<ResponseType<TicketBought[]>>(endpoints.ticket.all)
    return response.data
}

export const getTicketById = async (id: string) => {
    const response = await api.get<ResponseType<TicketBought>>(endpoints.ticket.view.replace(":id", id))
    return response.data
}
