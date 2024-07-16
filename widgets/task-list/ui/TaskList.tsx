import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
} from "react-native";
import Animated, {
  LinearTransition,
  SharedValue,
} from "react-native-reanimated";
import React, { FC, useRef, useState } from "react";
import { PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { EmptyListImage } from "./EmptyListImage";
import { ITask, useTasks } from "@/entities/task";
import { Card } from "./Card";

const renderItem = ({ item }: ListRenderItemInfo<ITask>) => <Card {...item} />;

const keyExtractor = (item: ITask) => item.id.toString();

export const TaskList: FC<{ scrollClamp: SharedValue<number> }> = ({
  scrollClamp,
}) => {
  const tasks = useTasks();
  const touchStartY = useRef(0);

  const onTouchStart = (e: GestureResponderEvent) => {
    touchStartY.current = e.nativeEvent.locationY;
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    scrollClamp.value = touchStartY.current - e.nativeEvent.locationY;
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={40}
    >
      <Animated.FlatList
        scrollEventThrottle={16}
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        itemLayoutAnimation={LinearTransition.duration(300)}
        // onTouchStart={onTouchStart}
        // onTouchEnd={onTouchEnd}
        ListEmptyComponent={EmptyListImage}
      />
    </KeyboardAvoidingView>
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
