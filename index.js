const Express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port=process.env.PORT ||8000;
const bodyParser=require('body-parser');

const app=Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//connecting to db
const db =require('./config/Mongoose')

//setting up jwt
const passportJwt=require('./config/passport-jwt-strategy');


//setting up router
app.use('/',require('./Router/Router'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error in starting up server")
    }
    console.log("Server is running at port "+port);
})