import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProgressProvider } from "../core/store";
export default function Layout() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#111916" },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="review" />
          <Stack.Screen name="lesson/[id]" />
        </Stack>
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
