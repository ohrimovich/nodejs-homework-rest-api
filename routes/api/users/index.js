import { Router } from 'express'
import {uploadAvatar, verifyUser,repeatEmailForVErifyUser} from '../../../controllers/users'
import guard from '../../../middlewares/guard'
import { upload } from '../../../middlewares/upload'

const router = new Router()

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:token', verifyUser)
router.post('/verify',repeatEmailForVErifyUser)

export default router