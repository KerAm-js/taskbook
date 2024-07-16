import { checkSvg } from "@/assets/svg/check";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { THEME_COLORS, TTheme } from "../config/style/colors";
import { useTheme } from "../hooks/useTheme";

export const AnimatedCheck: FC<{
  defaultTheme?: TTheme;
  width?: number;
  height?: number;
  isChecked: boolean;
  borderRadius?: number;
}> = ({ defaultTheme, width = 20, height = 20, isChecked, borderRadius }) => {
  const theme = useTheme();

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      width: isChecked ? withTiming(width, { duration: 500 }) : 0,
    };
  }, [isChecked]);

  const borderColor = THEME_COLORS[defaultTheme || theme].accent_opacity;
  const iconColor = THEME_COLORS[defaultTheme || theme].accent;

  const containerStyle = {
    width: width,
    height: height,
    borderColor: borderColor,
    borderRadius: borderRadius || width / 2,
    borderWidth: isChecked ? 0 : 1.5,
  };

  const backgroundStyle = {
    borderRadius: borderRadius || width / 2,
    backgroundColor: isChecked ? borderColor : "rgba(0, 0, 0, 0)",
  };

  return (
    <View style={[containerStyle, styles.container]}>
      <View style={[backgroundStyle, styles.background]}>
        <View style={{ width: 14, height: 14 }}>
          <Animated.View style={[{ overflow: "hidden" }, containerStyleAnim]}>
            <SvgXml xml={checkSvg(iconColor)} width={14} height={14} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: "continuous",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
  },
});
