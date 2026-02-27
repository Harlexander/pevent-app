import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import UIModal from '@/components/UIModal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import { useGuestStore } from '@/store/guest-store'

interface AuthRequiredModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  message?: string
}

const AuthRequiredModal = ({
  visible,
  onClose,
  title = 'Sign in Required',
  message = 'Create an account or log in to access this area or feature.',
}: AuthRequiredModalProps) => {
  const router = useRouter()
  const { exitGuestMode } = useGuestStore()

  const navigateTo = (path: string) => {
    onClose()
    exitGuestMode()
    router.replace(path as any)
  }

  return (
    <UIModal isVisible={visible} close={onClose}>
      <ThemedView className="rounded-t-3xl p-5 pb-10 gap-6 items-center">
        <View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mb-2" />
        <Image
          source={require('@/assets/logo.png')}
          style={{ width: 60, height: 60 }}
          contentFit="contain"
        />
        <ThemedView className="items-center gap-2 mb-4">
          <ThemedText className="text-2xl font-jost-semibold text-black dark:text-gray-100">{title}</ThemedText>
          <ThemedText className="text-center text-base opacity-70 px-4 text-black dark:text-gray-100">
            {message}
          </ThemedText>
        </ThemedView>
        <ThemedView className="w-full gap-3">
          <Button onPress={() => navigateTo('/(onboarding)/register')} rounded='full'>
            Sign up
          </Button>
          <Button
            onPress={() => navigateTo('/(onboarding)/login')}
            variant={'outline'}
            rounded='full'
          >Log in</Button>
        </ThemedView>
      </ThemedView>
    </UIModal>
  )
}

export default AuthRequiredModal
