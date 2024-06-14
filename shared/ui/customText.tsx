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

  const string = translate ? i18n.t(children) : children;

  if (connectTheme) {
    return <ThemeText {...props}>{string}</ThemeText>;
  }

  return (
    <Text
      style={[{ fontSize, fontWeight, fontFamily: "Gilroy-bold" }, props.style]}
    >
      {string}
    </Text>
  );
};
