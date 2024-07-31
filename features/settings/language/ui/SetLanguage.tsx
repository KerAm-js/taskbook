import { CheckList, LANGUAGES, TLanguage } from "@/shared";
import { useTranslation } from "react-i18next";

export const SetLanguage = () => {
  const { i18n } = useTranslation();

  const onPress = (value: TLanguage) => {
    i18n.changeLanguage(value);
  };

  const checkMethod = (value: TLanguage) => value === i18n.language;

  return (
    <CheckList data={LANGUAGES} checkMethod={checkMethod} onPress={onPress} />
  );
};
