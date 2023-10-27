const { Router } = require('express')
const { check } = require('express-validator')

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios')

const { validarCampos } = require('../middlewares/validar-campos')
const { isValidRole, emailExists, userByIdExists } = require('../helpers/db-validators')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userByIdExists),
    check('role').custom(isValidRole),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener igual o más de 6 caracteres').isLength({min: 6}),
    // check('correo', 'Este correo no es válido o ya está registrado').isEmail(),
    check('correo').custom(emailExists),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validarCampos
] ,usuariosPost)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userByIdExists),
], usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router