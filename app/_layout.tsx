import { store, persistor } from "@/appLayer/store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-medium": require("@/assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-semibold": require("@/assets/fonts/Gilroy-Semibold.ttf"),
    "Gilroy-bold": require("@/assets/fonts/Gilroy-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="history" />
              <Stack.Screen
                name="taskForm"
                options={{
                  presentation: "modal",
                }}
              />
              <Stack.Screen name="settings/index" />
              <Stack.Screen name="settings/language" />
              <Stack.Screen name="settings/theme" />
              <Stack.Screen name="settings/reminders/index" />
              <Stack.Screen
                name="settings/reminders/count"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="settings/reminders/interval"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="settings/reminders/beginningOfDay"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="settings/reminders/endOfDay"
                options={{ presentation: "modal" }}
              />
            </Stack>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
