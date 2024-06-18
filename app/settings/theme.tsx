import { ThemeCard } from "@/features/settings/set-theme";
import {
  Header,
  PADDING_TOP,
  SCREEN_PADDING,
  useAnimatedThemeStyle,
} from "@/shared";
import { ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export default function Theme() {
  const colorStyleAnim = useAnimatedThemeStyle("background");

  return (
    <Animated.View style={[styles.container, colorStyleAnim]}>
      <Header title={"theme"} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemeCard theme="branded" />
        <ThemeCard theme="purple" />
        <ThemeCard theme="darkBlue" />
        <ThemeCard theme="night" />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
  },
});
