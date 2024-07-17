import { checkSvg } from "@/assets/svg/check";
import { COLORS, useThemeColors } from "@/shared";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

export const DoneBtn = () => {
  const { colors } = useThemeColors();

  const onPress = () => {
    Keyboard.dismiss();
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.circle, { backgroundColor: colors.accent }]}>
        <SvgXml width={14} height={14} xml={checkSvg(COLORS.white)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
