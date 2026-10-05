import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useProgress } from "../../core/store";
import { useClock } from "../../core/clock";
import { dayKey, streak } from "../../core/progress";
import { cards, decks } from "../../content/cards";
import { lessons } from "../../content/lessons";
import {
  Button,
  colors,
  Heading,
  Icon,
  IconName,
  Meter,
  Page,
  Panel,
  s,
  Section,
} from "../../ui";
export default function Home() {
  const { progress: p } = useProgress();
  const now = useClock();
  const due = cards.filter((c) => p.reviews[c.id]?.due <= now).length;
  const studied = cards.filter((c) => p.reviews[c.id]).length;
  const today = p.activity[dayKey(new Date(now))] ?? 0;
  const next = lessons.find((l) => !p.completed.includes(l.id));
  return (
    <Page>
      <View style={[s.row, { marginBottom: 26 }]}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Icon name="sparkles" />
          <Text style={s.eyebrow}>B2 QUEST</Text>
        </View>
        <Text style={s.small}>{streak(p.activity)} дн. подряд</Text>
      </View>
      <Heading
        eyebrow="ТВОЁ СЛЕДУЮЩЕЕ ПРИКЛЮЧЕНИЕ"
        title={"Мир ближе,\nчем кажется."}
        subtitle="Английский для жизни, работы и новых историй."
      />
      <LinearGradient
        colors={["#344A28", "#23372B"]}
        style={[s.panel, { borderColor: "#4B633B", padding: 24 }]}
      >
        <View style={s.row}>
          <Text style={s.eyebrow}>ЕЖЕДНЕВНЫЙ КВЕСТ</Text>
          <Icon name="flash-outline" />
        </View>
        <Text style={[s.h2, { fontSize: 27 }]}>Один маленький шаг</Text>
        <Text style={s.body}>
          До 10 карточек: сначала повторение, затем новые слова. Примерно 5
          минут.
        </Text>
        <View style={s.row}>
          <Text style={s.small}>
            Сегодня: {today} / {p.goal} действий
          </Text>
          <Text style={[s.small, { color: colors.lime }]}>
            {Math.min(100, Math.round((today / p.goal) * 100))}%
          </Text>
        </View>
        <Meter value={today / p.goal} />
        <Button
          title="Начать квест"
          icon="arrow-forward-outline"
          onPress={() => router.push("/review")}
        />
      </LinearGradient>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Panel>
            <Icon name="layers-outline" />
            <Text style={[s.title, { fontSize: 29 }]}>
              {studied}
              <Text style={s.small}> / {cards.length}</Text>
            </Text>
            <Text style={s.small}>слов в работе</Text>
          </Panel>
        </View>
        <View style={{ flex: 1 }}>
          <Panel>
            <Icon name="repeat-outline" color={colors.green} />
            <Text style={[s.title, { fontSize: 29 }]}>{due}</Text>
            <Text style={s.small}>пора повторить</Text>
          </Panel>
        </View>
      </View>
      <Section title="Продолжить учиться" />
      {next ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(`/lesson/${next.id}`)}
        >
          <Panel>
            <View style={s.row}>
              <Text style={[s.eyebrow, { color: colors.green }]}>
                {next.kind === "sounds" ? "ПРОИЗНОШЕНИЕ" : "ГРАММАТИКА"} ·{" "}
                {next.minutes} МИН
              </Text>
              <Icon name="arrow-forward-outline" />
            </View>
            <Text style={s.h2}>{next.title}</Text>
            <Text style={s.body}>{next.subtitle}</Text>
          </Panel>
        </Pressable>
      ) : (
        <Panel>
          <Text style={s.h2}>Стартовый курс пройден!</Text>
          <Text style={s.body}>
            Повторяй слова и уроки. Следующие главы добавим в обновлениях.
          </Text>
        </Panel>
      )}
      <Section title="Твои миры" detail="6 тематических колод" />
      {decks.slice(1, 3).map((d) => (
        <Pressable
          key={d.id}
          accessibilityRole="button"
          onPress={() =>
            router.push({ pathname: "/review", params: { deck: d.id } })
          }
        >
          <Panel>
            <View style={s.row}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 14 }}
              >
                <Icon name={d.icon as IconName} color={d.color} />
                <Text style={s.h2}>{d.title}</Text>
              </View>
              <Icon name="chevron-forward" color={colors.muted} />
            </View>
            <Text style={s.small}>8 слов и фраз для реальных ситуаций</Text>
          </Panel>
        </Pressable>
      ))}
      <Text style={s.small}>
        Путь к B2 начинается здесь. Это стартовый курс A1–A2, а не полный курс
        или оценка уровня CEFR.
      </Text>
    </Page>
  );
}
