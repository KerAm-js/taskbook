//ui
export { ThemedGradient } from "./ui/ThemedGradient";
export { Setting } from "./ui/Setting";
export { Header } from "./ui/Header";
export { ThemedText } from "./ui/ThemedText";
export { ThemedInput } from "./ui/ThemedInput";
export { ThemedView } from "./ui/ThemedView";
export { AnimatedCheck } from "./ui/AnimatedCheck";
export { IconButton } from "./ui/IconButton";
export { CustomText } from "./ui/CustomText";
export { CheckList } from "./ui/CheckList";

//config
export { I18n } from "./config/i18n/i18n";
export { LANGUAGES } from "./config/i18n/translations";
export { THEME_COLORS, COLORS } from "./config/style/colors";
export { SCREEN_PADDING, PADDING_TOP } from "./config/style/views";
export {
  HEADER_SHADOW,
  HEADER_SHADOW_NIGHT,
  VIEW_SHADOW,
  VIEW_SHADOW_REVERSE,
} from "./config/style/shadows";
export { TEXT_STYLES } from "./config/style/texts";

//hooks
export { useSafeAreaPadding } from "./hooks/useSafeAreaPadding";
export { useKeyboard } from "./hooks/useKeyboard";
export {
  useThemeColors,
  useAnimatedThemeStyle,
  useTheme,
} from "./hooks/useTheme";

//lib
export {
  TCalendarWeek,
  isDatesEqual,
  getCalendarWeeks,
  isToday,
  isTomorrow,
  isYesterday,
  isCurrentYear,
  endOfDay,
  getNextDate,
  getDate,
  getMonth,
  getYear,
  getDateTitle,
} from "./lib/dates";
export { getTimeString } from "./lib/time";
export { logNextTriggerDate, setNotification, deleteNotification } from "./lib/notifications";

//types
export { TLanguage } from "./config/i18n/translations";
export { TColorName, TTheme } from "@/shared/config/style/colors";
export { TSetNotificationArg } from "./lib/notifications";
