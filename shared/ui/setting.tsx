import { FC } from "react";
import { ThemedView } from "./themedView";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { CustomText } from "./customText";
import { Toggle } from "./toggle";
import { arrowLeftSvg } from "@/assets/svg/arrowLeft";
import { useThemeColors } from "../hooks/useTheme";
import { TEXT_STYLE } from "../config/style/texts";

export const Setting: FC<{
  onPress: () => void;
  xmlGetter?: (color: string) => string;
  type: "toggle" | "navigate" | "value";
  title: string;
  value?: string;
  toggleValue?: boolean;
}> = ({ onPress, xmlGetter, type, title, value, toggleValue }) => {
  const { grey, background } = useThemeColors();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ThemedView style={styles.themedView} colorName="input">
        {xmlGetter && (
          <ThemedView colorName="accent" style={styles.iconContainer}>
            <SvgXml xml={xmlGetter(background)} width={20} height={20} />
          </ThemedView>
        )}
        <CustomText themed style={styles.title}>
          {title}
        </CustomText>
        <View style={styles.leftContainer}>
          {type === "value" && (
            <CustomText themed colorName="textGrey" style={styles.title}>
              {value || ""}
            </CustomText>
          )}
          {type === "toggle" && <Toggle value={!!toggleValue} />}
          {(type === "navigate" || type === "value") && (
            <SvgXml
              style={styles.arrowStyle}
              xml={arrowLeftSvg(grey)}
              width={16}
              height={16}
            />
          )}
        </View>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 46,
    marginBottom: 10,
  },
  themedView: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    borderRadius: 12,
    borderCurve: "continuous",
    alignItems: "center",
  },
  iconContainer: {
    width: 26,
    height: 26,
    padding: 3,
    borderRadius: 6,
    marginRight: 10,
    borderCurve: "continuous",
  },
  leftContainer: {
    marginLeft: 5,
  },
  title: {
    flex: 1,
    ...TEXT_STYLE,
  },
  value: {
    ...TEXT_STYLE,
  },
  arrowStyle: {
    transform: [{ rotate: "180deg" }],
  },
});
