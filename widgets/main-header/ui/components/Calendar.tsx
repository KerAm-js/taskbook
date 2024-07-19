import { ScrollToStartButton, WeekDays } from "@/features/tasks/change-date";
import {
  CustomText,
  getCalendarWeeks,
  TCalendarWeek,
  THEME_COLORS,
  TEXT_STYLES,
} from "@/shared";
import { SCREEN_PADDING } from "@/shared/config/style/views";
import { MONTHS, WEEK_DAYS } from "@/shared/consts/datetime";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const WIDTH = Dimensions.get("screen").width;

const keyExtractor = (item: TCalendarWeek) => item.days[0].valueOf().toString();

const Calendar: FC<{ isCalendarOpened: boolean }> = () => {
  const index = useSharedValue(0);
  const listRef = useRef<Animated.FlatList<TCalendarWeek> | null>(null);
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weeks, setWeeks] = useState(getCalendarWeeks());
  const [titleData, setTitleData] = useState({
    months: weeks[0].months,
    year: new Date().getFullYear(),
  });
  const scrollToStartBtnOpacity = useSharedValue(0);
  const preventHandler = useSharedValue(false);

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (preventHandler.value) {
        if (event.contentOffset.x === 0) {
          preventHandler.value = false;
        }
      } else {
        const i = Math.round(event.contentOffset.x / WIDTH);
        scrollToStartBtnOpacity.value = withTiming(i > 0 ? 1 : 0);
        if (index.value !== i) {
          index.value = i;
          const data = {
            months: weeks[i].months,
            year:
              weeks[i].year != titleData.year ? weeks[i].year : titleData.year,
          };
          runOnJS(setTitleData)(data);
        }
      }
    },
    onEndDrag: () => {},
  });

  const monthString =
    t(MONTHS[titleData.months[0]]) +
    (typeof titleData.months[1] === "number"
      ? " / " + t(MONTHS[titleData.months[1]])
      : "") +
    (titleData.year != new Date().getFullYear() ? " " + titleData.year : "");

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

  const scrollToStart = () => {
    if (listRef.current) {
      preventHandler.value = true;
      listRef.current.scrollToIndex({ animated: true, index: 0 });
      setSelectedDate(new Date());
    }
  };

  const scrollToStartBtnStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: scrollToStartBtnOpacity.value,
      display: scrollToStartBtnOpacity.value === 0 ? "none" : "flex",
    };
  }, [scrollToStartBtnOpacity.value]);

  const onPress = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <CustomText translate={false} style={styles.title}>
          {monthString}
        </CustomText>
        <Animated.View style={scrollToStartBtnStyleAnim}>
          <ScrollToStartButton onPress={scrollToStart} />
        </Animated.View>
      </View>
      <View style={styles.weekContainer}>
        <View style={styles.weekDaysList}>
          {WEEK_DAYS.map((item) => (
            <CustomText
              key={item.full}
              style={styles.weekDay}
            >
              {item.short}
            </CustomText>
          ))}
        </View>
        <Animated.FlatList
          ref={listRef}
          data={weeks}
          renderItem={({ item }) => {
            return (
              <WeekDays
                onPress={onPress}
                selectedDate={selectedDate}
                data={item}
              />
            );
          }}
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
  },
  title: {
    color: THEME_COLORS.night.text,
    ...TEXT_STYLES.titleBig
  },
  weekContainer: {
    paddingTop: 17,
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
    ...TEXT_STYLES.small
  },
  monthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SCREEN_PADDING,
    height: 30,
  },
});
