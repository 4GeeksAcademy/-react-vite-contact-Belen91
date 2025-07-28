import { useReducer } from "react";

const initialState = {
  name: "",
  phone: "",
  email: "",
  address: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.field]: action.value
      };
    case "RESET":
      return initialState;
    default:
      throw new Error(`Tipo de acción desconocido: ${action.type}`);
  }
}

export const ContactForm = ({ onAdd }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(state);
    dispatch({ type: "RESET" });
  };

  return (
    <div className="container mt-4">
      <div className="card border-success shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Añadir Contacto</h4>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-success">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-success">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                placeholder="Ej: 666 666 666"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-success">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Ej: correo@email.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-success">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={state.address}
                onChange={handleChange}
                placeholder="Ej: Calle Falsa 123"
              />
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success">
                Guardar Contacto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};