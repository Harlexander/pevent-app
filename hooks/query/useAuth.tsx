import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { signIn, signUp, googleSignIn } from "../../actions/auth"
import {
    getUser,
    updateUser,
    changePassword,
    ChangePasswordInput,
    emailVerification,
    forgotPassword,
    resetPassword,
    ResetPasswordInput,
    storeImage,
    deleteAccount,
} from "../../actions/user"
import { useUserStore } from "@/store/user-store"
import { User } from "@/types"

export const useSignIn = () => {
    const { setUser } = useUserStore()
    return useMutation({
        mutationFn: async (data: { email: string, password: string }) => await signIn(data.email, data.password),
        onSuccess: (data) => {
            setUser(data.data.user)
        }
    })
}

export const useGoogleSignIn = () => {
    const { setUser } = useUserStore()
    return useMutation({
        mutationFn: async (idToken: string) => await googleSignIn(idToken),
        onSuccess: (data) => {
            setUser(data.data.user)
        }
    })
}

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (data: { email: string; password: string; firstName: string; lastName: string }) =>
            await signUp(data),
    })
}

export const useUser = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled,
        retry: 1
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const { updateUser: updateUserStore } = useUserStore()

    return useMutation({
        mutationFn: async (data: Partial<User>) => await updateUser(data),
        onSuccess: (response) => {
            updateUserStore(response.data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: ChangePasswordInput) => await changePassword(data),
    })
}

export const useEmailVerification = () => {
    return useMutation({
        mutationFn: async (otp: number) => await emailVerification(otp),
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => await forgotPassword(email),
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (data: ResetPasswordInput) => await resetPassword(data),
    })
}

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: deleteAccount,
    })
}

export const useUploadImage = () => {
    const queryClient = useQueryClient()
    const { updateUser: updateUserStore } = useUserStore()

    return useMutation({
        mutationFn: async ({ uri, type }: { uri: string; type: string }) => {
            const uploadResponse = await storeImage(uri, type)
            const userResponse = await updateUser({ image: uploadResponse.file_path })
            return userResponse
        },
        onSuccess: (response) => {
            updateUserStore(response.data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
}