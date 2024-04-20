import { useState, useEffect } from 'react'
import AddUser from './components/AddUser'
import useCrud from './js/useCrud'
import RenderUser from './components/RenderUser';
import './atributtes.css'
import './app.css'
import Modal from './components/Modal';

function App() {
    //SYSTEM:
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if(!loading){document.querySelector(".loadingScreen").classList.add("hiddenScale");}
    }, [loading]);

    //DARK MODE:
    const [colorMode, setColorMode] = useState("light");
    const changeMode = () => {
      // Get the root element
      var r = document.querySelector(':root');
      if(colorMode == "light"){
        //CHANGE TO DARK MODE:
        r.style.setProperty('--color-darkMode-btn-background', 'white');
        r.style.setProperty('--color-darkMode-btn-text', 'black');
        r.style.setProperty('--color-text-dark', 'white');
        r.style.setProperty('--color-body-background', '#333');
        r.style.setProperty('--color-form-background', '#333');
        r.style.setProperty('--color-input-form-text', 'white');
        r.style.setProperty('--color-card', 'rgb(34, 34, 34)');
        r.style.setProperty('--color-card-shadow', 'rgb(0, 255, 171)');
        setColorMode("dark");
      }else{
        //CHANGE TO LIGHT MODE:
        r.style.setProperty('--color-darkMode-btn-background', 'black');
        r.style.setProperty('--color-darkMode-btn-text', 'white');
        r.style.setProperty('--color-text-dark', 'black');
        r.style.setProperty('--color-body-background', 'white');
        r.style.setProperty('--color-form-background', 'white');
        r.style.setProperty('--color-input-form-text', 'black');
        r.style.setProperty('--color-card', 'white');
        r.style.setProperty('--color-card-shadow', 'black');
        setColorMode("light");
      }
    }

    //FORM
    const [titleForm, setTitleForm] = useState("Crear Usuario");//El subtitulo del Formulario.

    //MODAL
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");
    const [modalFunction, setModalFunction] = useState([]);//Asi se usa una funcion en un Hook.

    //CRUD
    const baseUrl = "https://users-crud.academlo.tech/";
    const [users, getUsers, createUser, borrarUser, editUser] = useCrud(baseUrl);
    const [infoUpdate, setInfoUpdate] = useState();

    useEffect(() => {
      const path = "users";//Se concatena con 'base' para crear la url de la API.
      getUsers(path, setLoading);
    }, []);
    
    const handleCreateBtn = () => {
      setTitleForm("Crear Usuario");//Cambiamos el estado del Subtitulo del Formulario.
      document.querySelector(".form__section").classList.remove("hiddenTransition");
    }

    return (
      <>
        <div className='flex justify-between align-center'>
          <h1>Usuarios</h1>
          <button onClick={handleCreateBtn} className='button button-create cursor-pointer'>+ Crear usuario</button>
        </div>

        {/* LOADING SCREEN */}
        <div className='loadingScreen flex align-center justify-center'><i className='height-fitContent bx bx-loader-circle bx-spin bx-rotate-90 bx-lg' ></i></div>

        {/* DARK MODE */}
        <div className='darkMode__container cursor-pointer' onClick={changeMode}><i className='height-fitContent bx bxs-moon bx-md'></i></div>
        
        {/* LOS MODAL */}
        <Modal
          modalText={modalText}
          modalTitle={modalTitle}
          modalFunction={modalFunction}
          setModalFunction={setModalFunction}

          borrarUser={borrarUser}
        />
        
        {/* FORM */}
        <AddUser
          createUser={createUser}
          infoUpdate={infoUpdate}
          editUser={editUser}
          setInfoUpdate={setInfoUpdate}//Se importa para actualizar a 'vacio'.
          title={titleForm}
          //MODAL:
          setModalTitle={setModalTitle}
          setModalText={setModalText}
        />

        {/* SHOW ALL USERS AVAILABLES */}
        
        <section className='cards__container flex flex-wrap justify-center gap-01'>
          {
            users?.map((user) => (
              <RenderUser
                key={user.id}
                userData={user}
                setInfoUpdate={setInfoUpdate}
                setTitleForm={setTitleForm}//Cambiar el valor del titulo del formulario.
                //MODAL:
                setModalTitle={setModalTitle}
                setModalText={setModalText}
                setModalFunction={setModalFunction}
              />
            ))
          }
        </section>
      </>
    )
}

export default App
