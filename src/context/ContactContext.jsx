import { createContext, useReducer, useContext } from "react";
import { fetchContact, addContact, deleteContact, editContact } from "../services/contactList";

const ContactContext = createContext();

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case "LOAD_CONTACTS":
            return action.payload;
        case "ADD_CONTACT":
            return [...state, action.payload];
        case "UPDATE_CONTACT":
            return state.map(c => c.id === action.payload.id ? action.payload : c);
        case "DELETE_CONTACT":
            return state.filter((c) => c.id !== action.payload);
        default:
            throw new Error("Acción no reconocida: " + action.type);
    }
}

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const loadContacts = async () => {
        const data = await fetchContact();
        console.log("📦 Datos del backend:", data);
        dispatch({ type: "LOAD_CONTACTS", payload: Array.isArray(data) ? data : data.contacts });
    };

    const addNewContact = async (formData) => {
        const contact = await addContact(formData);
        dispatch({ type: "ADD_CONTACT", payload: contact });
    };

    const updateContact = async (id, updatedData) => {
        const contact = await editContact(id, updatedData);
        dispatch({ type: "UPDATE_CONTACT", payload: contact });
    };

    const removeContact = async (id) => {
        await deleteContact(id);
        dispatch({ type: "DELETE_CONTACT", payload: id });
    };

    return (
        <ContactContext.Provider value={{ contacts: state, loadContacts, addNewContact, removeContact, updateContact }} >
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => useContext(ContactContext);