import { api } from "@/constants/axios"
import { endpoints } from "@/constants/endpoints"
import { Event } from "@/types"
import { ResponseType, ResponseWithMeta } from "@/types/response"


export const getAppEvents = async () => {
    const response = await api.get<ResponseType<{
        featured: Event[],
        trending: Event[],
        latest: Event[],
    }>>(endpoints.event.app)
    

    return response.data
}

export const getEventById = async (id: string) => {
    const response = await api.get<ResponseType<Event>>(endpoints.event.view.replace(":id", id))
    return response.data
}

export const getEventsByCategory = async (category: string) => {
    const response = await api.get<ResponseWithMeta<Event[]>>(endpoints.event.category.replace(":category", category))
    return response.data
}

export const searchEvents = async (search: string) => {
    const response = await api.get<ResponseWithMeta<Event[]>>(endpoints.event.search, {
        params: {
            q: search
        }
    })
    return response.data
}

export const getRecommendedEvents = async () => {
    const response = await api.get<ResponseWithMeta<Event[]>>(endpoints.event.recommended)
    return response.data
}

