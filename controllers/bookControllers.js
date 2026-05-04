const express = require('express');
const path = require('path');
const multer = require('multer');
const Book = require('../models/bookModel');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/assets/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('cover');

exports.indexPage = async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });
    res.render('index', { books });
};

exports.addBook = (req, res) => {
    res.render('addBook');
};

exports.insertBookData = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    await Book.create({
        title: req.body.title,
        author: req.body.author.split(','),
        publishYear: req.body.publishYear,
        genre: req.body.genre.split(','),
        language: req.body.language,
        pages: req.body.pages,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        cover: req.file.filename,
    });

    console.log("Book Added Successfully");
    res.redirect('/');
};

exports.viewBook = async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });
    res.render('viewBook', { books });
};

exports.deleteBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/view-book');
};

exports.editBook = async (req, res) => {
    const singleBook = await Book.findById(req.params.id);
    res.render('editBook', { singleBook });
};

exports.updateBook = async (req, res) => {
    let updatedData = {
        title: req.body.title,
        author: req.body.author.split(','),
        publishYear: req.body.publishYear,
        genre: req.body.genre.split(','),
        language: req.body.language.split(','),
        pages: req.body.pages,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
    };

    if (req.file) {
        updatedData.cover = req.file.filename;
    }

    await Book.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/view-book');
};

exports.singleBookDetail = async (req, res) => {
    const singleBook = await Book.findById(req.params.id);
    res.render('bookDetails', { singleBook });
};
