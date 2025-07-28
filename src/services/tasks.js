
const APItask_URL = "https://playground.4geeks.com/todo";

export async function fetchTasks() {
    const res = await fetch(`${APItask_URL}/users/belen_91`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const error = new Error("GET failed");
        error.status = res.status;
        throw error;
    }
    return res.json();
}

export async function addTask(label) {
    const res = await fetch(`${APItask_URL}/todos/belen_91`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, done: false }),
    });
    if (!res.ok) throw new Error("No se pudo añadir la tarea");
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${APItask_URL}/todos/${id}`, {
        method: "DELETE",
    });
    if (!res.ok)
        throw new Error("No se pudo eliminar la tarea");
}

export async function clearAll(ids) {
    try {
        await Promise.all(
            ids.map(id =>
                fetch(`${APItask_URL}/todos/${id}`, { method: "DELETE" })
                    .then(res => {
                        if (!res.ok) throw new Error(`No se pudo borrar la tarea ${id}`);
                        return res;
                    })
            )
        );
        return true;
    } catch (error) {
        console.error(error);
        throw new Error("Error al limpiar todas las tareas");
    }
}