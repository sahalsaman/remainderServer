const express=require('express')
const dataService=require('./services/data.service')
const cors=require('cors')
// const { json } = require('express/lib/response')
const jwt=require("jsonwebtoken")
const { verify } = require("jsonwebtoken")

const app=express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:4200"
}))

const jwtMiddleWare=(req,res,next)=>{
    try{
        const token=req.headers['access-token']
        const data=verify(token,"superreaminderkey57891")
        req.currentUser=data.currentUser
        next()
    }catch{
        res.status(401).json({
            statusCode:401,
            status:false,
            messege:"please log In!!!!"
        })
    }
}

app.post('/register',(req,res)=>{
    dataService.register(req.body.fname,req.body.uname,req.body.pswd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/login',(req,res)=>{
    dataService.login(req.body.uname,req.body.pswd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/addEvent',jwtMiddleWare,(req,res)=>{
    dataService.addEvent(req.body.uname,req.body.date,req.body.event).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/viewEvent',jwtMiddleWare,(req,res)=>{
    dataService.viewEvent(req.body.uname,req.body.date).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/editEvent',(req,res)=>{
    dataService.editEvent(req.body.uname,req.body.date,req.body.event).then(result=>{
        res.status(result.statusCode).json(result)
    })
}) 

app.post('/deleteEvent',(req,res)=>{
    dataService.deleteEvent(req.body.uname,req.body.date).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(3200,()=>{
    console.log("server started at 3200")
})

