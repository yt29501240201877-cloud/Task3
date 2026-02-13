require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

async function dbconnest() {
    try {
        await  mongoose.connect(process.env.URL)
        console.log("Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

dbconnest();

const Author = require("./model/Author");
const Book = require("./model/Book");

app.post("/authors", async (req, res) => {
    try {
        const {Name} = req.body;
        const author = await Author.create({Name});
        res.status(201).json({msg:"Author created successfully", author});
    } catch (error) {
        console.log(error);
    }
});

app.post("/books", async (req, res) => {
    try {
        const {title} = req.body;
        const books = await Book.create({
            title,
            author:req.body.author
        });
        res.status(201).json({msg:"Book created successfully", books});
    } catch (error) {
        console.log(error);
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find().populate("author");
        res.status(200).json({msg:"Books retrieved successfully", books});
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})