import { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { lessons } from "../../content/lessons";
import { completeLesson } from "../../core/progress";
import { useProgress } from "../../core/store";
import {
  Audio,
  Button,
  colors,
  Heading,
  Meter,
  Page,
  Panel,
  s,
  Section,
} from "../../ui";
export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);
  const { update } = useProgress();
  const [testing, setTesting] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const leave = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/lessons");
  };
  if (!lesson)
    return (
      <Page>
        <Heading eyebrow="УРОК" title="Урок не найден" />
        <Button title="К урокам" onPress={leave} />
      </Page>
    );
  const q = lesson.questions[index];
  const advance = () => {
    const total = score + (selected === q.answer ? 1 : 0);
    setScore(total);
    setSelected(null);
    setIndex(index + 1);
    if (
      index + 1 === lesson.questions.length &&
      total === lesson.questions.length
    )
      update((prev) => completeLesson(prev, lesson.id));
  };
  return (
    <Page>
      <View style={{ marginBottom: 20 }}>
        <Button title="Назад" secondary onPress={leave} />
      </View>
      <Heading
        eyebrow={`${lesson.kind === "sounds" ? "ПРОИЗНОШЕНИЕ" : "ГРАММАТИКА"} · ${lesson.level}`}
        title={lesson.title}
        subtitle={lesson.subtitle}
      />
      {!testing ? (
        <>
          {lesson.sections.map((section, i) => (
            <Panel key={i}>
              <Text style={s.h2}>{section.title}</Text>
              <Text style={s.body}>{section.body}</Text>
              {section.example && (
                <>
                  <Text style={s.example}>{section.example}</Text>
                  <Text style={s.small}>{section.ru}</Text>
                  <Audio text={section.example} />
                </>
              )}
            </Panel>
          ))}
          <Button
            title="Проверить себя · 3 вопроса"
            onPress={() => setTesting(true)}
          />
        </>
      ) : !q ? (
        <>
          <Panel>
            <Text style={s.h2}>
              {score === lesson.questions.length
                ? "Урок пройден!"
                : "Давай закрепим ещё раз"}
            </Text>
            <Text style={s.body}>
              Правильных ответов: {score} / {lesson.questions.length}
            </Text>
            <Text style={s.small}>
              {score === lesson.questions.length
                ? "За первое прохождение — 30 XP. Повторять урок можно сколько угодно."
                : "Для завершения нужны все правильные ответы. Перечитай объяснение и попробуй снова."}
            </Text>
          </Panel>
          <Button title="Вернуться к урокам" onPress={leave} />
          <View style={{ marginTop: 10 }}>
            <Button
              title="Повторить урок"
              secondary
              onPress={() => {
                setTesting(false);
                setIndex(0);
                setScore(0);
                setSelected(null);
              }}
            />
          </View>
        </>
      ) : (
        <>
          <Meter value={index / lesson.questions.length} />
          <Section title={`Вопрос ${index + 1} / ${lesson.questions.length}`} />
          <Panel>
            <Text style={s.h2}>{q.prompt}</Text>
            {q.options.map((option, i) => (
              <Button
                key={i}
                title={option}
                secondary={selected !== i}
                disabled={selected !== null}
                onPress={() => setSelected(i)}
              />
            ))}
            {selected !== null && (
              <>
                <Text
                  accessibilityLiveRegion="polite"
                  style={{
                    color: selected === q.answer ? colors.lime : colors.danger,
                    fontWeight: "700",
                  }}
                >
                  {selected === q.answer
                    ? "Верно!"
                    : `Правильный ответ: ${q.options[q.answer]}`}
                </Text>
                <Text style={s.body}>{q.explanation}</Text>
              </>
            )}
          </Panel>
          <Button
            title={
              index === lesson.questions.length - 1
                ? "Посмотреть результат"
                : "Дальше"
            }
            disabled={selected === null}
            onPress={advance}
          />
        </>
      )}
    </Page>
  );
}
