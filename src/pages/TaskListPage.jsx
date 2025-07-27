import { useState, useEffect } from "react";
import { fetchTasks, addTask, deleteTask, clearAll } from "../services/api/tasks";

export const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [draft, setDraft] = useState("");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const boot = async () => {
            try {
                await loadTasks();
            } catch (e) {
                if (e.status === 404) {
                    await loadTasks();
                } else {
                    setErr(e.message || "Error inesperado");
                }
            } finally {
                setLoading(false);
            }
        };
        boot();
    }, []);

    const loadTasks = async () => {
        const data = await fetchTasks();
        console.log("Lo que devuelve la API:", data);
        setTasks(data.todos);
    };

    const handleAdd = async () => {
        if (!draft.trim()) return;
        try {
            await addTask(draft.trim());
            setDraft("");
            await loadTasks();
        } catch {
            setErr("No se pudo añadir la tarea");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            await loadTasks();
        } catch (error) {
            console.log(error);
            setErr("Tu puta madre en pelotas");
        }
    };

    const handleClearAll = async () => {
        try {
            const ids = tasks.map(item => item.id);
            await clearAll(ids);
            await loadTasks();
        } catch {
            setErr("No se pudo limpiar la lista");
        }
    };

    if (loading) return <p>Cargando tareas...</p>;

    return (
        <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "system-ui" }}>
            <h1 className="mb-4 text-white">Tareas del Huerto 🌱</h1>

            {err && <p style={{ color: "red" }}>{err}</p>}

            <div style={{ display: "flex", gap: 8 }}>
                <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Añade una tarea..."
                    style={{ flex: 1 }}
                />
                <button onClick={handleAdd}>Añadir</button>
            </div>

            <ul style={{ marginTop: 16, paddingLeft: 18 }}>
                {tasks.length === 0 && <li>No hay tareas. Qué paz.</li>}
                {tasks.map((t) => (
                    <li key={t.id} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <span>{t.label}</span>
                        <button onClick={() => handleDelete(t.id)}>🗑️</button>
                    </li>
                ))}
            </ul>

            {tasks.length > 0 && (
                <button style={{ marginTop: 16 }} onClick={handleClearAll}>
                    Limpiar todas
                </button>
            )}
        </div>
    );
};