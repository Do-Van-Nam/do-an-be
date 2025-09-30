const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Account = require('../models/Account.js')

const SignupController = async (req, res) => {
    const { phone, password, role, name } = req.body
    try {
        let acc = await Account.findOne({ phone })
        if (acc) {
            return res.status(400).json({ message: 'User already exists!' })
        }

        // ma hoa mat khau 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        let acc1 = {
            phone: phone,
            password: hashedPassword,
            role: role, name: name
        }
        acc = new Account({
            phone: phone,
            password: hashedPassword,
            role: role,
            name: name
        })
        await acc.save()

        const payload = {
            _id: acc._id,
            phone: acc.phone,
            role: acc.role,
            name: acc.name
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 4 * 60 * 60 * 1000
        })
        res.json({ user: acc1, token: token, role: acc.role })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { SignupController }