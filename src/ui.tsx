import React from "react";
import {
  ColorValue,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useProgress } from "./core/store";
export const colors = {
  bg: "#111916",
  panel: "#1B2520",
  border: "#304034",
  text: "#F6F8F2",
  muted: "#A6B5A9",
  lime: "#B5EF6A",
  green: "#6CCDA9",
  danger: "#FFAC99",
};
export type IconName = React.ComponentProps<typeof Ionicons>["name"];
export function Icon({
  name,
  size = 22,
  color = colors.lime,
}: {
  name: IconName;
  size?: number;
  color?: ColorValue;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function Page({ children }: { children: React.ReactNode }) {
  const { error } = useProgress();
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={s.page}>
      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
      >
        {error && <Text style={s.error}>{error}</Text>}
        {children}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
export function Heading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ gap: 10, marginBottom: 24 }}>
      <Text style={s.eyebrow}>{eyebrow}</Text>
      <Text accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      {subtitle && <Text style={s.body}>{subtitle}</Text>}
    </View>
  );
}
export function Panel({ children }: { children: React.ReactNode }) {
  return <View style={s.panel}>{children}</View>;
}
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
  icon,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  icon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
      ]}
    >
      {icon && <Icon name={icon} color={secondary ? colors.lime : colors.bg} />}
      <Text style={[s.buttonText, secondary && { color: colors.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}
export function Meter({ value }: { value: number }) {
  return (
    <View style={s.track}>
      <View
        style={[
          s.fill,
          { width: `${Math.max(0, Math.min(100, value * 100))}%` },
        ]}
      />
    </View>
  );
}
export function Section({ title, detail }: { title: string; detail?: string }) {
  return (
    <View style={[s.row, { marginTop: 24, marginBottom: 14 }]}>
      <Text style={s.h2}>{title}</Text>
      {detail && <Text style={s.small}>{detail}</Text>}
    </View>
  );
}
export function Audio({ text }: { text: string }) {
  const [message, setMessage] = React.useState("");
  const play = async () => {
    try {
      await Speech.stop();
      const voices = await Speech.getAvailableVoicesAsync();
      const voice =
        voices.find((v) => /^en[-_]GB/i.test(v.language)) ??
        voices.find((v) => /^en/i.test(v.language));
      if (!voice) {
        setMessage(
          "Добавь английский голос в настройках синтеза речи телефона.",
        );
        return;
      }
      setMessage("");
      Speech.speak(text, {
        language: "en-GB",
        voice: voice.identifier,
        rate: 0.8,
        onError: () =>
          setMessage("Озвучка недоступна. Проверь настройки синтеза речи."),
      });
    } catch {
      setMessage("Озвучка недоступна на этом устройстве.");
    }
  };
  React.useEffect(
    () => () => {
      void Speech.stop();
    },
    [],
  );
  return (
    <View style={{ gap: 8 }}>
      <Button
        title="Послушать"
        secondary
        icon="volume-medium-outline"
        onPress={() => {
          void play();
        }}
      />
      {message !== "" && <Text style={s.small}>{message}</Text>}
    </View>
  );
}
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, width: "100%", maxWidth: 620, alignSelf: "center" },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.2,
    lineHeight: 40,
  },
  eyebrow: {
    color: colors.lime,
    fontSize: 11,
    letterSpacing: 2.5,
    fontWeight: "700",
  },
  h2: { color: colors.text, fontSize: 20, fontWeight: "700" },
  body: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  small: { color: colors.muted, fontSize: 12, lineHeight: 19 },
  panel: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 20,
    gap: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: colors.lime,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: colors.bg,
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "center",
  },
  secondary: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  track: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: colors.lime, borderRadius: 4 },
  error: { color: colors.danger, paddingBottom: 14 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: colors.border,
    borderWidth: 1,
    minHeight: 44,
  },
  example: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 28,
  },
});
