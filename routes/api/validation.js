import Joi from 'joi'

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()

})

export const validateCreate = async (req, res, next) => {
    try {
        const value = await createSchema.validateAsync(req.body)
    } catch(err) {
        return res.status(400).json({message: err.message})
    }
    next()
}



