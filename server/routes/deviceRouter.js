const Router = require('express')
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)
router.put('/', checkRole('ADMIN'), deviceController.edit)

module.exports = router