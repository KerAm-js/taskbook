import { CustomText, TEXT_STYLES, useThemeColors } from "@/shared";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface IProps {
  xmlGetter: (color: string) => string;
  title?: string;
  translateTitle?: boolean;
  contentColor?: string;
  backgroundColor?: string;
}

export const TaskInfo: FC<IProps> = ({
  xmlGetter,
  title,
  contentColor,
  backgroundColor,
  translateTitle,
}) => {
  const { text, lineGrey } = useThemeColors();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || lineGrey },
      ]}
    >
      <SvgXml xml={xmlGetter(contentColor || text)} width={14} height={14} />
      {title && (
        <CustomText
          style={[styles.title, { color: contentColor || text }]}
          translate={!!translateTitle}
        >
          {title}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 6,
    paddingRight: 8,
    minHeight: 20,
    borderRadius: 5,
    borderCurve: "continuous",
    alignItems: "center",
  },
  title: {
    marginLeft: 3,
    paddingTop: 2,
    ...TEXT_STYLES.ultraSmall,
  },
});
