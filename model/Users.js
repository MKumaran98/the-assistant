const Mongoose = require('mongoose');

const userSchema=new Mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    notes:[
        {
        type:String
    }
    ],
    checklist:[
        {
            value:{
                type:String
            },
            checked:{
                type:Boolean
            }      
        }
    ],
    todolist:[
        {
            title:{
                type:String
            },
            dueDate:{
                type:String
            },
            description:{
                type:String
            },
            priority:{
                type:Number
            }
        }
    ]
});

const User = Mongoose.model("User",userSchema);

module.exports=User;