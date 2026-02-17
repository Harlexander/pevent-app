import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/theme';
import { HapticTab } from '@/components/haptic-tab';
import { useUser } from '@/hooks/query/useAuth';
import { useUserStore } from '@/store';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Import SVG icons
import HomeIcon from '@/assets/icons/tabs/home.svg';
import HomeFilledIcon from '@/assets/icons/tabs/home-filled.svg';
import SearchIcon from '@/assets/icons/tabs/search.svg';
import PassesIcon from '@/assets/icons/tabs/passes.svg';
import ProfileIcon from '@/assets/icons/tabs/profile.svg';

export default function MainLayout() {
  const { data } = useUser();
  const { setUser } = useUserStore()
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'

  useEffect(() => {
    if (data) {
      setUser(data.data)
    }
  }, [data]);


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#687076',
        headerShown: false,
        lazy: false,
        popToTopOnBlur: true,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 110,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: isDark ? '#212121' : '#fff',
            borderTopColor: isDark ? '#374151' : '#e5e7eb',
          },
          default: {
            height: 100,
            paddingBottom: 20,
            paddingTop: 10,
            backgroundColor: isDark ? '#212121' : '#fff',
            borderTopColor: isDark ? '#374151' : '#e5e7eb',
          },
        }),
        tabBarLabelStyle: {
          color: isDark ? '#9ca3af' : '#687076',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeFilledIcon width={24} height={24} color={color} />
            ) : (
              <HomeIcon width={24} height={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <SearchIcon width={24} height={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="passes"
        options={{
          title: 'Passes',
          tabBarIcon: ({ color }) => <PassesIcon width={24} height={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <ProfileIcon width={24} height={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
