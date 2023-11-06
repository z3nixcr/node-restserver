const { response } = require('express')
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuarop que corresponde al uid
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            })
        }
        
        // Verificar si el usuario tiene el estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        req.usuario = usuario;

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }

}


module.exports = {
    validarJWT
}