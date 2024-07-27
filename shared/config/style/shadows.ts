import { ViewStyle } from "react-native";
import { COLORS, THEME_COLORS } from "./colors";

export const HEADER_SHADOW: ViewStyle = {
  shadowOpacity: 0,
  borderBottomWidth: 1,
  borderBottomColor: THEME_COLORS.night.lineGrey,
};

export const HEADER_SHADOW_NIGHT: ViewStyle = {
  shadowOpacity: 0,
  borderBottomWidth: 1,
  borderBottomColor: THEME_COLORS.night.lineGrey,
};

export const VIEW_SHADOW: ViewStyle = {
  shadowOffset: {
    height: 6,
    width: 0,
  },
  shadowOpacity: 0.55,
  shadowRadius: 10,
  shadowColor: COLORS.shadow,
};

export const VIEW_SHADOW_REVERSE: ViewStyle = {
  shadowOffset: {
    height: -4,
    width: 0,
  },
  shadowOpacity: 0.55,
  shadowRadius: 10,
  shadowColor: COLORS.shadow,
};
