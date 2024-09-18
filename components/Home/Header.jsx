import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Colors } from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header() {
  const { user } = useUser();  

  return (
    <View style={{
      padding: 20,
      paddingTop: 40,
      backgroundColor: Colors.PRIMARY,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,

    }}>
      <View style={{
        flexDirection: 'row',  
        alignItems: 'center',  
        gap: 10
      }}>
        {/* User Avatar */}
        <Image 
          source={{ uri: user?.imageUrl }} 
          style={{
            width: 45,
            height: 45,
            borderRadius: 99
          }}
        />
        
        {/* Welcome Text */}
        <View>
          <Text style={{ color: '#fff' }}>Welcome,</Text>
          <Text style={{
            fontSize: 19,
            fontFamily: 'Outfit-Medium',
            color: '#fff'
          }}>
            {user?.fullName || 'Guest'}  
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,  
      }}>
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput 
          placeholder='Search...' 
          style={{ 
            flex: 1,  
            marginLeft: 10,
            fontFamily:'Outfit',
            fontSize:16,
          }}
        />
      </View>
    </View>
  );
}
