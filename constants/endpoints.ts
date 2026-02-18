export const endpoints = {
    BASE_URL: process.env.EXPO_PUBLIC_ENVIROMENT === "production" ? process.env.EXPO_PUBLIC_PRODUCTION_URL : process.env.EXPO_PUBLIC_DEVELOPMENT_URL,
    IMAGE_URL: process.env.EXPO_PUBLIC_ENVIROMENT === "production" ? process.env.EXPO_PUBLIC_PRODUCTION_IMAGE_URL : process.env.EXPO_PUBLIC_DEVELOPMENT_IMAGE_URL,
    AUTH: {
        login: "/auth/login",
        register: "/auth/create"
    },
    user: {
        get: "/user",
        update: "/user",
        changePassword: "/user/change-password",
        emailVerification: "/user/email-verification",
        resetPassword: "/user/reset-password",
        forgotPassword: "/user/forgot-password",
        deleteAccount: "/user/delete-account",
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
    dva: {
        get: "/user/dva",
        create: "/user/dva",
    },
    wallet: {
        get: '/wallet',
        transactions: "/wallet/transactions",
        spend: "/wallet/spend",
        intent: "/wallet/intent",
    },
    fileUpload: "/file-upload",
    notification: {
        all: "/notifications",
        markAsRead: "/notifications/:id"
    },
    coupon: {
        validate: "/event/coupon",
    },
    referral: {
        get: "/user/referral",
        apply: "/user/referral",
    },
    pushToken: {
        register: "/user/notification-token",
        toggle: "/user/notification-token",
    }
}