import { TextStyle } from "react-native";

type TKey =
  | "titleBig"
  | "title"
  | "standart"
  | "standartSemibold"
  | "standartBold"
  | "small"
  | "smallSemibold"
  | "smallBold"
  | "ultraSmall";

const letterSpacing = 0.2

export const TEXT_STYLES: { [key in TKey]: TextStyle } = {
  titleBig: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Gilroy-bold",
    lineHeight: 30,
    letterSpacing,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    fontFamily: "Gilroy-bold",
    lineHeight: 26,
    letterSpacing,
  },
  standart: {
    fontSize: 17,
    fontWeight: "medium",
    fontFamily: "Gilroy-medium",
    lineHeight: 21,
    letterSpacing,
  },
  standartSemibold: {
    fontSize: 17,
    fontWeight: "semibold",
    fontFamily: "Gilroy-semibold",
    lineHeight: 21,
    letterSpacing,
  },
  standartBold: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Gilroy-bold",
    lineHeight: 21,
    letterSpacing,
  },
  small: {
    fontSize: 15,
    fontWeight: "medium",
    fontFamily: "Gilroy-medium",
    lineHeight: 18,
    letterSpacing,
  },
  smallSemibold: {
    fontSize: 15,
    fontWeight: "semibold",
    fontFamily: "Gilroy-semibold",
    lineHeight: 18,
    letterSpacing,
  },
  smallBold: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Gilroy-bold",
    lineHeight: 18,
    letterSpacing,
  },
  ultraSmall: {
    fontSize: 13,
    fontWeight: "medium",
    fontFamily: "Gilroy-medium",
    lineHeight: 15,
    letterSpacing,
  },
};
