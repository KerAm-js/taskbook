import Animated from "react-native-reanimated";
import { useAnimatedThemeStyle, useTheme } from "../hooks/useTheme";
import { useSafeAreaPadding } from "../hooks/useSafeAreaPadding";
import { CustomText } from "./customText";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { arrowLeftSvg } from "@/assets/svg/arrowLeft";
import { THEME_COLORS } from "../config/style/colors";
import { SvgXml } from "react-native-svg";
import { SCREEN_PADDING } from "../config/style/views";
import { useNavigation } from "expo-router";
import { HEADER_SHADOW } from "../config/style/shadows";
import { TEXT_STYLE } from "../config/style/texts";

export const Header: FC<{ title: string; rotateLeftIcon?: boolean }> = ({
  title,
  rotateLeftIcon,
}) => {
  const styleAnim = useAnimatedThemeStyle("header");
  const theme = useTheme();
  const { paddingTop: top } = useSafeAreaPadding();

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Animated.View
      style={[
        styles.container,
        theme === "night" && styles.nightShadow,
        {
          paddingTop: top,
        },
        styleAnim,
      ]}
    >
      <Pressable onPress={goBack} style={styles.left}>
        <SvgXml
          xml={arrowLeftSvg(THEME_COLORS.night.accent)}
          width={18}
          height={18}
          style={rotateLeftIcon && { transform: [{ rotate: "-90deg" }] }}
        />
      </Pressable>
      <CustomText style={styles.title} defaultTheme="night" colorName="accent">
        {title}
      </CustomText>
      <View style={styles.right} />
      {/* чисто для удобства */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    flexDirection: "row",
    ...HEADER_SHADOW,
  },
  nightShadow: {
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.night.lineGrey,
  },
  left: {
    justifyContent: "center",
    paddingHorizontal: SCREEN_PADDING,
    height: 40,
    width: 80,
  },
  title: {
    ...TEXT_STYLE,
  },
  right: {
    height: 40,
    width: 80,
  },
});
