import { Pressable, StyleSheet, Text, View } from "react-native";
import { TEXT_STYLES } from "../config/style/texts";
import { ThemedView } from "./ThemedView";
import { FC } from "react";
import { AnimatedCheck } from "./AnimatedCheck";
import { useThemeColors } from "../hooks/useTheme";
import { SCREEN_PADDING } from "../config/style/views";

export const CheckList: FC<{
  data: Array<{ title: string; value: any }>;
  selected: any;
  onPress: (value: any) => void;
}> = ({ data, selected, onPress }) => {
  const { colors } = useThemeColors();

  return (
    <View style={styles.container}>
      <ThemedView colorName="backgroundSecond" style={styles.listContainer}>
        {data.map((item, index) => (
          <Pressable
            key={item.title}
            onPress={() => onPress(item.value)}
            style={[
              styles.item,
              index !== 0 && {
                borderColor: colors.background,
                borderTopWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                item.value === selected
                  ? TEXT_STYLES.standartBold
                  : TEXT_STYLES.standart,
              ]}
            >
              {item.title}
            </Text>
            <AnimatedCheck isChecked={item.value === selected} />
          </Pressable>
        ))}
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDING,
  },
  listContainer: {
    borderRadius: 12,
    borderCurve: "continuous",
    paddingVertical: 5,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    ...TEXT_STYLES.standart,
  },
});
