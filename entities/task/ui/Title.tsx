import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ITask } from "../model/types";
import { TextInput } from "react-native-gesture-handler";
import { TEXT_STYLES, ThemedInput } from "@/shared";
import { useTranslation } from "react-i18next";
import { findAndDeleteTime } from "../lib/findAndDeleteTime";
import { useFastInputMode } from "@/entities/settings";
import { useTaskActions } from "../model/hooks";

export const TaskTitle: FC<ITask> = (task) => {
  const { id, title, isEditing } = task;
  const [text, setText] = useState(title);
  const inputRef = useRef<TextInput | null>(null);
  const { t } = useTranslation();
  const { endTaskEdition, setReminder, deleteTask } = useTaskActions();
  const fastInputMode = useFastInputMode();

  const onBlur = () => {
    if (isEditing) {
      const newTitle = text.trim();
      if (!newTitle) {
        deleteTask(id);
      } else {
        endTaskEdition({ id, title: newTitle });
      }
    }
  };

  const onChangeText = (value: string) => {
    setText(value);
    const { newText, minute, hour } = findAndDeleteTime(value);
    if (hour && minute) {
      setReminder({
        id,
        hour: Number(hour),
        minute: Number(minute),
      });
      setText(newText);
    }
  };

  useEffect(() => {
    if (fastInputMode && text !== title) {
      setText(title);
    }
  }, [fastInputMode]);

  useEffect(() => {
    if (inputRef.current)
      if (isEditing) {
        inputRef.current.focus();
      }
  }, [isEditing]);

  useEffect(() => {
    if (title && !text) setText(title);
  }, [title]);

  return (
    <View style={styles.container}>
      <ThemedInput
        inputRef={inputRef}
        style={styles.input}
        autoCorrect={false}
        multiline
        placeholder={t("enterText")}
        onEndEditing={onBlur}
        selectTextOnFocus={false}
        value={text}
        onChangeText={onChangeText}
        maxLength={100}
        scrollEnabled={false}
        blurOnSubmit
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...TEXT_STYLES.standart,
  },
  input: {
    ...TEXT_STYLES.standart,
    textAlignVertical: "center",
    paddingVertical: 0,
  },
});
