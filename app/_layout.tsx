import { PreferProvider } from "@/context/usePerference";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export const Layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Topics", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <PreferProvider>
      <StatusBar barStyle={"dark-content"} />
      <Layout />
    </PreferProvider>
  );
}
