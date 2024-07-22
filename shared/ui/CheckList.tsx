import { Pressable, StyleSheet, Text, View } from "react-native";
import { TEXT_STYLES } from "../config/style/texts";
import { ThemedView } from "./ThemedView";
import { FC } from "react";
import { AnimatedCheck } from "./AnimatedCheck";
import { useThemeColors } from "../hooks/useTheme";
import { SCREEN_PADDING } from "../config/style/views";
import { CustomText } from "./CustomText";

type TPropTypes = {
  data: Array<{ title: string; value: any }>;
  selected: any;
  onPress: (value: any) => void;
  translateTitle?: boolean;
};

export const CheckList: FC<TPropTypes> = ({
  data,
  selected,
  onPress,
  translateTitle = false,
}) => {
  const { colors } = useThemeColors();

  return (
    <View style={styles.container}>
      <ThemedView colorName="backgroundSecond" style={styles.listContainer}>
        {data.map((item, index) => {
          const isChecked =
            typeof selected === "object"
              ? JSON.stringify(item.value) === JSON.stringify(selected)
              : item.value === selected;

          return (
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
              <CustomText
                translate={translateTitle}
                style={[
                  isChecked ? TEXT_STYLES.standartBold : TEXT_STYLES.standart,
                ]}
                colorName="text"
                themed
              >
                {item.title}
              </CustomText>
              <AnimatedCheck isChecked={isChecked} />
            </Pressable>
          );
        })}
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
