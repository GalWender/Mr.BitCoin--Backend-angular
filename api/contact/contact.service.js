const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('contact')
        var contacts = await collection.find(criteria).toArray()
        return contacts
    } catch (err) {
        logger.error('cannot find contacts', err)
        throw err
    }
}

async function getById(contactId) {
    try {
        const collection = await dbService.getCollection('contact')
        const contact = await collection.findOne({ _id: ObjectId(contactId) })
        return contact
    } catch (err) {
        logger.error(`while finding contact ${contactId}`, err)
        throw err
    }
}

async function remove(contactId) {
    try {
        const collection = await dbService.getCollection('contact')
        await collection.deleteOne({ _id: ObjectId(contactId) })
        return contactId
    } catch (err) {
        logger.error(`cannot remove contact ${contactId}`, err)
        throw err
    }
}

async function add(contact) {
    try {
        const collection = await dbService.getCollection('contact')
        await collection.insertOne(contact)
        return contact
    } catch (err) {
        logger.error('cannot insert contact', err)
        throw err
    }
}

async function update(contact) {
    try {
        const contactId = ObjectId(contact._id)
        delete contact._id
        const collection = await dbService.getCollection('contact')
        await collection.updateOne({ _id: contactId }, { $set: { ...contact } })
        return { _id: contactId, ...contact }
    } catch (err) {
        logger.error(`cannot update contact ${contact._id}`, err)
        throw err
    }
}

async function addMsg(msg) {
    try {
        var contactId = ObjectId(msg.contactId)
        delete msg.contactId
        const collection = await dbService.getCollection('contact')
        await collection.updateOne({ _id: contactId }, { $push: { msgs: msg } })
    } catch (err) {
        logger.error(`cannot add message ${msg}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (!filterBy) return criteria
    // if (filterBy.maxPrice && filterBy.maxPrice !== 0) criteria.price = { $lte: +filterBy.maxPrice }
    // if (filterBy.term) criteria.name = { $regex: filterBy.term, $options: 'i' }
    // if (filterBy.labels && filterBy.labels.length > 0) criteria.labels = { $all: filterBy.labels }
    // if (filterBy.inStock) criteria.inStock = { $eq: filterBy.inStock }
    // if (filterBy.inStock) criteria.inStock = { $eq: (filterBy.inStock === 'true') }
    // if (filterBy.labels)
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addMsg,
}