import axios from 'axios';
import { useState } from 'react'

const useCrud = (base) => {
    const [apiData, setApiData] = useState();
    //Leer:
    const getApi = (path, setLoading) => {
        const url = `${base}${path}/`;
        axios.get(url)
                .then(res => {setApiData(res.data); setLoading(false);})
                .catch(err => console.log(err));
    }

    //Crear:
    const postApi = (path, data, setModalTitle, setModalText) => {
        //Necesitamos el path para poder crear la url.
        //La api nos exige una 'data' para poder hacer post, esta contiene la info a crear.
        const url = `${base}${path}/`;
        axios.post(url, data)//Hay que pasarle los datos POR AQUI.
                .then(res => {
                    setApiData([...apiData, res.data]);
                    //Tenemo que volver a ocultar el formulario.
                    document.querySelector(".form__section").classList.add("hiddenTransition");
                    //Y a mostrar el Modal con su respectivo Mensaje.
                    setModalTitle(`Usuario Creado`);
                    setModalText(`El Usuario ${data.first_name} ${data.last_name} a sido creado con éxito.`);
                    document.querySelector(".modal__container").classList.remove("hiddenTransition");
                })//Lo incluimos con un'spread-operator'.
                .catch(err => console.log(err));
    }

    //Borrar:
    const deleteApi = (path, id) => {
        //Necesitamos el path para poder crear la url.
        //La api nos exige una 'id' del registro a borrar.
        const url = `${base}${path}/${id}/`;
        axios.delete(url)//Hay que pasarle los datos POR AQUI.
                .then(res => setApiData(apiData.filter((user) => user.id !== id)))//Filtramos 'apiData' quedandonos con los 'users' que tengan 'id' diferente al borrado.
                //Ten en cuenta que 'apiData' necesita actualizarse, el axios.delete borra por si mismo el 'user' de la DDBB, PERO NOSOTROS NECESITAMOS ACTUALIZAR 'apiData' para que se recargue el componente. De otra forma se seguira mostrando aunque ya no exista.
                .catch(err => console.log(err));
    }

    //Actualizar:
    const patchApi = (path, data, id, setModalTitle, setModalText) => {
        //Necesitamos el path para poder crear la url.
        //La api nos exige una 'data' para poder hacer patch, esta contiene la info a actualizar.
        //La api nos exige una 'id' del registro a actualizar.
        const url = `${base}${path}/${id}/`;
        axios.patch(url, data)//Hay que pasarle los datos POR AQUI.
                .then(res => {
                    setApiData(apiData.map((car) => car.id === id ? data : car));
                    //Tenemo que volver a ocultar el formulario.
                    document.querySelector(".form__section").classList.add("hiddenTransition");
                    //Y a mostrar el Modal con su respectivo Mensaje.
                    setModalTitle(`Usuario Editado.`);
                    setModalText(`El Usuario ${data.first_name} ${data.last_name} a sido editado con éxito.`);
                    document.querySelector(".modal__container").classList.remove("hiddenTransition");
                    })
                .catch(err => console.log(err));
    }


    return [apiData, getApi, postApi, deleteApi, patchApi];
}

export default useCrud;