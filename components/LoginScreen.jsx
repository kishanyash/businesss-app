import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      
      if (createdSessionId) {
        // Set the active session
        setActive({ session: createdSessionId });

        // Save the session token (using a consistent key like "authToken")
        await SecureStore.setItemAsync("authToken", createdSessionId);
        console.log("Token saved successfully!");
      } else {
        // Handle signIn or signUp
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 90,
      }}>
        <Image source={require('./../assets/images/login.png')}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: '#000'
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={{
          fontSize: 27,
          fontFamily: 'Outfit-Bold',
        }}>Your Ultimate
          <Text style={{
            color: Colors.PRIMARY,
          }}> Community Business Directory </Text>
          App
        </Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Outfit',
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.GRAY
        }}>Find your favorite business near you and post your business to your community</Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'Outfit-Bold',
            color: '#FFF',
            fontSize: 15,
          }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    marginTop: 10,
    borderRadius: 99,
  },
});
