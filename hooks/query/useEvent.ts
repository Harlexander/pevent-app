import { useQuery } from "@tanstack/react-query"
import { getAppEvents, getEventById, getEventsByCategory, getRecommendedEvents, searchEvents } from "../../actions/event"

export const useAppEvents = () => {
    return useQuery({
        queryKey: ['app-events'],
        queryFn: getAppEvents,
    })
}

export const useEvent = (id: string) => {
    return useQuery({
        queryKey: ['event', id],
        queryFn: () => getEventById(id),
        enabled: !!id
    })
}

export const useEventsByCategory = (category: string) => {
    return useQuery({
        queryKey: ['events', 'category', category],
        queryFn: () => getEventsByCategory(category),
        enabled: !!category
    })
}

export const useSearchEvents = (search: string) => {
    return useQuery({
        queryKey: ['events', 'search', search],
        queryFn: () => searchEvents(search),
        enabled: !!search && search.length > 0
    })
}

export const useRecommendedEvents = () => {
    return useQuery({
        queryKey: ['events', 'recommended'],
        queryFn: getRecommendedEvents,
    })
}
