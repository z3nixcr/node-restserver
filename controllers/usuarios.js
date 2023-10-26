const { response } = require('express')
const Usuario = require('../models/usuario')
const { emailExists } = require('../helpers/db-validators')
const encryptPassword = require('../helpers/pass-encrypt')


const usuariosGet = async (req, res = response) => {
    // const {query, nombre, apikey} = req.query
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    // Realizar la petición en paralelo
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const {_id, password, google, correo, ...rest} = req.body;

    // TODO: Validar contra la BD
    if (password) {
        rest.password = encryptPassword(password);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest, {
        new: true,
        upsert: true,
        includeResultMetadata: true
    });

    res.status(400).json(usuario)
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, role} = req.body
    const usuario = new Usuario( {nombre, correo, password, role} );

    // Verificar si el correo existe
    emailExists(correo);
    
    // Encriptar la contraseña
    usuario.password = encryptPassword(password);

    // Guardar en BD
    await usuario.save();

    res.status(201).json(usuario)
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    // Borrado físicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false,
        new: true,
        upsert: true,
        includeResultMetadata: true
    })

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "Patch API - Controlador"
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}