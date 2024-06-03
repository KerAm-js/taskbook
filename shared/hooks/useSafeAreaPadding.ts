import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSageAreaPadding = () => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = top < 10 ? 15 : top + 5;
  const paddingBottom = bottom < 20 ? 25 : bottom + 5;

  return {
    paddingTop,
    paddingBottom,
  };
};
