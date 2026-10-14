import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    ImageUrl:{
        type:String,
        
    },
    Heading:{
        type:String,
        required:true,
        trim:true,
    },
    Description:{
        type:String,
        required: true,
        trim: true,
    },
    Category:{
        type:[String],
        default:[],
        index: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{timestamps:true}

);

export default mongoose.model("Note",noteSchema);
