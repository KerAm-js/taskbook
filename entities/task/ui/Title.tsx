import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ITask } from "../model/types";
import { TextInput } from "react-native-gesture-handler";
import { TEXT_STYLES, ThemedText } from "@/shared";
import { useTranslation } from "react-i18next";
import { useTaskActions } from "../model/hooks";
import { findAndDeleteTime } from "../lib/findAndDeleteTime";
import { useFastInputMode } from "@/entities/settings";
import { Caret } from "./Caret";

export const TaskTitle: FC<ITask> = ({ id, title, isEditing }) => {
  const [text, setText] = useState(title);
  const { t } = useTranslation();
  const { setIsEditing, setReminder } = useTaskActions();
  const fastInputMode = useFastInputMode();

  const onBlur = () => {
    if (isEditing) {
      setIsEditing({ id, title: text.trim() || t("newTask"), value: false });
      if (!text.trim()) setText(t("newTask"));
    }
  };

  const onChangeText = (value: string) => {
    setText(value);
    const { newText, minutes, hours } = findAndDeleteTime(value);
    if (hours && minutes) {
      setReminder({
        id,
        hours: Number(hours),
        minutes: Number(minutes),
      });
      setText(newText);
    }
  };

  useEffect(() => {
    if (fastInputMode && text !== title) {
      setText(title);
    }
  }, [fastInputMode]);

  return (
    <View style={styles.container}>
      {isEditing && fastInputMode && (
        <TextInput
          style={styles.input}
          autoCorrect={false}
          onBlur={onBlur}
          selectTextOnFocus={false}
          autoFocus={isEditing}
          value={text}
          onChangeText={onChangeText}
          maxLength={100}
          scrollEnabled={false}
          caretHidden
        />
      )}
      {text && (
        <ThemedText colorName={text ? "text" : "textGrey"} style={styles.title}>
          {text}
          {isEditing && <Caret translateY={4} />}
        </ThemedText>
      )}
      {!text && (
        <>
          {isEditing && <Caret />}
          <ThemedText
            colorName={text ? "text" : "textGrey"}
            style={styles.title}
          >
            {!text && t("enterText")}
          </ThemedText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 15,
    flex: 1,
    marginBottom: 4,
    alignItems: "center",
  },
  title: {
    ...TEXT_STYLES.standart,
    paddingTop: 3,
  },
  input: {
    display: "none",
    width: 0,
    height: 0,
  },
});
