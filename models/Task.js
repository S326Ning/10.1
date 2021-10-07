const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    taskType: String,
    taskTitle: String,
    taskDesc: String,
    Suburb: String,
    Date: String,
    budgetType: String,
    budgetMoney: String
})

module.exports = mongoose.model('Task', taskSchema)