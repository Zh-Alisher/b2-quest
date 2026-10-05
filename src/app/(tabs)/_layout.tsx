import { Tabs } from "expo-router";
import { colors, Icon, IconName } from "../../ui";
const icons: Record<string, IconName> = {
  index: "compass-outline",
  words: "layers-outline",
  lessons: "book-outline",
  profile: "stats-chart-outline",
};
export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.lime,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarIcon: ({ color }) => (
          <Icon name={icons[route.name]} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Путь" }} />
      <Tabs.Screen name="words" options={{ title: "Слова" }} />
      <Tabs.Screen name="lessons" options={{ title: "Уроки" }} />
      <Tabs.Screen name="profile" options={{ title: "Прогресс" }} />
    </Tabs>
  );
}
