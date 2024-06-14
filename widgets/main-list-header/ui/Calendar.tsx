import { CustomText, i18n, THEME_COLORS } from "@/shared";
import { SCREEN_PADDING } from "@/shared/config/style/views";
import { MONTHS, WEEK_DAYS } from "@/shared/consts/datetime";
import { getCalendarWeeks, TCalendarWeek } from "@/shared/lib/dates";
import { FC, useState } from "react";
import { Dimensions, ListRenderItemInfo, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import DateItem from "./DateItem";

const WIDTH = Dimensions.get("screen").width;

const renderItem = ({ item }: ListRenderItemInfo<TCalendarWeek>) => {
  return <DateItem data={item} />;
};

const keyExtractor = (item: TCalendarWeek) => item.days[0].valueOf().toString();

const Calendar: FC<{ isCalendarOpened: boolean }> = () => {
  const index = useSharedValue(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weeks, setWeeks] = useState(getCalendarWeeks());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonths, setCurrentMonths] = useState<
    [number, number | undefined]
  >(weeks[0].months);

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const i = Math.round(event.contentOffset.x / WIDTH);
      if (index.value !== i) {
        index.value = i;
        console.log(weeks[i])
        runOnJS(setCurrentMonths)(weeks[i].months);
        if (weeks[i].year != year) {
          runOnJS(setYear)(weeks[i].year);
        }
      }
    },
  });

  const monthString =
    i18n.t(MONTHS[currentMonths[0]]) +
    (typeof currentMonths[1] === "number"
      ? " / " + i18n.t(MONTHS[currentMonths[1]])
      : "") +
    (year != new Date().getFullYear() ? " " + year : "");

  const updateCalendar = () => {
    const lastDate = weeks[weeks.length - 1].days[6];
    const fDate = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate() + 1
    );
    setWeeks([
      ...weeks,
      ...getCalendarWeeks(
        fDate,
        new Date(fDate.getFullYear(), fDate.getMonth(), fDate.getDate() + 42)
      ),
    ]);
  };

  console.log("============================");

  return (
    <View style={styles.container}>
      <CustomText translate={false} style={styles.title} type="title-big">
        {monthString}
      </CustomText>
      <View style={styles.weekContainer}>
        <View style={styles.weekDaysList}>
          {WEEK_DAYS.map((i) => (
            <CustomText key={i.full} style={styles.weekDay} type="text-middle">
              {i.short}
            </CustomText>
          ))}
        </View>
        <Animated.FlatList
          data={weeks}
          renderItem={renderItem}
          onScroll={handler}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          initialNumToRender={2}
          onEndReached={updateCalendar}
          onEndReachedThreshold={0.5}
          keyExtractor={keyExtractor}
          getItemLayout={(_, index) => ({
            length: WIDTH,
            offset: WIDTH * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.branded.accent,
  },
  title: {
    marginLeft: SCREEN_PADDING,
    color: THEME_COLORS.night.text,
    lineHeight: 31,
  },
  weekContainer: {
    paddingTop: 15,
  },
  weekDaysList: {
    top: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_PADDING,
    position: "absolute",
    width: "100%",
  },
  weekDay: {
    color: THEME_COLORS.night.textGrey,
    width: 30,
    textAlign: "center",
    marginBottom: 2,
    lineHeight: 18,
  },
});
