import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/theme';
import { HapticTab } from '@/components/haptic-tab';
import { useUser } from '@/hooks/query/useAuth';
import { useUserStore } from '@/store';

// Import SVG icons
import HomeIcon from '@/assets/icons/tabs/home.svg';
import HomeFilledIcon from '@/assets/icons/tabs/home-filled.svg';
import SearchIcon from '@/assets/icons/tabs/search.svg';
import PassesIcon from '@/assets/icons/tabs/passes.svg';
import ProfileIcon from '@/assets/icons/tabs/profile.svg';

export default function MainLayout() {
  const { data } = useUser();
  const { setUser } = useUserStore()

  useEffect(() => {
    if (data) {
      setUser(data.data)
    }
  }, [data]);


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        lazy: false,
        popToTopOnBlur: true,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: 110,              // increase height
            paddingBottom: 30,       // adjust bottom spacing for icons/labels
            paddingTop: 10,
          },
          default: {
            height: 100,              // increase height
            paddingBottom: 20,       // adjust bottom spacing for icons/labels
            paddingTop: 10,
          },
        }),
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
