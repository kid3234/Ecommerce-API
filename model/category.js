import mongoose from "mongoose";

const Schema = mongoose.Schema

const categorySchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        image:{
            type:String,
            default:"https://www.freepik.com/free-psd/black-friday-super-sale-social-media-banner-template_33485097.htm#fromView=search&page=1&position=0&uuid=e8662209-beaa-4519-8f35-e5fb9e943eb2",
            required:true
        },
        product:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        ]
    },
    {
        timestamps:true
    }
)
const Category = mongoose.model("Category",categorySchema);

export default Category