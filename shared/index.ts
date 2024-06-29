//ui
export { ThemedGradient } from "./ui/ThemedGradient";
export { Setting } from "./ui/setting";
export { Header } from "./ui/header";
export { ThemedText } from "./ui/themeText";
export { ThemedView } from "./ui/themedView";
export { AnimatedCheck } from "./ui/animatedCheck";
export { IconButton } from "./ui/iconButton";
export { CustomText } from "./ui/customText";

//config
export { THEME_COLORS, COLORS } from "./config/style/colors";
export { SCREEN_PADDING, PADDING_TOP } from "./config/style/views";
export { i18n } from "./config/i18n/i18n";
export { HEADER_SHADOW, HEADER_SHADOW_NIGHT } from "./config/style/shadows";
export {
  TITLE_STYLE,
  TITLE_BIG_STYLE,
  TEXT_BOLD_STYLE,
  TEXT_MIDDLE_BOLD_STYLE,
  TEXT_MIDDLE_SEMIBOLD_STYLE,
  TEXT_MIDDLE_STYLE,
  TEXT_SEMIBOLD_STYLE,
  TEXT_SMALL_STYLE,
} from "./config/style/texts";

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
