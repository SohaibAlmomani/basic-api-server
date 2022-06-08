"use strict";
const express = require("express");
const { Food } = require("../models/index");
const FoodRouter = express.Router();

FoodRouter.get("/food", getFood);
FoodRouter.get("/food/:id", getOneFood);
FoodRouter.post("/food", createFood);
FoodRouter.put("/food/:id", updateFood);   
FoodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
    const allFood = await Food.findAll();
    res.status(200).json(allFood);
}
async function getOneFood(req, res) {
    const food_id = parseInt(req.params.id);
    let foodName = await Food.findOne({ where: { id: food_id } });
    res.status(200).json(foodName);
}
async function createFood(req, res) {
    let newFood = req.body;
    let addFood = await Food.create(newFood);
    res.status(201).json(addFood);
}
async function updateFood(req, res) {
    let food_id = parseInt(req.params.id);
    let updateFood = req.body;
    let foundFood = await Food.findOne({ where: { id: food_id } });
    if (foundFood) {
        let updatedFood = await foundFood.update(updateFood);
        res.status(201).json(updatedFood);
    } else {
        res.status(404);
    }
}
async function deleteFood(req, res) {
    let food_id = parseInt(req.params.id);
    let deleteFood = await Food.destroy({ where: { id: food_id } });
    res.status(204).json(deleteFood); 
}

module.exports = FoodRouter;