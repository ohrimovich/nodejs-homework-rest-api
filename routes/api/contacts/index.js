import { Router } from 'express';
import {getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts'
import {validateCreate, validateUpdate,validateUpdateFavorite, validateId, validateQuery} from "./validation.js"

import guard from  '../../../middlewares/guard'
const router = new Router()

router.get('/', [guard, validateQuery], getContacts)

router.get('/:id',[guard, validateId], getContactById)

router.post('/',[guard, validateCreate], addContact)

router.delete('/:id',[guard, validateId], removeContact)

router.put('/:id',[guard, validateId, validateUpdate], updateContact)

router.patch('/:id/favorite',[guard, validateUpdateFavorite], updateContact )

export default router;
