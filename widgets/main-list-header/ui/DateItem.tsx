import {
  CustomText,
  SCREEN_PADDING,
  TCalendarWeek,
  THEME_COLORS,
} from "@/shared";
import React, { FC } from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("screen").width;

const DateItem: FC<{ data: TCalendarWeek }> = ({ data }) => {
  return (
    <View style={styles.datesList}>
      {data.days.map((day) => {
        return (
          <Pressable key={day.valueOf().toString()} style={styles.dateButton}>
            <CustomText
              style={styles.dateTitle}
              translate={false}
              type="text-middle-semibold"
            >
              {day.getDate().toString()}
            </CustomText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default React.memo(DateItem);

const styles = StyleSheet.create({
  dateButton: {
    paddingTop: 20,
    width: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTitle: {
    color: THEME_COLORS.night.text,
    lineHeight: 18,
  },
  datesList: {
    flexDirection: "row",
    paddingHorizontal: SCREEN_PADDING,
    justifyContent: "space-between",
    width: WIDTH,
  },
});
