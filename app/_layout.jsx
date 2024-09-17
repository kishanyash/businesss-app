import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "../components/LoginScreen";
import * as SecureStore from "expo-secure-store";


const tokenCache = {
  getToken: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Error fetching token:", err);
      return null;
    }
  },
  saveToken: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Font loading
  const [fontsLoaded] = useFonts({
    'Outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  useEffect(() => {
    const fetchToken = async () => {
      const token = await tokenCache.getToken("someKey");
      if (token) {
        console.log("Token fetched:", token);
      } else {
        console.error("Token is null");
      }
    };

    fetchToken();
  }, []);

  // Linking configuration
  const linking = {
    prefixes: ["yourapp://", "https://yourapp.com"],
    config: {
      screens: {
        Home: "home",
        Profile: "profile/:id", 
        Login: "login",
        NotFound: "*",
      },
    },
  };

  // Check if fonts are loaded
  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SignedIn>
        <Stack linking={linking}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Define other screens like Profile, etc. */}
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
