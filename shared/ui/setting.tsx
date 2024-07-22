import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { CustomText } from "./CustomText";
import { Toggle } from "./Toggle";
import { arrowLeftSvg } from "@/assets/svg/arrowLeft";
import { useThemeColors } from "../hooks/useTheme";
import { TEXT_STYLES } from "../config/style/texts";

type TPropTypes =
  | {
      onPress: () => void;
      xmlGetter?: (color: string) => string;
      type: "toggle";
      title: string;
      toggleValue?: boolean;
      value?: undefined;
      disabled?: boolean;
    }
  | {
      onPress: () => void;
      xmlGetter?: (color: string) => string;
      type: "navigate" | "value";
      title: string;
      toggleValue?: undefined;
      value?: undefined;
      disabled?: boolean;
    }
  | {
      onPress: () => void;
      xmlGetter?: (color: string) => string;
      type: "value";
      title: string;
      toggleValue?: undefined;
      value?: string | number;
      disabled?: boolean;
    };

export const Setting: FC<TPropTypes> = ({
  onPress,
  xmlGetter,
  type,
  title,
  value,
  toggleValue,
  disabled,
}) => {
  const { colors } = useThemeColors();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, disabled && styles.containerDisabled]}
    >
      <ThemedView style={styles.card} colorName="backgroundSecond">
        {xmlGetter && (
          <ThemedView colorName="accent" style={styles.iconContainer}>
            <SvgXml xml={xmlGetter(colors.background)} width={20} height={20} />
          </ThemedView>
        )}
        <CustomText themed style={styles.title}>
          {title}
        </CustomText>
        <View style={styles.rightContainer}>
          {type === "value" && (
            <CustomText
              themed
              colorName="textGrey"
              translate={false}
              style={[
                styles.value,
                typeof value === "number" && { marginTop: 2 },
              ]}
            >
              {value || ""}
            </CustomText>
          )}
          {type === "toggle" && <Toggle value={!!toggleValue} />}
          {(type === "navigate" || type === "value") && (
            <SvgXml
              style={styles.arrowStyle}
              xml={arrowLeftSvg(colors.grey)}
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
  containerDisabled: {
    opacity: 0.5,
  },
  card: {
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
    borderRadius: 7,
    marginRight: 5,
    borderCurve: "continuous",
  },
  rightContainer: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    flex: 1,
    marginLeft: 5,
    ...TEXT_STYLES.standart,
  },
  value: {
    ...TEXT_STYLES.standart,
  },
  arrowStyle: {
    transform: [{ rotate: "180deg" }],
  },
});
