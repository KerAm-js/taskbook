import {
  Dimensions,
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
import React, { FC, useMemo, useState } from "react";

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
  const scrollClamp = useSharedValue(0);
  const footerHeight = useSharedValue(30);

  const handler = useAnimatedScrollHandler({
    onBeginDrag: (event, context: { y: number }) => {
      context.y = event.contentOffset.y;
    },
    onScroll: (event) => {
      const { height } = event.contentSize;
      if (height > screenHeight && footerHeight.value < 200) {
        footerHeight.value = 200;
      }
    },
    onEndDrag: (event, context) => {
      const clamp = event.contentOffset.y - context.y;
      scrollClamp.value = clamp;
      if (event.contentOffset.y <= 0) {
        footerHeight.value = 30;
      }
    },
  });

  const footerStyleAnim = useAnimatedStyle(() => {
    return {
      height: footerHeight.value,
    };
  }, [footerHeight.value]);

  const Footer = useMemo(() => <Animated.View style={footerStyleAnim} />, []);
  const ListHeader = useMemo(() => <Header scrollClamp={scrollClamp} />, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        scrollEventThrottle={16}
        onScroll={handler}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        bounces={false}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={Footer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});
