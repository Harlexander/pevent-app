import { api } from '@/constants/axios'
import { endpoints } from '@/constants/endpoints'
import { Notification, NotificationResponse } from '@/types'
import { ResponseType, ResponseWithMeta } from '@/types/response'

export const getNotifications = async (page: number = 1) => {
    const response = await api.get<ResponseWithMeta<NotificationResponse>>(endpoints.notification.all, {
        params: { page }
    })
    return response.data
}

export const markNotificationAsRead = async (id: string) => {
    const response = await api.patch<ResponseType<Notification>>(
        endpoints.notification.markAsRead.replace(':id', id)
    )
    return response.data
}
