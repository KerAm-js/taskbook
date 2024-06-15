import {
  Dimensions,
  GestureResponderEvent,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Header from "./Header";
import React, { FC, useMemo, useRef, useState } from "react";
import { PADDING_TOP } from "@/shared";

const screenHeight = Dimensions.get("screen").height;

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
    Array(5)
      .fill(1)
      .map((_, i) => i.toString())
  );
  const touchStartY = useRef(0);
  const scrollClamp = useSharedValue(0);
  const footerHeight = useSharedValue(50);

  const handler = useAnimatedScrollHandler({
    // onBeginDrag: (event, context: { y: number }) => {
    //   context.y = event.contentOffset.y;
    // },
    // onScroll: (event) => {
    //   const { height } = event.contentSize;
    //   const diff = height - screenHeight;
    //   if (diff < 250 && diff > -250) {
    //     footerHeight.value = 230;
    //   }
    // },
    // onEndDrag: (event, context) => {
    //   const clamp = event.contentOffset.y - context.y;
    //   scrollClamp.value = clamp;
    //   if (event.contentOffset.y <= 0) {
    //     footerHeight.value = 50;
    //   }
    // },
  });

  const footerStyleAnim = useAnimatedStyle(() => {
    return {
      height: footerHeight.value,
    };
  }, [footerHeight.value]);

  const Footer = useMemo(() => <Animated.View style={footerStyleAnim} />, []);

  const onTouchStart = (e: GestureResponderEvent) => {
    touchStartY.current = e.nativeEvent.locationY;
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    scrollClamp.value = touchStartY.current - e.nativeEvent.locationY;
  };

  return (
    <View
      onLayout={(e) => console.log(e.nativeEvent.layout.height)}
      style={styles.container}
    >
      <Header scrollClamp={scrollClamp} />
      <Animated.FlatList
        scrollEventThrottle={16}
        onScroll={handler}
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        bounces={false}
        ListFooterComponent={Footer}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
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
