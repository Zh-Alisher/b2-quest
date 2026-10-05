import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { emptyProgress, parseProgress, Progress } from "./progress";
const KEY = "b2quest.progress.v1";
type Store = {
  progress: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  error: string | null;
};
const Context = createContext<Store | null>(null);
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(emptyProgress);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);
  const serial = useRef(Promise.resolve());
  const firstSave = useRef(true);
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setProgress(parseProgress(raw));
        setLoaded(true);
      })
      .catch(() => {
        setBlocked(true);
        setError(
          "Не удалось прочитать прогресс. Перезапусти приложение: сохранённые данные не перезаписаны.",
        );
        setLoaded(true);
      });
  }, []);
  useEffect(() => {
    if (!loaded || blocked) return;
    if (firstSave.current) {
      firstSave.current = false;
      return;
    }
    const data = JSON.stringify(progress);
    serial.current = serial.current
      .then(() => AsyncStorage.setItem(KEY, data))
      .then(() => setError(null))
      .catch(() =>
        setError(
          "Прогресс пока не сохранён. Проверь свободное место; следующее действие повторит сохранение.",
        ),
      );
  }, [progress, loaded, blocked]);
  if (!loaded || blocked)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#111916",
          justifyContent: "center",
          padding: 28,
        }}
      >
        <ActivityIndicator color="#B5EF6A" />
        <Text style={{ color: "#F6F8F2", marginTop: 18 }}>
          {error ?? "Открываем твой путь…"}
        </Text>
      </View>
    );
  return (
    <Context.Provider
      value={{ progress, update: (fn) => setProgress(fn), error }}
    >
      {children}
    </Context.Provider>
  );
}
export function useProgress() {
  const value = useContext(Context);
  if (!value) throw new Error("Missing provider");
  return value;
}
