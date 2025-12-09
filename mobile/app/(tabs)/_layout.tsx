import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TopMenu } from '@/components/TopMenu';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const BAR_HEIGHT = 60; // keep in sync with TopMenu

  return (
    <View style={{flex: 1}}>
      <TopMenu />
      <View style={{flex: 1, paddingTop: insets.top + BAR_HEIGHT}}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
            tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
            // hide bottom tab bar because we'll use the top menu
            tabBarStyle: {display: 'none'},
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="our-fleet"
            options={{
              title: 'Our fleet',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="contact"
            options={{
              title: 'Contact',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="phone.fill" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
