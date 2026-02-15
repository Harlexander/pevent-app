import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ children, className, onPress, disabled }: { children: React.ReactNode, className?: string, onPress?: () => void, disabled?: boolean }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled} 
      className={`bg-primary w-full rounded-lg px-4 h-16 items-center justify-center ${className}`}
      style={{
          shadowColor: disabled ? 'transparent' : '#004cff',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: disabled ? 0 : 4,
        }}>
      <Text className='text-white text-center'>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button