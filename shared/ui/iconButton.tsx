import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SvgXml, SvgProps } from "react-native-svg";

export const IconButton: FC<
  SvgProps & {
    xml: string;
    buttonSize?: number;
    onPress?: () => void;
  }
> = ({ buttonSize = 40, width = 26, height = 26, xml, onPress, ...props }) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
        },
      ]}
      onPress={onPress ? onPress : () => {}}
    >
      <SvgXml width={width} height={height} xml={xml} {...props} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
