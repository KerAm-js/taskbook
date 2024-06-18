import {
  GestureResponderEvent,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import React, { FC, useRef, useState } from "react";
import { PADDING_TOP, ThemedText, ThemedView } from "@/shared";

const Component: FC<{ item: string }> = React.memo(({ item }) => {
  return (
    <ThemedView
      colorName="input"
      style={{
        height: 70,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderCurve: "continuous",
      }}
    >
      <ThemedText>{item}</ThemedText>
    </ThemedView>
  );
});

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
  <Component item={item} />
);

const keyExtractor = (item: string) => item;

export const TaskList: FC<{ scrollClamp: { value: number } }> = ({
  scrollClamp,
}) => {
  const [data, setData] = useState<string[]>(
    Array(15)
      .fill(1)
      .map((_, i) => i.toString())
  );
  const touchStartY = useRef(0);

  const onTouchStart = (e: GestureResponderEvent) => {
    touchStartY.current = e.nativeEvent.locationY;
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    scrollClamp.value = touchStartY.current - e.nativeEvent.locationY;
  };

  return (
    <Animated.FlatList
      scrollEventThrottle={16}
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      bounces={false}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
  },
  scroll: {
    flex: 1,
  },
});
