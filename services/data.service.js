const db = require('./db')
const jwt = require('jsonwebtoken')

const register = (fname, uname, pswd) => {
    return db.User.findOne({ uname }).then(user => {
        if (user) {
            return {
                statusCode: 401,
                status: false,
                message: 'Account already exist.. please login!!'
            }
        } else {
            const newUser = new db.User({
                fname,
                uname,
                pswd
            })
            newUser.save()
            return {
                statusCode: 200,
                status: true,
                message: 'Success fully created.. please login!!'
            }
        }
    })
}

const login = (uname, pswd) => {
    return db.User.findOne({ uname, pswd }).then(user => {
        if (user) {
            currentName = user.fname
            currentUser = uname
            const token = jwt.sign({
                currentUser: uname
            }, 'superreaminderkey57891')
            return {
                statusCode: 200,
                status: true,
                message: "login Success fully",
                token,
                currentName,
                currentUser
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "please sign up"
            }
        }
    })
}

const addEvent = (uname, date, event) => {
    return db.User.findOne({ uname }).then(user => {
        if (user) {
            user.event.push({
                date: date,
                event: event
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: "successfully Event added on "+date
            }
        } else {
            return {
                statusCode: 401,
                stats: false,
                message: "invalid credentiol"
            }
        }
    })
}

const viewEvent=(uname)=>{
    return db.User.findOne({uname}).then(user=>{
        if(user){
            return{
                statusCode:200,
                stats:true,
                events:user.event
            }
        }else{
            return {
                statusCode: 401,
                stats: false,
                message: "invalid credentiol"
            }
        }
    })
}

const editEvent=(uname,date,event)=>{
    return db.User.findOne({uname}).then(user=>{
        if(user){
            for(let e of user.event){
                if(e.date==date){
                    //  db.User.updateOne({uname:"shanu"},{$set:{uname:"shanuk"}});
                    // user.event[e].push()=({
                    //     date:date,
                    //     event:event
                    // })
                    user.save()
                    return{
                        statusCode:200,
                        stats:true,
                        message:date+", event updated Success fully old event : "+e.event+", new event : "+event
                        
                    }
                }else{
                    return {
                    statusCode: 401,
                    stats: false,
                    message: "event not added on "+date
                }
            }
            }
        }else{
            return {
                statusCode: 401,
                stats: false,
                message: "invalid credentiol"
            }
        }
    })
  }

  const deleteEvent=(uname,date)=>{
        return db.User.findOne({uname}).then(user=>{
            if(user){
                for(let e of user.event){
                    if(e.date==date){
                        
                        return{
                            statusCode:200,
                            stats:true,
                            message:date+" event deleted "+e.date
                        }
                    }else{
                        return {
                        statusCode: 401,
                        stats: false,
                        message: "event not added on "+date
                    }
                }
                }
            }else{
                return {
                    statusCode: 401,
                    stats: false,
                    message: "invalid credentiol"
                }
            }
        })
    }
        
module.exports = {
    register,
    login,
    addEvent,
    viewEvent,
    editEvent,
    deleteEvent
}