import { Text, TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import { ThemedText } from '../themed-text'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'
type ButtonRounded = 'full' | 'lg' | 'md' | 'sm' | 'none'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  textClassName?: string
  onPress?: () => void
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  rounded?: ButtonRounded
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary',
  outline: 'bg-transparent border-2 border-gray-300 dark:border-gray-700',
  ghost: 'bg-transparent',
  secondary: 'bg-gray-200 dark:bg-gray-700',
  destructive: 'bg-red-500',
  link: 'bg-transparent',
}

const variantTextClasses: Record<ButtonVariant, string> = {
  default: 'text-white',
  outline: 'text-black',
  ghost: 'text-primary',
  secondary: 'text-gray-900 dark:text-gray-100',
  destructive: 'text-white',
  link: 'text-primary underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-14 px-6',
  sm: 'h-10 px-4',
  lg: 'h-16 px-8',
  icon: 'h-12 w-12 px-0',
}

const sizeTextClasses: Record<ButtonSize, string> = {
  default: 'text-base',
  sm: 'text-sm',
  lg: 'text-lg',
  icon: 'text-base',
}

const roundedClasses: Record<ButtonRounded, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
  none: 'rounded-none',
}

const shadowStyles: Record<ButtonVariant, ViewStyle | undefined> = {
  default: {
    shadowColor: '#004cff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  destructive: {
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  outline: undefined,
  ghost: undefined,
  secondary: undefined,
  link: undefined,
}

const Button = ({
  children,
  className,
  textClassName,
  onPress,
  disabled,
  variant = 'default',
  size = 'default',
  rounded = 'lg',
  loading = false,
}: ButtonProps) => {
  const shadow = !disabled ? shadowStyles[variant] : undefined

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`w-full h-16 items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${disabled ? 'opacity-50' : ''} ${className ?? ''}`}
      style={shadow}
      activeOpacity={variant === 'ghost' || variant === 'link' ? 0.5 : 0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'default' || variant === 'destructive' ? '#fff' : Colors.primary} />
      ) : typeof children === 'string' ? (
        <ThemedText className={`text-center font-medium font-jost-semibold ${variantTextClasses[variant]} ${sizeTextClasses[size]} ${textClassName ?? ''}`}>
          {children}
        </ThemedText>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default Button