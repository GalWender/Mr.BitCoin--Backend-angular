const contactService = require('./contact.service')
const logger = require('../../services/logger.service')

//?- GET LIST
async function getContacts(req, res) {
    try {
        logger.debug('Getting Contacts')
        const filterBy = (req.query) ? req.query : null
        const contacts = await contactService.query(filterBy)
        res.json(contacts)
    } catch (error) {
        logger.error('Failed to get Contacts', error)
        res.status(500).send({ err: 'Failed to get Contacts' })
    }
}

//?- GET BY ID
async function getContact(req, res) {
    try {
        logger.debug('Getting Contact')
        const { contactId } = req.params
        const contact = await contactService.getById(contactId)
        res.json(contact)
    } catch (error) {
        logger.error('Failed to get Contact', error)
        res.status(500).send({ err: 'Failed to get Contact' })
    }
}

//?- CREATE
async function addContact(req, res) {
    try {
        logger.debug('Adding contact')
        const contact = req.body
        const addedContact = await contactService.add(contact)
        res.json(addedContact)
    } catch (error) {
        logger.error('Failed to add Contact', error)
        res.status(500).send({ err: 'Failed to add Contact' })
    }
}

//?- UPDATE
async function updateContact(req, res) {
    try {
        logger.debug('Updating contact')
        const contact = req.body
        const updatedContact = await contactService.update(contact)
        res.json(updatedContact)
    } catch (error) {
        logger.error('Failed to update Contact', error)
        res.status(500).send({ err: 'Failed to update Contact' })
    }
}

//?- DELETE
async function removeContact(req, res) {
    try {
        logger.debug('Removing contact')
        const { contactId } = req.params
        const removedContact = await contactService.remove(contactId)
        res.json(removedContact)
    } catch (error) {
        logger.error('Failed to remove Contact', error)
        res.status(500).send({ err: 'Failed to remove Contact' })
    }
}

module.exports = {
    getContacts,
    getContact,
    addContact,
    updateContact,
    removeContact
}  