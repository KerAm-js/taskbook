import {
  CustomText,
  isDatesEquals,
  isToday,
  SCREEN_PADDING,
  TCalendarWeek,
  THEME_COLORS,
} from "@/shared";
import React, { FC } from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("screen").width;
const BUTTON_WIDTH = WIDTH * 0.132;

console.log(WIDTH);

const WeekDays: FC<{
  data: TCalendarWeek;
  selectedDate: Date;
  onPress: (date: Date) => void;
}> = ({ data, selectedDate, onPress }) => {
  return (
    <View style={styles.container}>
      {data.days.map((day) => {
        const isSelected = isDatesEquals(day, selectedDate);
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
                style={styles.dateTitle}
                translate={false}
                type={isSelected ? "text-semibold" : "text"}
              >
                {day.getDate().toString()}
              </CustomText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default React.memo(WeekDays);

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
    lineHeight: 18,
  },
});
