export const endpoints = {
    BASE_URL: "http://localhost:3000/api",
    IMAGE_URL: "https://pevent.com.ng/",
    AUTH : {
        login : "/auth/login",
        register : "/auth/register",
        verify : "/auth/verify",
        resend : "/auth/resend",
        forgot : "/auth/forgot",
        reset : "/auth/reset",
    },
    user : {
        get : "/user",
    },
    event : {
        app : "/app/event",
        view : "/app/event/:id",
        category : "/app/event/category/:category",
        search : "/app/event/search",
        recommended : "/app/event/recommended",
    },
    ticket : {
        all : "/app/ticket/all",
        view : "/app/ticket/:id",
    }
}