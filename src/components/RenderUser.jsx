import React from 'react';
import './css/renderUsers.css'

const RenderUser = ({userData, setInfoUpdate, setTitleForm, setModalTitle, setModalText, setModalFunction}) => {
    const handleDelete = () => {
        //MODAL:
        setModalTitle("Borrar Usuario");
        setModalText("¿Estás seguro? Esta operación no se podrá deshacer.");
        setModalFunction(["users", userData.id]);
        document.querySelector(".modal__container").classList.remove("hiddenTransition");
    }

    const handleEdit = () => {
        setInfoUpdate(userData);
        //Tenemos que volver a mostrar el formulario.
        setTitleForm("Editar Usuario");//Cambiamos el Subtitulo.
        document.querySelector(".form__section").classList.remove("hiddenTransition");
    }

    return (
        <div className='card__user flex flex-column gap-01'>
            <div className='flex justify-between align-center'>
                <h2 title={userData.first_name + " " + userData.last_name}>{userData.first_name} {userData.last_name}</h2>
                <img src={userData.image_url} alt="?"/>
            </div>

            <hr />

            <div className='flex flex-column gap-00_5'>
                <h4>CORREO</h4>
                <p title={userData.email}>{userData.email}</p>
                <h4>CUMPLEAÑOS</h4>
                <p><i className='height-fitContent bx bx-calendar'></i> {userData.birthday}</p>
            </div>

            <hr />

            <div className='flex justify-evenly'>
                <button onClick={handleDelete} className='button button-delete cursor-pointer'>Borrar</button>
                <button onClick={handleEdit} className='button button-edit cursor-pointer'>Editar</button>
            </div>
        </div>
    )
}

export default RenderUser