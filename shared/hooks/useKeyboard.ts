import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardWillShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardWillHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
}