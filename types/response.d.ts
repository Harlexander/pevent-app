export interface ResponseType<T> {
    data: T
    message: string
    status: string
}

export interface Meta {
    page: number
    limit: number
    total: number
    totalPages: number
}

export interface ResponseWithMeta<T> {
    data: T
    message: string
    status: string
    meta: Meta
}

export interface SignInResponse extends ResponseType<{
    user: User
    accessToken: string
    refreshToken: string
}> {
}

export interface SignUpResponse extends ResponseType<{
    user: User
    accessToken: string
    refreshToken: string
}> {
}