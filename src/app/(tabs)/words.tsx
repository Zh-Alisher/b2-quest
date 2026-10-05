import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { cards, decks } from "../../content/cards";
import { useProgress } from "../../core/store";
import { Audio, Button, colors, Heading, Icon, Page, Panel, s } from "../../ui";
export default function Words() {
  const { progress: p, update } = useProgress();
  const [search, setSearch] = useState("");
  const [deck, setDeck] = useState("all");
  const [starred, setStarred] = useState(false);
  const matches = cards.filter(
    (c) =>
      (deck === "all" || c.deck === deck) &&
      (!starred || p.favorites.includes(c.id)) &&
      `${c.word} ${c.translation}`
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  return (
    <Page>
      <Heading
        eyebrow="ТВОЙ СЛОВАРЬ"
        title="Слова, которые пригодятся."
        subtitle="Учи вместе с примером. Понимай, где сказать."
      />
      <TextInput
        accessibilityLabel="Поиск слова"
        placeholder="Найти слово или перевод"
        placeholderTextColor={colors.muted}
        value={search}
        onChangeText={setSearch}
        style={[s.panel, { color: colors.text, fontSize: 16, minHeight: 54 }]}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {[{ id: "all", title: "Все" }, ...decks].map((d) => (
          <Pressable
            key={d.id}
            accessibilityRole="button"
            accessibilityState={{ selected: deck === d.id }}
            onPress={() => setDeck(d.id)}
            style={[s.chip, deck === d.id && { backgroundColor: colors.lime }]}
          >
            <Text
              style={{
                color: deck === d.id ? colors.bg : colors.muted,
                fontSize: 12,
              }}
            >
              {d.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <Button
        title={starred ? "Показать все слова" : "Только избранное"}
        secondary
        icon="star-outline"
        onPress={() => setStarred(!starred)}
      />
      <View style={{ marginTop: 12 }}>
        <Button
          title="Тренировать эту подборку"
          disabled={matches.length === 0}
          onPress={() =>
            router.push({
              pathname: "/review",
              params: { deck, favorites: starred ? "1" : "0", search },
            })
          }
        />
      </View>
      <Text style={[s.small, { marginVertical: 16 }]}>
        {matches.length} слов · британский IPA · русские подсказки
        приблизительны
      </Text>
      {matches.map((c) => (
        <Panel key={c.id}>
          <View style={s.row}>
            <Text style={[s.h2, { flex: 1 }]}>{c.word}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Избранное: ${c.word}`}
              accessibilityState={{ selected: p.favorites.includes(c.id) }}
              onPress={() =>
                update((prev) => ({
                  ...prev,
                  favorites: prev.favorites.includes(c.id)
                    ? prev.favorites.filter((id) => id !== c.id)
                    : [...prev.favorites, c.id],
                }))
              }
              style={{ padding: 12 }}
            >
              <Icon
                name={p.favorites.includes(c.id) ? "star" : "star-outline"}
              />
            </Pressable>
          </View>
          <Text style={{ color: colors.green, fontSize: 18 }}>{c.ipa}</Text>
          {p.hints && <Text style={s.small}>≈ {c.hint}</Text>}
          <Text style={s.body}>{c.translation}</Text>
          <Text style={s.example}>{c.example}</Text>
          <Text style={s.small}>{c.ru}</Text>
          <Audio text={c.word} />
        </Panel>
      ))}
      {matches.length === 0 && (
        <Panel>
          <Text style={s.body}>
            Здесь пока пусто. Измени поиск или добавь слова в избранное.
          </Text>
        </Panel>
      )}
    </Page>
  );
}
