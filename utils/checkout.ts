import { Ticket, Attendee, TicketItem, TicketPurchaseMetadata } from '@/types'

export type BearerType = 'user' | 'event' | 'split'

export interface FeeConfig {
    bearer: BearerType
    ticketRate: number
    ticketFixed: number
}

export function calculateTotalPrice(tickets: Ticket[], quantities: Record<string, number>): number {
    return tickets.reduce((sum, ticket) => sum + ticket.price * (quantities[ticket.id] || 0), 0)
}

export function calculateTotalTickets(quantities: Record<string, number>): number {
    return Object.values(quantities).reduce((a, b) => a + b, 0)
}

export function calculateFees(
    tickets: Ticket[],
    quantities: Record<string, number>,
    feeConfig: FeeConfig,
): number {
    const { bearer, ticketRate, ticketFixed } = feeConfig

    if (bearer === 'event') return 0

    let fees = 0
    tickets.forEach((ticket) => {
        const qty = quantities[ticket.id] || 0
        if (qty > 0) {
            const feePerTicket = ticket.price * ticketRate + ticketFixed
            fees += feePerTicket * qty
        }
    })

    if (bearer === 'split') return Math.ceil(fees / 2)

    return fees
}

export function buildSelectedTicketItems(
    tickets: Ticket[],
    quantities: Record<string, number>,
): TicketItem[] {
    return tickets
        .filter((t) => quantities[t.id] > 0)
        .map((t) => ({
            ticketId: t.id,
            name: t.name,
            quantity: quantities[t.id],
            price: t.price,
            subtotal: t.price * quantities[t.id],
        }))
}

export function buildPurchaseMetadata(params: {
    firstName: string
    lastName: string
    email: string
    finalPrice: number
    selectedTicketItems: TicketItem[]
    totalQuantity: number
    sendToDifferentEmails: boolean
    attendees: Attendee[]
    promoCode: string
}): TicketPurchaseMetadata {
    return {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        amount: params.finalPrice,
        purpose: 'ticket',
        tickets: params.selectedTicketItems,
        totalQuantity: params.totalQuantity,
        bearer: 'account',
        ...(params.sendToDifferentEmails && params.attendees.length > 0 && { attendees: params.attendees }),
        ...(params.promoCode && { coupon: params.promoCode }),
    }
}

export function initializeAttendees(tickets: Ticket[], quantities: Record<string, number>): Attendee[] {
    const attendees: Attendee[] = []
    tickets.forEach((ticket) => {
        const qty = quantities[ticket.id] || 0
        for (let i = 0; i < qty; i++) {
            attendees.push({
                firstName: '',
                lastName: '',
                email: '',
                ticketId: ticket.id,
                ticketName: ticket.name,
            })
        }
    })
    return attendees
}
