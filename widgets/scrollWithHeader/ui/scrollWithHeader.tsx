import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Header from "./Header";
import { useState } from "react";

export const ScrollWithHeader = () => {
  const [data, setData] = useState([...Array(40)]);
  const scrollsToBottom = useSharedValue<boolean>(false);

  const handler = useAnimatedScrollHandler({
    onBeginDrag: (event, context: { y: number }) => {
      context.y = event.contentOffset.y;
    },
    onEndDrag: (event, context) => {
      scrollsToBottom.value = context.y < event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <Header scrollsToBottom={scrollsToBottom} />
      <Animated.FlatList
        scrollEventThrottle={16}
        onScroll={handler}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={() => (
          <View
            style={{
              height: 70,
              backgroundColor: "#ddd",
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
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
