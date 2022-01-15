import { Router } from 'express';
import {getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts'
import {validateCreate, validateUpdate,validateUpdateFavorite, validateId, validateQuery} from "./validation.js"

const router = new Router()

router.get('/',validateQuery, getContacts)

router.get('/:id', validateId, getContactById)

router.post('/', validateCreate, addContact)

router.delete('/:id', validateId, removeContact)

router.put('/:id', validateId, validateUpdate, updateContact)

router.patch('/:id/favorite',validateUpdateFavorite, updateContact )

export default router;
