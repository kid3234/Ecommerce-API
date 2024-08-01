import mongoose from "mongoose";

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        ref:"Category",
        // required:true
    },
    sizes:{
        type:[String],
        enum:["S","M","L","XL","XXL"],
        required:true
    },
    colors:{
        type:[String],
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    image:{
        type:String,
        default:"https://www.freepik.com/free-ai-image/beautiful-anime-kid-cartoon-scene_94944883.htm#fromView=keyword&page=1&position=9&uuid=42e262d2-0ca2-401b-8176-230e8d29bf5a&from_element=home_trends"
    },

    reviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    },
    price:{
        type:Number,
        required:true,
    },
    totalQty:{
        type:Number,
        required:true,
    },
    totalSold:{
        type:Number,
        required:true,
        default:0
    },
    
},
{
    timestamps:true,
    toJSON:{virtuals:true},
}
)

const Product = mongoose.model("Product",ProductSchema);

export default Product