//ui
export { ThemedGradient } from "./ui/ThemedGradient";
export { Setting } from "./ui/Setting";
export { Header } from "./ui/Header";
export { ThemedText } from "./ui/ThemedText";
export { ThemedInput } from "./ui/ThemedInput";
export { ThemedView } from "./ui/ThemedView";
export { ThemedIcon } from "./ui/ThemedIcon";
export { AnimatedCheck } from "./ui/AnimatedCheck";
export { IconButton } from "./ui/IconButton";
export { CustomText } from "./ui/CustomText";

//config
export { THEME_COLORS, COLORS } from "./config/style/colors";
export { SCREEN_PADDING, PADDING_TOP } from "./config/style/views";
export { i18n } from "./config/i18n/i18n";
export { HEADER_SHADOW, HEADER_SHADOW_NIGHT } from "./config/style/shadows";
export { TEXT_STYLES } from "./config/style/texts";

//hooks
export { useSafeAreaPadding } from "./hooks/useSafeAreaPadding";
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
} from "./lib/dates";
