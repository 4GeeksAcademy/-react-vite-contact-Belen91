export const ContactCard = ({ contact, onDelete, onEdit }) => {
    const { id, name, phone, email, address } = contact;

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-success shadow h-100" id={`card-${id}`}>
                <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0">{name || "Sin nombre"}</h5>
                </div>
                <div className="card-body bg-light text-dark">
                    <p className="mb-2"><strong>📞 Teléfono:</strong> {phone || "N/A"}</p>
                    <p className="mb-2"><strong>📧 Email:</strong> {email || "N/A"}</p>
                    <p className="mb-2"><strong>🏡 Dirección:</strong> {address || "N/A"}</p>
                </div>
                <div className="card-footer text-end bg-white">
                    <button className="btn btn-outline-warning btn-sm m-2" onClick={() => onEdit(contact)}>
                        Modificar
                    </button>
                    <button className="btn btn-outline-danger btn-sm m-2" onClick={onDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};