import { closeCalendarSvg } from "@/assets/svg/closeCalendar";
import { openCalendarSvg } from "@/assets/svg/openCalendar";
import { settingsSvg } from "@/assets/svg/settings";
import { taskHistorySvg } from "@/assets/svg/taskHistory";
import { IconButton, THEME_COLORS, SCREEN_PADDING } from "@/shared";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

const NavBar: FC<{
  isCalendarOpened: boolean;
  toggleCalendarOpened: () => void;
}> = ({ isCalendarOpened, toggleCalendarOpened }) => {
  return (
    <View style={[styles.navBar]}>
      <IconButton
        xmlGetter={settingsSvg}
        colorName="accent"
        defaultTheme="night"
        onPress={() => router.navigate("/settings")}
      />
      <View style={styles.navBarRight}>
        <IconButton
          xmlGetter={settingsSvg}
          colorName="accent"
          defaultTheme="night"
          onPress={() => router.navigate("/history")}
        />
        <IconButton
          xmlGetter={isCalendarOpened ? closeCalendarSvg : openCalendarSvg}
          colorName="accent"
          defaultTheme="night"
          onPress={toggleCalendarOpened}
        />
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 25 - (40 - 24) / 2,
    paddingHorizontal: SCREEN_PADDING - (40 - 24) / 2,
  },
  navBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
