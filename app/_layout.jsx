import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  useFonts({
    'Outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium' : require('./../assets/fonts/Outfit-Medium.ttf'),
     'Outfit-Bold' :  require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
    <ClerkProvider publishableKey={publishableKey}>
    <SignedIn>
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false,
      }} />

    </Stack>
    </SignedIn>
    <SignedOut>
      <Text>Signed Out</Text>
    </SignedOut>
    </ClerkProvider>
  );
}
