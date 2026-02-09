import { useMutation, useQuery } from "@tanstack/react-query"
import { signIn, signUp } from "../../actions/auth"
import { getUser } from "../../actions/user"
import { useUserStore } from "@/store/user-store"
import { useEffect } from "react"

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