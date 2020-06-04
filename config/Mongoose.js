const Mongoose =require('mongoose');

Mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/theassistant",{ useNewUrlParser: true ,useFindAndModify:true , useUnifiedTopology: true});

const db=Mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to database'));

db.once('open',function(){
    console.log('Database connection established successfully');
})

module.exports=db