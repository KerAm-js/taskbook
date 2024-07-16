import {
  AnimatedCheck,
  CustomText,
  THEME_COLORS,
  useTheme,
  COLORS,
  TEXT_STYLES,
} from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { themeSlice } from "../model/themeSlice";
import { TTheme } from "@/shared/config/style/colors";

export const ThemeCard: FC<{ theme: TTheme }> = ({ theme }) => {
  const dispatch = useDispatch();
  const setTheme = () => dispatch(themeSlice.actions.setTheme(theme));
  const currentTheme = useTheme();

  const onPress = () => {
    setTheme();
  };

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(currentTheme === theme ? 1 : 0.95) }],
    };
  }, [currentTheme]);

  return (
    <Animated.View style={containerStyleAnim}>
      <View style={[styles.shadowContainer, currentTheme === 'night' && styles.shadowNight ]}>
        <Pressable
          style={[
            styles.container,
            { backgroundColor: THEME_COLORS[theme].background },
          ]}
          onPress={onPress}
        >
          <View
            style={[
              styles.header,
              { backgroundColor: THEME_COLORS[theme].header },
            ]}
          >
            <CustomText style={styles.title}>
              {theme}
            </CustomText>
            <AnimatedCheck
              defaultTheme="night"
              width={22}
              height={22}
              isChecked={currentTheme === theme}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.lineContainer}>
              <AnimatedCheck
                defaultTheme={theme}
                isChecked={false}
                borderRadius={5}
                width={18}
                height={18}
              />
              <View
                style={[
                  styles.line,
                  {
                    width: "80%",
                    backgroundColor: THEME_COLORS[theme].lineGrey,
                  },
                ]}
              />
            </View>
            <View style={styles.lineContainer}>
              <AnimatedCheck
                defaultTheme={theme}
                isChecked={false}
                borderRadius={5}
                width={18}
                height={18}
              />
              <View
                style={[
                  styles.line,
                  {
                    width: "50%",
                    backgroundColor: THEME_COLORS[theme].lineGrey,
                  },
                ]}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 15,
    borderCurve: "continuous",
    marginBottom: 15,
  },
  shadowContainer: {
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: COLORS.shadow,
    shadowRadius: 10,
  },
  shadowNight: {
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      height: 4,
      width: 0,
    },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingRight: 10,
  },
  title: {
    color: THEME_COLORS.night.text,
    alignSelf: "flex-end",
    ...TEXT_STYLES.standartBold,
  },
  body: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 10,
  },
  line: {
    borderRadius: 2,
    height: 10,
    borderCurve: "continuous",
  },
  lineContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
