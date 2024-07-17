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
        xml={settingsSvg(THEME_COLORS.night.accent)}
        onPress={() => router.navigate("/settings")}
      />
      <View style={styles.navBarRight}>
        <IconButton
          xml={taskHistorySvg(THEME_COLORS.night.accent)}
          onPress={() => router.navigate("/history")}
        />
        <IconButton
          xml={
            isCalendarOpened
              ? closeCalendarSvg(THEME_COLORS.night.accent)
              : openCalendarSvg(THEME_COLORS.night.accent)
          }
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
