import { HttpCode } from '../../lib/constants'
import repositoryUsers  from '../../repository/users'
import { EmailService, SenderSendgrid } from '../../service/email'
import {
    UploadFileService,
    LocalFileStorage,
    CloudFileStorage,
} from '../../service/file-storage'

const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadFileService(
         LocalFileStorage,
        req.file,
        req.user,
    )
    const avatarUrl = await uploadService.updateAvatar()
    res 
        .status(HttpCode.OK)
        .json({ status: 'succses', code: HttpCode.OK, data: {avatarUrl} })
}
const verifyUser = async (req, res, next) => {
    console.log("dfbdfbdfbdfb");
    const verifyToken = req.params.token
    const userFromToken =  await repositoryUsers.findByVerifyToken(verifyToken)
    if (userFromToken) {
        await repositoryUsers.updateVerify(userFromToken.id, true)
        return res 
        .status(HttpCode.OK)
        .json({ status: 'succses', code: HttpCode.OK, data: { message: 'Success' } })
    }
 
       res 
        .status(HttpCode.BAD_REQUEST)
        .json({ status: 'succses', code: HttpCode.BAD_REQUEST, data: {message: 'Invalid token'} })
}

const repeatEmailForVErifyUser = async (req, res, next) => {
    const { email } = req.body
    const user = await repositoryUsers.findByEmail(email)

    if (user) {
        const { email, name, verifyTokenEmail } = user
        const emailService = new EmailService(
            process.env.NODE_ENV,
            new SenderSendgrid()
        )
       
        const isSend = await emailService.sendVerifyEmail(
            email,
            name,
            verifyTokenEmail,
        )
        if (isSend) {
            return res 
            .status(HttpCode.OK)
            .json({ status: 'success', code: HttpCode.OK, data: {message: 'Success'} })
        }
        return res 
        .status(HttpCode.UE)
        .json({ status: 'error', code: HttpCode.UE, data: {message: 'Unprocessable Entity'} })
        }
 
    res 
        .status(HttpCode.NOT_FOUND)
        .json({ status: 'error', code: HttpCode.NOT_FOUND, data: {message: 'User with email not found'} })
}

export {uploadAvatar, verifyUser, repeatEmailForVErifyUser, }