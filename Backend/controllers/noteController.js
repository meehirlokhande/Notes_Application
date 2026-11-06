import Note from '../models/Note.js';

export const createNote = async (req,res) =>{
    try{
        const {
            Heading,
            Description,
            ImageUrl,
            Category,
        } = req.body || {};

        if(!Heading || !Description){
            return res.status(400).json({
                message: "Heading and description are required",
            });
        }

        const note = await Note.create({
            Heading: Heading.trim(),
            Description: Description.trim(),
            ImageUrl,
            Category: Array.isArray(Category) ? Category: [],
            user: req.userId,
        });

        return res.status(201).json({
            message:"Note created successfully",
            note,
        });



    }catch(error){

        console.error("Create note error:",error);

        return res.status(500).json({
            message: "Server error",
        })
    }
};

export const getNotes = async(req,res) =>{
    try{
        const notes = await Note.find({
            user: req.userId,

        }).sort({createdAt: -1});

        return res.status(200).json({
            notes,
        });


        
    }catch(error){
        console.error("Get notes error.", error);
        return res.status(400).json({
            message:"Server error",
        });
    }
};
