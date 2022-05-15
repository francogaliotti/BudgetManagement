const express = require('express')
const { Record, Category, sequelize } = require('../models')

const findAll = (req, res) => {
    Record.findAll({
        order: sequelize.literal('createdAt DESC'),
        where:{
            UserId: req.user.id
        },
        include: Category
    }).then(records => {
        res.json(records)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
}

const createRecord = (req, res) => {
    Record.create({
        concept: req.body.concept,
        amount: req.body.amount,
        type: req.body.type,
        date: req.body.date,
        UserId: req.user.id,
        CategoryId: req.body.CategoryId
    }).then(record => {
        res.json(record)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
}

const getRecordById = (req, res) => {
    const id = req.params.id
    Record.findByPk(id).then(record => {
        res.json(record)
    })
}

const updateRecord = (req, res) => {
    const id = req.params.id
    Record.findByPk(id).then(record => {
        record.update({
            concept: req.body.concept,
            amount: req.body.amount,
            type: record.type,
            date: req.body.date,
            CategoryId: req.body.CategoryId
        }).then(record => {
            res.json(record)
        })
    })
}

const deleteRecord = (req,res) => {
    const id = req.params.id
    Record.findByPk(id).then(record => {
        record.destroy().then(record => {
            res.json(record)
        })
    })
}



module.exports = {
    findAll,
    createRecord,
    getRecordById,
    updateRecord,
    deleteRecord
}