import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";
import { ContactForm } from "../components/contactForm";
import { ContactCard } from "../components/contactCard";

export const HiringPage = () => {
    const { contacts, loadContacts, addNewContact, removeContact, updateContact } = useContacts();
    const [selectedContact, setSelectedContact] = useState(null);
    const [editingContact, setEditingContact] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        loadContacts();
    }, []);

    const confirmDelete = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
    };

    const handleSubmit = async (formData) => {
        if (editingContact) {
            await updateContact(editingContact.id, formData);
            setEditingContact(null);
        } else {
            await addNewContact(formData);
        }
    };

    const handleConfirmDelete = () => {
        removeContact(selectedContact.id);
        setSelectedContact(null);
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-white">🌿 Elige  a tu jardinero</h1>
            <ContactForm onAdd={handleSubmit} initialData={editingContact} />
            <hr className="my-4 border-success" />
            <h2 className="text-white mb-3">Candidatos</h2>
            <div className="row">
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onDelete={() => confirmDelete(contact)}
                            onEdit={() => handleEdit(contact)}
                        />
                    ))
                ) : (
                    <p className="text-muted">No hay jardineros en la agenda... aún.</p>
                )}
            </div>

            {/* 🧼 Modal de confirmación */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-danger">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirmar eliminación</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que quieres eliminar a <strong>{selectedContact?.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};