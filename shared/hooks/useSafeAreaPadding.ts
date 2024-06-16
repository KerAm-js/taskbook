import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeAreaPadding = () => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = top < 10 ? 15 : top + 5;
  const paddingBottom = bottom < 40 ? 60 : bottom + 10;

  return {
    paddingTop,
    paddingBottom,
  };
};
