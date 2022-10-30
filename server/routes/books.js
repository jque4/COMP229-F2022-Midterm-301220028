/* 
 *  App Name:   MidTerm Project - The Favourite Book List App
 *  Author:     Jack Que (301220028)
 *  File Name:  books.js
 *  Date:       October 29, 2022
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    } else {
      // Show main page
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Show add book page
    res.render('books/details', {
      title: 'Add Book',
      books: ''
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
    // Instantiate new book
    let newBook = book({
      "Title": req.body.title,
      "Description": '',
      "Price":  parseFloat(0+req.body.price),
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    // Save new book to database
    book.create(newBook, (err) => {
      if (err) {
        console.log(err);
        res.end(''+err);
      } else {
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    // Search database using book id
    book.findById(id, (err, bookToUpdate) => {
      res.render('books/details', {
        title: 'Edit Book',
        books: bookToUpdate
      });
    });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    // Instantiate updated book
    let updatedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Description": '',
      "Price":  parseFloat(0+req.body.price),
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    // Update book in database
    book.updateOne({_id: id}, updatedBook, (err) => {
      if (err) {
        console.log(err);
        res.end(''+err);
      } else {
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
    book.remove({ _id: req.params.id }, (err) => {
      if (err) {
        console.log(err);
        res.end(''+err);
      } else {
        res.redirect('/books');
      }
    });
});

// Export module
module.exports = router;
