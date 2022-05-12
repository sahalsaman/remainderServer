const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/remainderServer',{
    useNewUrlParser:true
})

const User=mongoose.model('User',{
    fname:String,
    uname:String,
    pswd:String,
    event:[]
})

module.exports={
    User
}