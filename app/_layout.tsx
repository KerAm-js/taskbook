import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: 'Главная' }} />
        <Stack.Screen name="history" options={{ title: 'Дневник задач' }} />
        <Stack.Screen name="taskForm" options={{ title: 'Новая задача' }} />
        <Stack.Screen name="settings/index" options={{ title: 'Настройки' }} />
        <Stack.Screen name="settings/language" options={{ title: 'Язык' }} />
        <Stack.Screen name="settings/theme" options={{ title: 'Тема' }} />
        <Stack.Screen name="settings/reminders/index" options={{ title: 'Напоминания' }} />
        <Stack.Screen name="settings/reminders/count" options={{ title: 'Количество' }} />
        <Stack.Screen name="settings/reminders/interval" options={{ title: 'Интервал' }} />
        <Stack.Screen name="settings/reminders/morningTime" options={{ title: 'Начало дня' }} />
        <Stack.Screen name="settings/reminders/eveningTime" options={{ title: 'Конец дня' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
