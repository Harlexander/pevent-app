import React from 'react'
import { ThemedText } from './themed-text'

const Currency = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <ThemedText className={`${className}`}>₦{children}</ThemedText>
  )
}

export default Currency