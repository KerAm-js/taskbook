import { arrowLeftSvg } from "@/assets/svg/arrowLeft";
import { CustomText, THEME_COLORS } from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

const ScrollToStartButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <SvgXml
        xml={arrowLeftSvg(THEME_COLORS.night.accent)}
        width={12}
        height={12}
      />
      {/* <CustomText style={styles.title} type="text-middle-semibold">
        today
      </CustomText> */}
    </Pressable>
  );
};

export default ScrollToStartButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.night.accent_opacity,
    height: 22,
    width: 22,
    borderRadius: 11,
    // paddingLeft: 5,
    // paddingRight: 8,
    alignItems: "center",
    justifyContent: 'center',
    // flexDirection: "row",
    // gap: 1,
  },
  title: {
    paddingTop: 2,
    color: THEME_COLORS.night.accent,
  },
});
