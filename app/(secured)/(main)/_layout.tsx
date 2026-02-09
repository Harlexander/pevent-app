import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';


import { AntDesign, EvilIcons, FontAwesome, Ionicons} from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { HapticTab } from '@/components/haptic-tab';
import { useUser } from '@/hooks/query/useAuth';
import { useUserStore } from '@/store';

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
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="passes"
        options={{
          title: 'Passes',
          tabBarIcon: ({ color }) => <EvilIcons name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user-o" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
