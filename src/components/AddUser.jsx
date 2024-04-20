import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import "./css/addUser.css"

const AddUser = ({createUser, infoUpdate, editUser, setInfoUpdate, title, setModalTitle, setModalText}) => {
    //'title' sera lo que haga el usuario ira de subtitulo. Crear, editar Usuario.

    const [foto, setFoto] = useState("");

    const {handleSubmit, register, reset} = useForm();

    const submit = (data) => {
        if(infoUpdate){//Si estamos editando un User:
            editUser('users', data, infoUpdate.id, setModalTitle, setModalText);//Las 2 ultimas son Estado para cambiar el texto del MODAL.
            setInfoUpdate();//Se actualiza a vacio, ya que sino cada que se cree usuario nuevo va estar entrando aqui.
        }else{//Sino, estamos creando un USer:
            createUser("users", data, setModalTitle, setModalText);//Las 2 ultimas son Estado para cambiar el texto del MODAL.
        }

        reset({//Este es un metodo que ya viene incluido en 'useForm', se usa para resetear, blanquear, o dar valores distintos a los input del 'form', por ahora solo los vamos a blanquear.
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
            image_url: ""
        })
        setFoto("");//Tenemos que quitar el preview de la foto de perfil.
    }
    
    const closeForm = () => {
      document.querySelector(".form__section").classList.add("hiddenTransition");

      reset({//Este es un metodo que ya viene incluido en 'useForm', se usa para resetear, blanquear, o dar valores distintos a los input del 'form', por ahora solo los vamos a blanquear.
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          birthday: "",
          image_url: ""
      })
      setInfoUpdate();//Lo vaceamos para poder que se vuelva a disparar el State.
      setFoto("");//Tenemos que quitar el preview de la foto de perfil.
    }

    //PREVIEW PHOTO:
    useEffect(() => {
        const inputFotoUrl = document.getElementById("foto");
        inputFotoUrl.paste = () => {
            setFoto(document.getElementById("foto").value);
        }
        inputFotoUrl.onkeyup = () => {
            setFoto(document.getElementById("foto").value);
        }
    }, [])

    useEffect(() => {
        if(infoUpdate){
            setFoto(infoUpdate.image_url);
            reset(infoUpdate);
        }//Colocamos la info del usuario a editar antes de abrir el formulario.
    }, [infoUpdate]);

    return (
        <>
            <section className='form__section flex flex-column justify-center align-center gap-01 hiddenTransition'>
                <form onSubmit={handleSubmit(submit)} className='flex flex-column gap-01'>
                    <div className='flex justify-between align-center'>
                        <h2>{title}</h2>   
                        <i onClick={closeForm} className='height-fitContent bx bx-x bx-md cursor-pointer'></i>
                    </div> 

                    <img src={foto} alt="?"  className='flex justify-center align-center'/>

                    {/* FORM */}
                    <div className='flex flex-column gap-00_5'>
                        <label htmlFor="foto">Foto de Perfil:</label>
                        <input {...register('image_url')} type="url" id='foto' placeholder='url...' required/>
                    </div>

                    <div className='flex flex-column gap-00_5'>
                        <label htmlFor="nombre">Nombres:</label>
                        <input {...register('first_name')} type="text" id='nombre' max="25" required/>
                    </div>
                    
                    <div className='flex flex-column gap-00_5'>
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input {...register('last_name')} type="text" id='apellidos' max="25" required/>
                    </div>
                    
                    <div className='flex flex-column gap-00_5'>
                        <label htmlFor="correo">Correo:</label>
                        <input {...register('email')} type="email" id='correo' placeholder='example@example.com' required/>
                    </div>
                    
                    <div className='flex flex-column gap-00_5'>
                        <label htmlFor="contraseña">Contraseña:</label>
                        <input {...register('password')} type="password" id='contraseña' min="6" required/>
                    </div>
                    
                    <div className='flex flex-column gap-00_5'>
                        <label htmlFor="cumpleaños">Cumpleaños:</label>
                        <input {...register('birthday')} type="date" id='cumpleaños' min="1910-01-01" max="2024-01-01" required/>
                    </div>
                    <button className='button button-create cursor-pointer'>Guardar</button>
                </form>
            </section>
        </>
    )
}

export default AddUser