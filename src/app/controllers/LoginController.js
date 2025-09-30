const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Account = require('../models/Account.js')

const LoginController = async (req, res) => {
    const { phone, password } = req.body
    try {
        const acc = await Account.findOne({ phone })
        if (!acc) {
            return res.status(400).json({ message: 'User not found!' })
        }
        bcrypt.compare(password, acc.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Server error' })
            if (!isMatch) return res.status(400).json({ message: 'Password is incorrect' })

            const payload = {
                _id: acc._id,
                phone: acc.phone,
                role: acc.role,
                name:acc.name
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET
                // (err, token) => {
                // if (err) {
                //     console.error('Token generation failed:', err);
                //     return res.status(500).json({ message: 'Token generation failed' })
                // }


                // }
            )
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 4 * 60 * 60 * 1000
            })
            res.json({ user: acc })

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }


}

module.exports = { LoginController }