import React from 'react'
import { View } from 'react-native'
import ReactNativeModal from 'react-native-modal'

const UIModal = ({ isVisible, close, children }: { isVisible: boolean, close?: () => void, children: React.ReactNode }) => {
  return (
    <ReactNativeModal
        isVisible={isVisible}
        onBackdropPress={close}
        onSwipeComplete={close}
        swipeDirection={close ? ['down'] : undefined}
        avoidKeyboard={true}
        style={{ margin : 0}}
        propagateSwipe>
        <View
         className='justify-end flex-1'
        >
        {children}
        </View>
    </ReactNativeModal>
  )
}

export default UIModal