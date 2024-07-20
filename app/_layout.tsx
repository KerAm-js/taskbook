import { store } from "@/appLayer/store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

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
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Главная" }} />
            <Stack.Screen name="history" options={{ title: "Дневник задач" }} />
            <Stack.Screen
              name="taskForm"
              options={{
                title: "Новая задача",
                headerShown: true,
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="settings/index"
              options={{ title: "Настройки" }}
            />
            <Stack.Screen
              name="settings/language"
              options={{ title: "Язык" }}
            />
            <Stack.Screen
              name="settings/theme"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/reminders/index"
              options={{ title: "Напоминания", headerShown: true }}
            />
            <Stack.Screen
              name="settings/reminders/count"
              options={{ title: "Количество", presentation: "modal" }}
            />
            <Stack.Screen
              name="settings/reminders/interval"
              options={{ title: "Интервал", presentation: "modal" }}
            />
            <Stack.Screen
              name="settings/reminders/morningTime"
              options={{ title: "Начало дня", presentation: "modal" }}
            />
            <Stack.Screen
              name="settings/reminders/eveningTime"
              options={{ title: "Конец дня", presentation: "modal" }}
            />
          </Stack>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
