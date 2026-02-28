import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
 
export default function HomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TodoMate</Text>
      <Text style={styles.subtitle}>
        Stay organized. Never miss a task.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>✅ Create Tasks</Text>
        <Text style={styles.cardText}>
          Add todos with titles and due dates.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⏰ Track Deadlines</Text>
        <Text style={styles.cardText}>
          See overdue, due today, and upcoming tasks.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Stay Productive</Text>
        <Text style={styles.cardText}>
          Track completed vs pending tasks easily.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔍 Smart Filters</Text>
        <Text style={styles.cardText}>
          Search, filter completed or pending todos.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/todos")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111827",
  },
  cardText: {
    color: "#6b7280",
    fontSize: 14,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
