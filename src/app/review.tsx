import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { cards, decks } from "../content/cards";
import { useProgress } from "../core/store";
import { queue, Rating, recordReview } from "../core/progress";
import {
  Audio,
  Button,
  colors,
  Heading,
  Icon,
  Meter,
  Page,
  Panel,
  s,
} from "../ui";
export default function Review() {
  const { deck, favorites, search } = useLocalSearchParams<{
    deck?: string;
    favorites?: string;
    search?: string;
  }>();
  const { progress: p, update } = useProgress();
  const [ids] = useState(() =>
    queue(
      cards
        .filter(
          (c) =>
            (!deck || deck === "all" || c.deck === deck) &&
            (favorites !== "1" || p.favorites.includes(c.id)) &&
            `${c.word} ${c.translation}`
              .toLowerCase()
              .includes((search ?? "").trim().toLowerCase()),
        )
        .map((c) => c.id),
      p,
    ),
  );
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [earned, setEarned] = useState(0);
  const lock = useRef(false);
  const card = cards.find((c) => c.id === ids[index]);
  const leave = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };
  const rate = (rating: Rating) => {
    if (lock.current || !card || !revealed) return;
    lock.current = true;
    update((prev) => recordReview(prev, card.id, rating));
    setEarned((n) => n + (rating === "good" ? 10 : 5));
    setIndex((n) => n + 1);
    setRevealed(false);
  };
  if (!card)
    return (
      <Page>
        <Heading
          eyebrow="КВЕСТ ЗАВЕРШЁН"
          title={ids.length ? "Ещё один шаг вперёд." : "Всё повторено!"}
          subtitle={
            ids.length
              ? `Ты разобрал ${index} карточек и получил ${earned} XP.`
              : "В этой подборке пока нет новых слов или повторений по сроку. Можно выбрать другую колоду."
          }
        />
        <Panel>
          <Icon name="checkmark-circle-outline" size={54} />
          <Text style={s.body}>
            {ids.length
              ? "Забытые слова вернутся через 10 минут. Трудные — через день. Уверенные повторения: 1 → 3 → 7 → 14 → 30 → 60 дней."
              : "Слова остаются доступны в словаре: можно перечитать примеры и послушать их."}
          </Text>
        </Panel>
        <Button title="Вернуться к пути" onPress={leave} />
      </Page>
    );
  return (
    <Page>
      <View style={[s.row, { marginBottom: 18 }]}>
        <Button title="Закрыть" secondary onPress={leave} />
        <Text style={s.small}>
          {index + 1} / {ids.length}
        </Text>
      </View>
      <Meter value={index / ids.length} />
      <View style={{ height: 24 }} />
      <Heading
        eyebrow={
          decks.find((d) => d.id === card.deck)?.title.toUpperCase() ??
          "КАРТОЧКИ"
        }
        title="Вспомни значение."
        subtitle="Сначала попробуй перевести сам, затем открой ответ."
      />
      <Panel>
        <Text
          style={[
            s.title,
            { fontSize: 36, textAlign: "center", marginTop: 16 },
          ]}
        >
          {card.word}
        </Text>
        <Text
          style={{ color: colors.green, fontSize: 22, textAlign: "center" }}
        >
          {card.ipa}
        </Text>
        {p.hints && (
          <Text style={[s.body, { textAlign: "center" }]}>≈ {card.hint}</Text>
        )}
        <Audio text={card.word} />
        <View
          style={{
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingTop: 20,
            marginTop: 4,
          }}
        >
          <Text style={s.example}>{card.example}</Text>
        </View>
        {revealed && (
          <>
            <Text style={[s.h2, { color: colors.lime }]}>
              {card.translation}
            </Text>
            <Text style={s.body}>{card.ru}</Text>
            <Audio text={card.example} />
          </>
        )}
      </Panel>
      {!revealed ? (
        <Button
          title="Показать ответ"
          icon="eye-outline"
          onPress={() => {
            lock.current = false;
            setRevealed(true);
          }}
        />
      ) : (
        <View style={{ gap: 10 }}>
          <Text style={[s.small, { textAlign: "center", marginBottom: 4 }]}>
            Насколько легко получилось вспомнить?
          </Text>
          <Button
            title="Не помню · через 10 минут"
            secondary
            onPress={() => rate("again")}
          />
          <Button
            title="С трудом · через 1 день"
            secondary
            onPress={() => rate("hard")}
          />
          <Button title="Помню уверенно" onPress={() => rate("good")} />
        </View>
      )}
      <Text style={[s.small, { marginTop: 20 }]}>
        * Для /θ/, /ð/, /w/ и /ŋ/ нет точных русских аналогов. Посмотри уроки
        произношения.
      </Text>
    </Page>
  );
}
