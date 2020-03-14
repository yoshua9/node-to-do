const fs = require('fs');
const colors = require('colors');


let listadoPorHacer = [];

const guardarBD = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./bd/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarBD = () => {

    try {
        listadoPorHacer = require('../bd/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarBD();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarBD();

    return porHacer;
}

const getListado = () => {
    cargarBD();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarBD();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarBD();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    //let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        //delete listadoPorHacer[index];
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}