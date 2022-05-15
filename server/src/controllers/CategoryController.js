const express = require('express')
const { Category, sequelize } = require('../models')

const findCategories = (req, res) => {
    const type = req.params.type
    Category.findAll({
        where:{
            type: type
        }
    }).then(categories => {
        res.json(categories)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
}

module.exports={
    findCategories
}