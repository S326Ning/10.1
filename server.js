// import express, body-parser and validator
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())
const https = require("https")
const mongoose = require("mongoose")
const MyTask = require("./models/Task")


// direct to index
app.get('/',(req,res)=>{
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
})

// import mangoose and connect to local mangoDB
mongoose.connect("mongodb://localhost:27017/iServiceDB", {useNewUrlParser:true})


app.post('/posttask',(req,res)=>{
    try {
        const newTask = new MyTask({
            taskType: req.body.taskType,
            taskTitle: req.body.taskTitle,
            taskDesc: req.body.taskDesc,
            Suburb: req.body.Suburb,
            Date: req.body.Date,
            budgetType: req.body.budgetType,
            budgetMoney: req.body.budgetMoney
        })
        // save new customer to the mongoDB
        newTask.save((err)=>{
            if(err){
                res.json(err.message)
            }
            else{
                console.log("New Task Posted!")
                res.json("New post posted successully!")
            }
        })
    } catch (e) {
        console.log(e)
        res.json(e.message)
    }
})

app.listen(8080, function (request, response){
    console.log("Server is running on port 8080")
})