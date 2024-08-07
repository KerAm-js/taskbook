import { bellSvg } from "@/assets/svg/bell";
import { dialogSvg } from "@/assets/svg/dialog";
import { dollarSvg } from "@/assets/svg/dollar";
import { translateSvg } from "@/assets/svg/translate";
import { shareSvg } from "@/assets/svg/share";
import { keyboardSvg } from "@/assets/svg/keyboard";
import { medalSvg } from "@/assets/svg/medal";
import { paletteSvg } from "@/assets/svg/palette";
import appJson from "@/app.json";
import {
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  TEXT_STYLES,
  ThemedText,
  ThemedView,
  useSafeAreaPadding,
} from "@/shared";
import { router } from "expo-router";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { useFastInputMode, useSettingsActions } from "@/entities/settings";

export const SettingsList = () => {
  const { toggleFastInputMode } = useSettingsActions();
  const fastInputMode = useFastInputMode();
  const { paddingBottom } = useSafeAreaPadding();

  const itunesItemId = 1604538068;
  const url = `itms-apps://itunes.apple.com/app/${itunesItemId}`;

  const shareApp = async () => {
    try {
      const result = await Share.share(
        Platform.OS === "ios"
          ? {
              url,
            }
          : {
              message: url,
            }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const rateApp = () => {
    const itunesItemId = 1604538068;
    Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
    );
  };

  const contactDeveloper = () => {
    const url = "https://t.me/Amir_Kerimov";
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Setting
          type="toggle"
          title="fastInputMode"
          toggleValue={fastInputMode}
          onPress={() => toggleFastInputMode()}
          xmlGetter={keyboardSvg}
        />
        <Setting
          type="navigate"
          title="reminders"
          onPress={() => router.navigate("settings/reminders")}
          xmlGetter={bellSvg}
        />
        <Setting
          type="navigate"
          title="theme"
          onPress={() => router.navigate("settings/theme")}
          xmlGetter={paletteSvg}
        />
        <Setting
          type="navigate"
          title="language"
          onPress={() => router.navigate("settings/language")}
          xmlGetter={translateSvg}
        />
        <Setting
          type="navigate"
          title="shareWithFriend"
          onPress={shareApp}
          xmlGetter={shareSvg}
        />
        <Setting
          type="navigate"
          title="leaveReview"
          onPress={rateApp}
          xmlGetter={medalSvg}
        />
        <Setting
          type="navigate"
          title="contactDeveloper"
          onPress={contactDeveloper}
          xmlGetter={dialogSvg}
        />
        <Setting
          type="navigate"
          title="supportProject"
          onPress={() => {}}
          xmlGetter={dollarSvg}
        />
      </ScrollView>
      <ThemedView
        style={[styles.copyRightContainer, { paddingBottom }]}
        colorName="background"
        borderColorName="accent_ultra_opacity"
      >
        <ThemedText colorName="accent" style={styles.appName}>
          Taskbook {appJson.expo.version}
        </ThemedText>
        <ThemedText colorName="accent" style={styles.authorName}>
          Developed by Amir Shishany
        </ThemedText>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
  },
  scrollContentContainer: {
    paddingBottom: 200,
  },
  copyRightContainer: {
    alignItems: "center",
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  appName: {
    marginBottom: 5,
    ...TEXT_STYLES.standartBold,
  },
  authorName: {
    ...TEXT_STYLES.small,
  },
});
