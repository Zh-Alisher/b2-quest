import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { lessons } from "../../content/lessons";
import { useProgress } from "../../core/store";
import { colors, Heading, Icon, Page, Panel, s, Section } from "../../ui";
export default function Lessons() {
  const { progress: p } = useProgress();
  return (
    <Page>
      <Heading
        eyebrow="БАЗА БЕЗ ЗУБРЁЖКИ"
        title={"Понять.\nПопробовать.\nЗаговорить."}
        subtitle="Короткое объяснение, живые примеры и три вопроса для закрепления."
      />
      {(["sounds", "grammar"] as const).map((kind) => (
        <View key={kind}>
          <Section
            title={
              kind === "sounds"
                ? "Как читать и произносить"
                : "Грамматика по-человечески"
            }
          />
          {lessons
            .filter((l) => l.kind === kind)
            .map((l, i) => (
              <Pressable
                key={l.id}
                accessibilityRole="button"
                onPress={() => router.push(`/lesson/${l.id}`)}
              >
                <Panel>
                  <View style={s.row}>
                    <Text style={s.eyebrow}>
                      {String(i + 1).padStart(2, "0")} · {l.level} · {l.minutes}{" "}
                      МИН
                    </Text>
                    <Icon
                      name={
                        p.completed.includes(l.id)
                          ? "checkmark-circle"
                          : "arrow-forward-outline"
                      }
                      color={
                        p.completed.includes(l.id) ? colors.green : colors.muted
                      }
                    />
                  </View>
                  <Text style={s.h2}>{l.title}</Text>
                  <Text style={s.body}>{l.subtitle}</Text>
                </Panel>
              </Pressable>
            ))}
        </View>
      ))}
    </Page>
  );
}
