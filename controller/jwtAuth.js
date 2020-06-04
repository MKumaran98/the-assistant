const User=require('../model/Users')
const jwt=require('jsonwebtoken');

module.exports.createSession =async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            console.log(user);
            return res.status(200).json({
                message: "Invalid username or password",
            });
        }

        return res.status(200).json({
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(),"QkDwFen2ImhOJSk4eR8LmvggGVjozYEs" , {expiresIn:  '60m'}),
                userId:user.id
            }
        })

    }catch(err){
        console.log('********', err);
        return res.status(200).json({
            message: "Internal Server Error"
        });
    }
}