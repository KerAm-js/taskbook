import {
  LayoutAnimation,
  ListRenderItemInfo,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { Card } from "./Card";
import { EmptyListImage } from "./EmptyListImage";
import { useSelectedDate, useTaskIds } from "@/entities/task";
import { useSharedValue } from "react-native-reanimated";

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const taskIds = useTaskIds();
  const selectedDate = useSelectedDate();
  const isInitialRender = useSharedValue(true);

  useEffect(() => {
    isInitialRender.value = false;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [taskIds]);

  useEffect(() => {
    isInitialRender.value = true;
  }, [selectedDate]);

  return (
    <FlatList
      scrollEventThrottle={16}
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={taskIds}
      renderItem={({ item, index }: ListRenderItemInfo<number>) => {
        const i = { value: index };
        return <Card isInitialRender={isInitialRender} index={i} id={item} />;
      }}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyListImage}
    />
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
    paddingHorizontal: SCREEN_PADDING,
  },
  scroll: {
    flex: 1,
  },
});
