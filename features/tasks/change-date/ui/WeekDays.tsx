import {
  CustomText,
  isDatesEqual,
  isToday,
  SCREEN_PADDING,
  TCalendarWeek,
  THEME_COLORS,
} from "@/shared";
import { TEXT_SEMIBOLD_STYLE, TEXT_STYLE } from "@/shared/config/style/texts";
import React, { FC } from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("screen").width;
const BUTTON_WIDTH = WIDTH * 0.132;

export const WeekDays: FC<{
  data: TCalendarWeek;
  selectedDate: Date;
  onPress: (date: Date) => void;
}> = React.memo(({ data, selectedDate, onPress }) => {
  return (
    <View style={styles.container}>
      {data.days.map((day) => {
        const isSelected = isDatesEqual(day, selectedDate);
        return (
          <Pressable
            onPress={() => onPress(day)}
            key={day.valueOf().toString()}
            style={styles.dateButton}
          >
            <View
              style={[
                styles.titleWrapper,
                isSelected
                  ? styles.selected
                  : isToday(day) && styles.todayTitleWrapper,
              ]}
            >
              <CustomText
                style={[styles.dateTitle, isSelected && styles.selectedDateTitle]}
                translate={false}
              >
                {day.getDate().toString()}
              </CustomText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SCREEN_PADDING - (BUTTON_WIDTH - 30) / 2,
    justifyContent: "space-between",
    width: WIDTH,
  },
  dateButton: {
    paddingTop: 20,
    width: BUTTON_WIDTH,
    height: 60,
    alignItems: "center",
  },
  todayTitleWrapper: {
    borderWidth: 2,
    borderColor: THEME_COLORS.night.accent_opacity,
  },
  selected: {
    backgroundColor: THEME_COLORS.night.accent_opacity,
  },
  first: {
    alignSelf: "flex-start",
  },
  last: {
    alignSelf: "flex-end",
  },
  titleWrapper: {
    borderRadius: 7,
    borderCurve: "continuous",
    height: 30,
    width: 30,
    paddingTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  dateTitle: {
    color: THEME_COLORS.night.text,
    ...TEXT_STYLE
  },
  selectedDateTitle: {
    ...TEXT_SEMIBOLD_STYLE
  }
});
