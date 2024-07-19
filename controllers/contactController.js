const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

const getContact =asyncHandler( async (req, res) => {
    const contacts =await Contact.find();
    res.status(200).json(contacts);
})

const createContact =asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required")
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
})

const putContact =asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not Found')
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact)
})

const deleteContact =asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not Found')
    }
    res.status(200).json(contact);
})

const getIndividualContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not Found')
    }
    res.status(200).json(contact);
})

module.exports = { getContact, createContact, putContact, getIndividualContact, deleteContact }