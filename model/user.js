import pkg from 'mongoose';
import bcrypt from 'bcryptjs/dist/bcrypt';
import { Role } from '../lib/constants';

const { Schema, model } = pkg;
  
const userSchema = new Schema({
   
    name: {
      type: String,
      default: 'Guest'
    },
    email: {
        type: String,
        required: [true, 'Set email for user'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/
            return re.test(String(value).trim().toLocaleLowerCase())
        }
    },
    password: {
             type: String,
        required: [true, 'Set password for user'],
        
    },
    role: {
        type: String,
        enum: {
            values: Object.values(Role),
            message: 'Role is not allowed'
        },
        default: Role.USER,
    },
    token: {
        type: String,
        default: null,
    }
  
  }, { versionKey: false, timestamps: true });
  
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})

userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)
  
export default User;