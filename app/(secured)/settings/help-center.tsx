import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { privacyPolicy, termsOfService } from '@/constants/legal'
import type { LegalDocument } from '@/constants/legal'
import { contact } from '@/constants/contact'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Linking, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type DocType = 'privacy' | 'terms'

const documents: Record<DocType, LegalDocument> = {
  privacy: privacyPolicy,
  terms: termsOfService,
}

const HelpCenter = () => {
  const { colorScheme } = useColorScheme()
  const [activeDoc, setActiveDoc] = useState<DocType | null>(null)

  const menuItems = [
    {
      icon: 'shield-checkmark-outline' as const,
      label: 'Privacy Policy',
      doc: 'privacy' as DocType,
    },
    {
      icon: 'document-text-outline' as const,
      label: 'Terms of Service',
      doc: 'terms' as DocType,
    },
    {
      icon: 'mail-outline' as const,
      label: 'Email Us',
      subtitle: contact.email,
      onPress: () => Linking.openURL(`mailto:${contact.email}`),
    },
    {
      icon: 'call-outline' as const,
      label: 'Call Us',
      subtitle: contact.phone,
      onPress: () => Linking.openURL(`tel:${contact.phone}`),
    },
  ]

  const activeDocument = activeDoc ? documents[activeDoc] : null

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-card">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-2 mb-4 bg-white dark:bg-dark-bg">
        <BackButton />
        <ThemedText className="text-lg font-jost-semibold text-black dark:text-white">Help Center</ThemedText>
        <View className="w-10" />
      </View>

      <View className="px-5" style={{ gap: 2 }}>
        {menuItems.map((item) => {
          const handlePress = 'doc' in item && item.doc
            ? () => setActiveDoc(item.doc)
            : 'onPress' in item
              ? item.onPress
              : undefined

          return (
            <TouchableOpacity
              key={item.label}
              onPress={handlePress}
              disabled={!handlePress}
              className="flex-row items-center justify-between p-4 bg-white dark:bg-dark-bg rounded-xl"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center">
                  <Ionicons name={item.icon} size={20} color="#3b82f6" />
                </View>
                <View>
                  <ThemedText className="text-base font-medium text-slate-900 dark:text-gray-100">{item.label}</ThemedText>
                  {'subtitle' in item && item.subtitle && (
                    <ThemedText className="text-xs text-gray-400 mt-0.5">{item.subtitle}</ThemedText>
                  )}
                </View>
              </View>
              {'doc' in item && item.doc && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Document Viewer Modal */}
      <Modal visible={!!activeDoc} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg">
          <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700">
            <TouchableOpacity onPress={() => setActiveDoc(null)}>
              <Ionicons name="close" size={24} color={colorScheme === 'dark' ? '#e5e7eb' : '#1f2937'} />
            </TouchableOpacity>
            <ThemedText className="text-lg font-jost-semibold text-black dark:text-white">{activeDocument?.title}</ThemedText>
            <View className="w-6" />
          </View>

          <ScrollView className="flex-1 px-5 py-4">
            {activeDocument?.lastUpdated && (
              <ThemedText className="text-xs text-gray-400 mb-4">
                Last Updated: {activeDocument.lastUpdated}
              </ThemedText>
            )}
            <View style={{ gap: 20 }}>
              {activeDocument?.sections.map((section, index) => (
                <View key={index} style={{ gap: 6 }}>
                  <ThemedText className="text-base font-semibold text-slate-900 dark:text-gray-100">
                    {index + 1}. {section.title}
                  </ThemedText>
                  <ThemedText className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.subtext}
                  </ThemedText>
                </View>
              ))}
            </View>
            <View className="h-10" />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

export default HelpCenter
