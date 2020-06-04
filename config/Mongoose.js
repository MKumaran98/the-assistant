const Mongoose =require('mongoose');

const MONGODB_URI="mongodb+srv://kumaran:011119@assistantdb-4x60v.mongodb.net/<dbname>?retryWrites=true&w=majority"

Mongoose.connect(MONGODB_URI ||"mongodb://localhost/theassistant",{ useNewUrlParser: true ,useFindAndModify:true , useUnifiedTopology: true, useCreateIndex:true});

const db=Mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to database'));

db.once('open',function(){
    console.log('Database connection established successfully');
})

module.exports=db