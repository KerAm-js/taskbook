import { closeCalendarSvg } from "@/assets/svg/closeCalendar";
import { folderSvg } from "@/assets/svg/folder";
import { openCalendarSvg } from "@/assets/svg/openCalendar";
import { settingsSvg } from "@/assets/svg/settings";
import { taskHistorySvg } from "@/assets/svg/taskHistory";
import { THEME_COLORS } from "@/shared/constants/colors";
import { SCREEN_PADDING } from "@/shared/constants/views";
import IconButton from "@/shared/ui/iconButton";
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
        onPress={() => console.log("some")}
      />
      <View style={styles.navBarRight}>
        <IconButton
          xml={folderSvg(THEME_COLORS.night.accent)}
          onPress={() => console.log("some")}
        />
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
    marginBottom: 12,
    paddingHorizontal: SCREEN_PADDING - (40 - 24) / 2,
  },
  navBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
})
