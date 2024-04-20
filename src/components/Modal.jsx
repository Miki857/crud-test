import React from 'react'
import './css/modal.css'

const Modal = ({
    modalText,
    modalTitle,
    modalFunction,//Una funcion que va a ejecutar 'MODAL', que en este caso sera 'borrarUser'.
    setModalFunction,//Hay que vacear su valor para que no se ejecute cada vez que usamos MODAL.

    borrarUser
}) => {

    const hideModal = () => {
        //Ocultamos el Modal.
        document.querySelector(".modal__container").classList.add("hiddenTransition");
        if(modalFunction.length != 0){
            borrarUser(modalFunction[0], modalFunction[1]);//Ejecuto la funcion 'borrarUser' si es que la hay.
            setModalFunction([]);//Vaceamos su valor.
        }
    }
    
    const closeModal = () => {
        //Ocultamos el Modal.
        document.querySelector(".modal__container").classList.add("hiddenTransition");
    }

    return (
        <div className='modal__container flex justify-center align-center hiddenTransition'>
            <div className='modal flex flex-column gap-01'>
                <div className='flex align-center justify-between'>
                    <h2>{modalTitle}</h2>
                    <i onClick={closeModal} className='height-fitContent bx bx-x bx-md cursor-pointer'></i>
                </div>
                <p>{modalText}</p>
                <button className='button button-create cursor-pointer' onClick={hideModal}>Aceptar</button>
            </div>
        </div>
    )
}

export default Modal