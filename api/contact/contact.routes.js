const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getContacts, getContact, addContact, updateContact, removeContact } = require('./contact.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getContacts)
router.get('/:contactId', log, getContact)
router.post('/', addContact)
// router.post('/',log, requireAuth, addBoard)
router.put('/:contactId', updateContact)
// router.put('/:boardId',log, requireAuth, updateBoard)
router.delete('/:contactId', removeContact)
// router.delete('/:boardId', requireAuth, requireAdmin, removeBoard)

module.exports = router