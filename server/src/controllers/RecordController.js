const express = require('express')
const { Record, sequelize } = require('../models')

const findAll = (req, res) => {
    Record.findAll({
        order: sequelize.literal('createdAt ASC')
    }).then(records => {
        res.json(records)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
}

const createRecord = (req,res) => {
    Record.create({
        concept:req.body.concept,
        amount:req.body.amount,
        type:req.body.type,
        date:req.body.date
    }).then(record => {
        res.json(record)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
}



module.exports = {
    findAll,
    createRecord
}