import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { THEME_GRADIENTS } from "../config/style/colors";

export const ThemedGradient: FC = () => {
  const theme = useTheme();

  const colors = THEME_GRADIENTS[theme];

  return <LinearGradient style={styles.background} colors={colors} />;
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
