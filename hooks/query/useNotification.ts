import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getNotifications, markNotificationAsRead } from '@/actions/notification'

export const useNotifications = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: () => getNotifications(),
        enabled,
    })
}

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
        },
    })
}
