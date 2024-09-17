import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather'; 
import { Colors } from './../../constants/Colors';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false ,
      tabBarActiveTintColor:Colors.PRIMARY,
    }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
