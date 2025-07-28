const APIcontact_URL = "https://playground.4geeks.com/contact/agendas";


export async function fetchContact() {
    const res = await fetch(`${APIcontact_URL}/belen_91/contacts`, {
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

export async function addContact(data) {
    const res = await fetch(`${APIcontact_URL}/belen_91/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("No se pudo añadir el contacto");
    return res.json();
}

export async function editContact(id, updatedData) {
    const res = await fetch(`${APIcontact_URL}/belen_91/contacts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            full_name: updatedData.name,
            email: updatedData.email,
            phone: updatedData.phone,
            address: updatedData.address,
            agenda_slug: "belen_91"
        })
    });

    if (!res.ok) throw new Error("No se pudo modificar el contacto");

    return res.json();
}

export async function deleteContact(id) {
    const res = await fetch(`${APIcontact_URL}/belen_91/contacts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (!res.ok)
        throw new Error("No se pudo eliminar el contacto");
    return true;
}

