import db from './db.js'
import { ObjectId } from 'mongodb';
import res from 'express/lib/response';

const getCollection = async(db, name) => {
    const client = await db;
  const collection = await client.db().collection(name);
  return collection;
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts');
  const result = await collection.find().toArray();
  return result;
}

const getContactById =  async(contactId) => {
  const collection = await getCollection(db, 'contacts');
  const id = ObjectId(contactId);
  const [result] = await collection.find({ _id: id }).toArray()
  return result;
}

const removeContact = async (contactId) => {
   const collection = await getCollection(db, 'contacts');
  const id = ObjectId(contactId);
  const result = await collection.findOneAndDelete({ _id: id })
  return result;
}

const addContact = async (body) => {
  const collection = await getCollection(db, 'contacts');
  const newContact = {
    favorite: false,
    ...body
  }
}

const updateContact = async (contactId, body) => {

}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
