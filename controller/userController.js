const user=require("../model/Users");

module.exports.signupUser=async function(req,res){
    console.log(req.body);
    
    let profile=await user.findOne({
        email:req.body.email
    })

    if(profile){
        return res.status(200).json({
            data:{
                userAdded:false
            },
            message:"User already exists"
        })
    }else{
        await user.create({
            email:req.body.email,
            name:req.body.name,
            password:req.body.password
        })
    }
    return res.status(200).json({
        data:{
            userAdded:true
        },
        message:"Yay!!"
    })
}

module.exports.createSession=function(req,res){
    if(req.user){
        return res.status(200).json({
            data:{
                userId:req.user.id,
                authenticated:true
            },
            message:"User is Authenticated"
        })
    }
    else{
        return res.status(200).json({
            data:{
                authenticated:false
            },
            message:"Invalid user name"
        })
    }
}

module.exports.getNotes=async function(req,res){
    let id=req.params.id;
    let profile=await user.findById(id);
    let notes =profile.notes;
    return res.status(200).json({
        data:{
            notes:notes
        },
        message:"Have some notes!!"
    })
}

module.exports.setNotes=async function(req,res){
    let id=req.params.id;
    let profile=await user.findById(id);

    await profile.updateOne({
        notes:req.body.notes
    })
    return res.status(200).json({
        message:"notes added!!"
    })
}

module.exports.getChecklist=async function(req,res){
    let id=req.params.id;
    let profile=await user.findById(id);
    let checklist =profile.checklist;
    return res.status(200).json({
        data:{
            checklist:checklist
        },
        message:"Have some checklists!!"
    })
}

module.exports.setChecklist=async function(req,res){
    let id=req.params.id;
    let profile=await user.findById(id);

    await profile.updateOne({
        checklist:req.body.checklist
    })
    return res.status(200).json({
        message:"checklist added!!"
    })
}

module.exports.getTodoList=async function(req,res){
    let id=req.params.id;
    let profile=await user.findById(id);
    let todolist =profile.todolist;
    return res.status(200).json({
        data:{
            list:todolist
        },
        message:"Have some todolist!!"
    })
}

module.exports.setTodoList=async function(req,res){
    let id=req.params.id;
    let profile=await user.findById(id);

    await profile.updateOne({
        todolist:req.body.list
    })
    return res.status(200).json({
        message:"todo list added!!"
    })
}