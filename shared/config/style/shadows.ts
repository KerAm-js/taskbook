import { ViewStyle } from "react-native";
import { THEME_COLORS } from "./colors";

export const HEADER_SHADOW: ViewStyle = {
  // shadowOffset: {
  //   height: 4,
  //   width: 0,
  // },
  // shadowOpacity: 0.25,
  // shadowRadius: 2,
  // shadowColor: "#000",
  shadowOpacity: 0,
  borderBottomWidth: 1,
  borderBottomColor: THEME_COLORS.night.lineGrey,
};

export const HEADER_SHADOW_NIGHT: ViewStyle = {
  shadowOpacity: 0,
  borderBottomWidth: 1,
  borderBottomColor: THEME_COLORS.night.lineGrey,
};
