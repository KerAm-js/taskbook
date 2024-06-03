import { FC } from "react";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";

const IconButton: FC<{
  width?: number;
  height?: number;
  iconWidth?: number;
  iconHeight?: number;
  onPress?: () => void;
  xml: string;
}> = ({
  width = 40,
  height = 40,
  iconWidth = 24,
  iconHeight = 24,
  xml,
  onPress,
}) => {
  return (
    <Pressable
      style={{
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
      }}
      onPress={onPress ? onPress : () => {}}
    >
      <SvgXml width={iconWidth} height={iconHeight} xml={xml} />
    </Pressable>
  );
};

export default IconButton;
