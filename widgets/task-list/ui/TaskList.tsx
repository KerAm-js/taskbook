import {
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import React from "react";
import { PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { EmptyListImage } from "./EmptyListImage";
import { ITask, useTasks } from "@/entities/task";
import { Card } from "./Card";

const renderItem = ({ item }: ListRenderItemInfo<ITask>) => <Card {...item} />;

const keyExtractor = (item: ITask) => item.id.toString();

export const TaskList = () => {
  const tasks = useTasks();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={40}
    >
      <Animated.FlatList
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={16}
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        itemLayoutAnimation={LinearTransition.duration(300)}
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
