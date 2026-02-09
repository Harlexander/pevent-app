import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ children, className, onPress, disabled }: { children: React.ReactNode, className?: string, onPress?: () => void, disabled?: boolean }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} className={`bg-primary rounded px-4 h-14 items-center justify-center ${className}`}>
      <Text className='text-white text-center'>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button