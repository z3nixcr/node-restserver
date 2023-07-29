const { response } = require('express')

const usuariosGet = (req, res = response) => {
    const {query, nombre, apikey} = req.query
    res.json({
        msg: "Get API - Controlador",
        query,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.status(400).json({
        msg: "Put API - Controlador",
        id
    })
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body
    res.status(201).json({
        msg: "Post API - Controlador",
        nombre,
        edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "Delete API - Controlador"
    })
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