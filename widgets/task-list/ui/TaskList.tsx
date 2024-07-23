import {
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import React, { useCallback, useRef } from "react";
import { PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { EmptyListImage } from "./EmptyListImage";
import { useTasks } from "@/entities/task";
import { Card } from "./Card";
import { FlatList } from "react-native-gesture-handler";

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const { data, ids } = useTasks();

  const ref = useRef<FlatList<any> | null>(null);

  const scrollToCard = useCallback((pageY: number) => {
    if (ref.current) {
      ref.current.scrollToOffset({ animated: true, offset: pageY });
    }
  }, []);

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <Animated.FlatList
      ref={ref}
      keyboardShouldPersistTaps="always"
      scrollEventThrottle={16}
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={ids}
      renderItem={({ item }: ListRenderItemInfo<number>) => (
        <Card scroll={scrollToCard} {...data[item]} />
      )}
      keyExtractor={keyExtractor}
      itemLayoutAnimation={LinearTransition.duration(350)}
      ListEmptyComponent={EmptyListImage}
    />
    // </KeyboardAvoidingView>
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
