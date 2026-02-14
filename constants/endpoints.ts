export const endpoints = {
    BASE_URL: "https://centipedal-burt-nonprominently.ngrok-free.dev/api",
    IMAGE_URL: "https://pevent.com.ng/",
    AUTH: {
        login: "/auth/login",
        register: "/auth/register",
        verify: "/auth/verify",
        resend: "/auth/resend",
        forgot: "/auth/forgot",
        reset: "/auth/reset",
    },
    user: {
        get: "/user",
        update: "/user",
        changePassword: "/user/change-password",
        emailVerification: "/user/email-verification",
        resetPassword: "/user/reset-password",

    },
    event: {
        app: "/app/event",
        view: "/app/event/:id",
        category: "/app/event/category/:category",
        search: "/app/event/search",
        recommended: "/app/event/recommended",
    },
    ticket: {
        all: "/app/ticket/all",
        view: "/app/ticket/:id",
    },
    organiser: {
        get: "/app/organiser/:id",
    },
    card: {
        get: "/cards",
        delete: "/cards/:cardId",
        charge: "/cards/charge"
    },
    wallet: {
        get: '/wallet',
        transactions: "/wallet/transactions",
        spend: "/wallet/spend"
    },
    notification: {
        all: "/notifications",
        markAsRead: "/notifications/:id"
    }
}