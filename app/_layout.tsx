import { PreferProvider } from "@/context/usePerference";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export const Layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="qna" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <PreferProvider>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Layout />
    </PreferProvider>
  );
}
