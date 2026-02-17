import React from 'react'
import { ThemedText } from './themed-text'

const Currency = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const formattedValue = typeof children === 'number'
    ? children.toLocaleString('en-US')
    : children

  return (
    <ThemedText className={`dark:text-white text-black ${className}`}>₦{formattedValue}</ThemedText>
  )
}

export default Currency