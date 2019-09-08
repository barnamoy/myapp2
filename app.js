const express = require('express')
const mongoose = require('mongoose')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
//database
app.set('view engine','ejs')
 const Users = require('./model/scheme')
 mongoose.connect('mongodb://localhost:27017/auth',{ useNewUrlParser: true })
// const nuser = new Users({
//     username:"sucharita",
//     password:'ilovebabu'
// })

// nuser.save().then((result)=>{
//     console.log(result)

// }).catch((error)=>{
//     console.log(error)
// })


//res and req
app.get('/',(req,res)=>{
    res.send("this is home page")
})
app.get('/sing-in',(req,res)=>{
    res.render('singin')    

})
app.get('/register',(req,res)=>{
    res.render('register')

})
app.post('/postsingin',(req,res)=>{
    //res.send(req)
    passw_entered = req.body.password
    console.log(passw_entered)
    Users.find({username: req.body.username}).then(result=>{
        obj =result
        console.log(obj[0].password)
        if(obj[0].password == passw_entered){
            res.send('login')
        }
        else{
            res.send('wrong password')
        }
    }).catch(error=>{
        console.log(error)
            res.send('invalid username')
        
    })
})
app.post('/register',(req,res)=>{
    console.log(req.body.cnfpassword)
    console.log(req.body.password)
    if(req.body.password != req.body.cnfpassword){
        return res.send('unmatched password')
    }

    
    var nusers = new Users({username: req.body.username, password:req.body.password })
    console.log(nusers)
    nusers.save().then(result=>{
        console.log(result)
        res.render('/sing-')
    T}).catch(error=>{
        console.log(error)
    })
})
app.listen(4444,()=>{
    console.log('server is running')
})