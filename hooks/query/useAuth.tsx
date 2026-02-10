import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { signIn, signUp } from "../../actions/auth"
import { getUser, updateUser, changePassword, ChangePasswordInput } from "../../actions/user"
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

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (data: { email: string, password: string }) => await signUp(data.email, data.password),
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