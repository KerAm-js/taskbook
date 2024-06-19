import { emptyTaskListSvg } from "@/assets/svg/emptyTaskList";
import { useThemeColors } from "@/shared";
import { Dimensions, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

export const EmptyListImage = () => {
  const { accent } = useThemeColors();
  return (
    <View style={styles.container}>
      <SvgXml xml={emptyTaskListSvg(accent)} width={250} height={250} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: (Dimensions.get('screen').height - 200) / 2 - 250,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
