import { LANGUAGES, TLanguage } from "@/shared";
import { CheckList } from "@/shared/ui/CheckList";
import { useTranslation } from "react-i18next";

export const SetLanguage = () => {
  const { i18n } = useTranslation();

  const onPress = (value: TLanguage) => {
    i18n.changeLanguage(value);
  };

  return (
    <CheckList data={LANGUAGES} selected={i18n.language} onPress={onPress} />
  );
};
