import User from '../model/User.js'

export const registerUser = async (req,res)=>{
   
    const {fullName,email,password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.json({
            msg:'user already exists',
        })
    } 

    const user =await User.create({
        fullName,
        password,
        email
    });

    res.status(201).json({
     status:"success",
     message:"user registerd successfully",
     data:user
    })
}

