import {
  GestureResponderEvent,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Header from "./Header";
import React, { FC, useRef, useState } from "react";
import { PADDING_TOP } from "@/shared";
import { OpenTaskFormBtn } from "@/features/task/open-task-form";

const Component: FC<{ item: string }> = React.memo(({ item }) => {
  return (
    <View
      style={{
        height: 70,
        backgroundColor: "#ddd",
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderCurve: "continuous",
      }}
    >
      <Text>{item}</Text>
    </View>
  );
});

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
  <Component item={item} />
);

const keyExtractor = (item: string) => item;

export const MainListHeader = () => {
  const [data, setData] = useState<string[]>(
    Array(15)
      .fill(1)
      .map((_, i) => i.toString())
  );
  const touchStartY = useRef(0);
  const scrollClamp = useSharedValue(0);

  const onTouchStart = (e: GestureResponderEvent) => {
    touchStartY.current = e.nativeEvent.locationY;
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    scrollClamp.value = touchStartY.current - e.nativeEvent.locationY;
  };

  return (
    <View style={styles.container}>
      <Header scrollClamp={scrollClamp} />
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
      <OpenTaskFormBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: PADDING_TOP,
  },
  scroll: {
    flex: 1,
  },
});
