import { Switch, Text, View } from "react-native";
import { cards } from "../../content/cards";
import { lessons } from "../../content/lessons";
import { dayKey, streak } from "../../core/progress";
import { useProgress } from "../../core/store";
import {
  Button,
  colors,
  Heading,
  Meter,
  Page,
  Panel,
  s,
  Section,
} from "../../ui";
export default function Profile() {
  const { progress: p, update } = useProgress();
  const learned = cards.filter(
    (c) => (p.reviews[c.id]?.successes ?? 0) >= 3,
  ).length;
  const studied = cards.filter((c) => p.reviews[c.id]).length;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return {
      key: dayKey(d),
      label: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][d.getDay()],
    };
  });
  return (
    <Page>
      <Heading
        eyebrow="МАЛЕНЬКИЕ ШАГИ СЧИТАЮТСЯ"
        title="Твой прогресс."
        subtitle="Каждое повторение делает следующий разговор чуть проще."
      />
      <Panel>
        <View style={s.row}>
          <Text style={s.eyebrow}>
            УРОВЕНЬ ПРИКЛЮЧЕНИЯ {Math.floor(p.xp / 100) + 1}
          </Text>
          <Text style={{ color: colors.lime }}>{p.xp} XP</Text>
        </View>
        <Text style={s.h2}>
          {p.xp < 300
            ? "Начинающий искатель"
            : p.xp < 1000
              ? "Ученик гильдии"
              : "Путешественник"}
        </Text>
        <Meter value={(p.xp % 100) / 100} />
        <Text style={s.small}>
          {100 - (p.xp % 100)} XP до следующего уровня игры. XP не определяет
          уровень английского.
        </Text>
      </Panel>
      <Panel>
        <Text style={s.h2}>{streak(p.activity)} дней подряд</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {days.map((d) => (
            <View key={d.key} style={{ flex: 1, alignItems: "center", gap: 9 }}>
              <View
                style={{
                  width: 30,
                  height: 36,
                  borderRadius: 9,
                  backgroundColor: p.activity[d.key]
                    ? colors.lime
                    : colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: p.activity[d.key] ? colors.bg : colors.muted,
                  }}
                >
                  {p.activity[d.key] ?? "·"}
                </Text>
              </View>
              <Text style={s.small}>{d.label}</Text>
            </View>
          ))}
        </View>
        <Text style={s.small}>Количество действий за последние 7 дней</Text>
      </Panel>
      <Section title="Стартовый курс" />
      <Panel>
        <Text style={s.body}>
          Слова в работе: {studied} / {cards.length}
        </Text>
        <Text style={s.body}>
          Закреплены: {learned} / {cards.length}
        </Text>
        <Text style={s.small}>
          «Закреплены» — три успешных повторения подряд. Это самооценка памяти,
          а не проверка активного словаря.
        </Text>
        <Meter value={learned / cards.length} />
        <Text style={s.body}>
          Уроки: {p.completed.length} / {lessons.length}
        </Text>
        <Meter value={p.completed.length / lessons.length} />
      </Panel>
      <Section title="Подстроить под себя" />
      <Panel>
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Text style={s.h2}>Русские подсказки</Text>
            <Text style={s.small}>Скрывай их, когда привыкнешь к IPA.</Text>
          </View>
          <Switch
            accessibilityLabel="Русские подсказки"
            value={p.hints}
            trackColor={{ false: colors.border, true: "#608C35" }}
            thumbColor={p.hints ? colors.lime : colors.muted}
            onValueChange={(hints) => update((prev) => ({ ...prev, hints }))}
          />
        </View>
      </Panel>
      <Panel>
        <Text style={s.h2}>Ежедневная цель</Text>
        <Text style={s.small}>
          Одно действие = оценка карточки или впервые пройденный урок.
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[5, 10, 15].map((goal) => (
            <View key={goal} style={{ flex: 1 }}>
              <Button
                title={`${goal}`}
                secondary={p.goal !== goal}
                onPress={() => update((prev) => ({ ...prev, goal }))}
              />
            </View>
          ))}
        </View>
      </Panel>
      <Text style={s.small}>
        B2 Quest · версия 0.1.0{"\n"}Данные хранятся только на этом устройстве.
        Удаление приложения или его данных удалит прогресс. Облачной
        синхронизации пока нет.
      </Text>
    </Page>
  );
}
