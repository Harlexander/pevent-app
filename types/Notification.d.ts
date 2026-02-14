// Notification-related database types

export enum NotificationType {
    general = 'general',
    event = 'event',
    ticket = 'ticket',
    payout = 'payout',
    voting = 'voting',
    wallet = 'wallet'
}

export type Notification = {
    id: string
    type: NotificationType
    title: string
    content: string
    image?: string | null
    link?: string | null
    ctaLabel?: string | null
    read: boolean
    createdAt: string
    userId: string
}

export type NotificationResponse = {
    notifications: Notification[]
    unreadCount: number
}
