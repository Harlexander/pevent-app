import { useQuery } from "@tanstack/react-query"
import { getAppTickets, getTicketById } from "../../actions/ticket"

export const useAppTickets = () => {
    return useQuery({
        queryKey: ['app-tickets'],
        queryFn: getAppTickets,
    })
}

export const useTicket = (id: string) => {
    return useQuery({
        queryKey: ['ticket', id],
        queryFn: () => getTicketById(id),
        enabled: !!id
    })
}
