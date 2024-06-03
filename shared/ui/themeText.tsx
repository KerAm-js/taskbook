import { FC } from "react";
import { Text, TextStyle } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { THEME_COLORS } from "../constants/colors";
import { i18n } from "../config/i18n/i18n";

const ThemeText: FC<{
  type:
    | "title"
    | "title-big"
    | "text"
    | "text-bold"
    | "text-semibold"
    | "text-middle"
    | "text-middle-bold"
    | "text-middle-semibold"
    | "text-small";
  isTextGrey?: boolean;
  children: string;
  theme?: keyof typeof THEME_COLORS;
  style?: TextStyle;
}> = ({ type, children, isTextGrey, theme, style }) => {
  let fontSize: TextStyle["fontSize"] = 17;
  let fontWeight: TextStyle["fontWeight"] = "bold";

  const color = useThemeColor({
    colorName: isTextGrey ? "textGrey" : "text",
    theme,
  });

  switch (type) {
    case "title": {
      fontSize = 21;
      break;
    }
    case "title-big": {
      fontSize = 25;
      break;
    }
    case "text-bold": {
      break;
    }
    case "text-semibold": {
      fontWeight = "semibold";
      break;
    }
    case "text-middle": {
      fontWeight = "medium";
      break;
    }
    case "text-middle-semibold": {
      fontWeight = "semibold";
      break;
    }
    case "text-middle-bold": {
      fontSize = 15;
      break;
    }
    case "text-small": {
      fontSize = 12;
      fontWeight = "medium";
      break;
    }
  }

  return (
    <Text
      style={[
        { fontSize, fontWeight, color, fontFamily: "Gilroy-bold" },
        style,
      ]}
    >
      {i18n.t(children)}
    </Text>
  );
};

export default ThemeText;
