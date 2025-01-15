import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/registeruser/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/signinnong/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/registerong/page" options={{headerShown: false}}/>
      </Stack>

      <StatusBar style="dark" />
    </>
  )
}
