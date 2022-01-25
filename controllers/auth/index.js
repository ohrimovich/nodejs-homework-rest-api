import { HttpCode } from '../../lib/constants'
import AuthService from '../../service/auth';
import {
    EmailService,
    SenderNodemailer,
    SenderSendgrid
} from '../../service/email';

const authService = new AuthService();

const registration = async (req, res, next) => {
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
        return   res
        .status(HttpCode.CONFLICT)
            .json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email is already exist' })
    }
    const userData = await authService.create(req.body)
    const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid())
    console.log( userData)
   const isSend = await emailService.sendVerifyEmail(
        email,
        userData.name,
        userData.verifyTokenEmail
    )
    delete await userData.verifyTokenEmail
    res.status(HttpCode.OK).json({ status: 'sucsses', code: HttpCode.OK, data: {...userData, isSendEmailVerify: isSend} })
   
}

const login =  async (req, res, next) => {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
        return   res
            .status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Invalid credentials'
            })
    }
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)
    res
        .status(HttpCode.OK)
        .json({ status: 'sucsses', code: HttpCode.OK, data: {token} })
}

const logout = async (req, res, next) => {
    
    await authService.setToken(req.user.id, null)
    res
        .status(HttpCode.NO_CONTENT)
        .json({ status: 'sucsses', code: HttpCode.NO_CONTENT, data: {} })
}

const getCurrentUser = async (req, res, next) => {
    const currentUser = req.user;
    res
        .status(HttpCode.OK)
        .json({
            status: 'sucsses', code: HttpCode.OK, data: {
                email: currentUser.email,
                subscription: currentUser.role,
    } })
} 
export {registration, login, logout, getCurrentUser}