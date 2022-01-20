import { Router } from 'express';
import {
    registration,
    login,
    logout,
   getCurrentUser
} from '../../../controllers/auth'
import guard from  '../../../middlewares/guard'

const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.post('/logout', guard, logout)
router.get('/current',guard, getCurrentUser)


export default router;