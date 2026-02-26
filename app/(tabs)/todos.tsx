import { 
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../firebase";

/* ---------------- TYPES ---------------- */
type Todo = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: number; // timestamp (ms)
};

export default function TodoScreen() {
  /* ---------------- STATE ---------------- */
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<"all" | "completed" | "pending">("all");

  const todosRef = collection(db, "todos");

  /* ---------------- READ ---------------- */
  const fetchTodos = async () => {
    const snapshot = await getDocs(todosRef);

    const list: Todo[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Todo, "id">),
    }));

    // sort by nearest due date
    list.sort((a, b) => a.dueDate - b.dueDate);

    setTodos(list);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleAddOrUpdate = async () => {
    if (!todo.trim() || !dueDate) return;

    const dateValue = new Date(dueDate).getTime();

    if (editingId) {
      await updateDoc(doc(db, "todos", editingId), {
        title: todo,
        dueDate: dateValue,
      });
      setEditingId(null);
    } else {
      await addDoc(todosRef, {
        title: todo,
        completed: false,
        dueDate: dateValue,
      });
    }

    setTodo("");
    setDueDate("");
    fetchTodos();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  /* ---------------- EDIT ---------------- */
  const startEdit = (item: Todo) => {
    setTodo(item.title);
    setDueDate(new Date(item.dueDate).toISOString().split("T")[0]);
    setEditingId(item.id);
  };

  /* ---------------- TOGGLE COMPLETE ---------------- */
  const toggleCompleted = async (item: Todo) => {
    await updateDoc(doc(db, "todos", item.id), {
      completed: !item.completed,
    });
    fetchTodos();
  };

  /* ---------------- HELPERS ---------------- */
  const getDueStyle = (dueDate: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) return styles.overdue; // 🔴
    if (due.getTime() === today.getTime()) return styles.dueToday; // 🟡
    return null;
  };

  /* ---------------- SEARCH + FILTER ---------------- */
  const filteredTodos = todos
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });

  /* ---------------- PROGRESS ---------------- */
  const completedCount = todos.filter((t) => t.completed).length;

  /* ---------------- UI ---------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Todo App</Text>

      <Text style={styles.progress}>
        Completed: {completedCount} / {todos.length}
      </Text>

      {/* Search */}
      <TextInput
        style={styles.input}
        placeholder="Search todos..."
        placeholderTextColor="#4b5563"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filters */}
      <View style={styles.filterRow}>
        {["all", "completed", "pending"].map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f as any)}>
            <Text style={filter === f ? styles.activeFilter : styles.filter}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter todo"
        placeholderTextColor="#4b5563"
        value={todo}
        onChangeText={setTodo}
      />

      <TextInput
        style={styles.input}
        placeholder="Due date (YYYY-MM-DD)"
        placeholderTextColor="#4b5563"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAddOrUpdate}>
        <Text style={styles.btnText}>
          {editingId ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>

      {/* Todo List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoLeft}>
              <Switch
                value={item.completed}
                onValueChange={() => toggleCompleted(item)}
              />
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                  getDueStyle(item.dueDate),
                ]}
              >
                {item.title}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEdit(item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e5e7eb",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  progress: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#9ca3af",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  filter: {
    color: "#6b7280",
  },
  activeFilter: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    marginLeft: 12,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  overdue: {
    color: "#dc2626", // 🔴
    fontWeight: "bold",
  },
  dueToday: {
    color: "#f59e0b", // 🟡
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  editText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "600",
  },
});
