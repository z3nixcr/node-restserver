const Role = require('../models/role.js')
const Usuario = require('../models/usuario')

const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

const emailExists = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe en la BD`)
    }
}

const userByIdExists = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: (${correo}) no existe`)
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userByIdExists
}