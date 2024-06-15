import { FC } from "react";
import { Text, TextStyle } from "react-native";
import { i18n } from "../config/i18n/i18n";
import { IThemeTextProps, ThemeText } from "./themeText";

export const CustomText: FC<
  {
    connectTheme?: boolean;
    translate?: boolean;
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
  } & IThemeTextProps
> = ({ translate = true, type, children, connectTheme, ...props }) => {
  let fontSize: TextStyle["fontSize"] = 17;
  let fontWeight: TextStyle["fontWeight"] = "bold";
  let fontFamily: TextStyle["fontFamily"] = "Gilroy-bold";
  let lineHeight: TextStyle["lineHeight"] = 21;

  switch (type) {
    case "title": {
      fontSize = 21;
      lineHeight = 26;
      break;
    }
    case "title-big": {
      fontSize = 24;
      lineHeight = 30;
      break;
    }
    case "text-bold": {
      break;
    }
    case "text": {
      fontWeight = "medium";
      fontFamily = "Gilroy-medium";
      break;
    }
    case "text-semibold": {
      fontWeight = "semibold";
      fontFamily = "Gilroy-semibold";
      break;
    }
    case "text-middle": {
      fontSize = 15;
      lineHeight = 18;
      fontWeight = "medium";
      fontFamily = "Gilroy-medium";
      break;
    }
    case "text-middle-semibold": {
      fontSize = 15;
      lineHeight = 18;
      fontWeight = "semibold";
      fontFamily = "Gilroy-semibold";
      break;
    }
    case "text-middle-bold": {
      fontSize = 15;
      lineHeight = 18;
      break;
    }
    case "text-small": {
      fontSize = 12;
      lineHeight = 14;
      fontWeight = "medium";
      fontFamily = "Gilroy-medium";
      break;
    }
  }

  const string = translate ? i18n.t(children) : children;

  if (connectTheme) {
    return <ThemeText {...props}>{string}</ThemeText>;
  }

  return (
    <Text
      style={[{ fontSize, fontWeight, fontFamily }, props.style]}
    >
      {string}
    </Text>
  );
};
