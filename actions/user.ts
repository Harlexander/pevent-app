import { api } from "@/constants/axios"
import { endpoints } from "@/constants/endpoints"
import { User } from "@/types"
import { ResponseType } from "@/types/response"

export type ChangePasswordInput = {
    currentPassword: string
    newPassword: string
}

export const getUser = async () => {
    const response = await api.get<ResponseType<User>>(endpoints.user.get)
    return response.data
}

export const updateUser = async (data: Partial<User>) => {
    const response = await api.put<ResponseType<User>>(endpoints.user.update, data)
    return response.data
}

export const changePassword = async (data: ChangePasswordInput) => {
    const response = await api.post<ResponseType<null>>(endpoints.user.changePassword, data)
    return response.data
}

export const emailVerification = async (otp: number) => {
    const response = await api.post<ResponseType<null>>(endpoints.user.emailVerification, { otp })
    return response.data
}

export const forgotPassword = async (email: string) => {
    const response = await api.post<ResponseType<null>>(endpoints.user.forgotPassword, { email })
    return response.data
}

export type ResetPasswordInput = {
    password: string
    id: string
    token: string
}

export const resetPassword = async (data: ResetPasswordInput) => {
    const response = await api.post<ResponseType<null>>(endpoints.user.resetPassword, data)
    return response.data
}

export type StoreImageResponse = {
    file_path: string
}

export type ReferralData = {
    referralCode: string
    referredBy: string | null
    referralCount: number
}

export const getReferral = async () => {
    const response = await api.get<ResponseType<ReferralData>>(endpoints.referral.get)
    return response.data
}

export const applyReferralCode = async (referralCode: string) => {
    const response = await api.post<ResponseType<null>>(endpoints.referral.apply, { referralCode })
    return response.data
}

export const registerPushToken = async (token: string, device?: string) => {
    const response = await api.post<ResponseType<null>>(endpoints.pushToken.register, { token, device });
    return response.data;
};

export const togglePushNotifications = async (isActive: boolean) => {
    const response = await api.put<ResponseType<null>>(endpoints.pushToken.toggle, { isActive });
    return response.data;
};

export const deleteAccount = async () => {
    const response = await api.delete<ResponseType<null>>(endpoints.user.deleteAccount)
    return response.data
}

export const storeImage = async (uri: string, type: string) => {
    const formData = new FormData()
    const filename = uri.split('/').pop() || 'image.jpg'
    const ext = filename.split('.').pop() || 'jpg'
    const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`

    formData.append('file', { uri, name: filename, type: mimeType } as unknown as Blob)
    formData.append('type', type)

    const response = await api.post<StoreImageResponse>(endpoints.fileUpload, formData)
    return response.data
}