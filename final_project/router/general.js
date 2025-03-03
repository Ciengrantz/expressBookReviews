const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookDetails = books[isbn];
  if (bookDetails){
    res.send(JSON.stringify(bookDetails, null, 4));
  }
  else{
    res.status(404).send('Book not found');
  }
 });

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author.toLowerCase();
  const Byauthor = [];
  for (const key in books) {
    if (books.hasOwnProperty(key)) {
      const book = books[key];
      if (book.author.toLowerCase() === author) {
        ByAuthor.push(book);
      }
    }
  }
  if (Byauthor.length > 0){
    res.send(JSON.stringify(Byauthor,null, 4));
  }  
  else {
    res.status(404).send('No books found by this author');
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const Bytitle = books[title];
  if(Bytitle){
    res.send(JSON.stringify(Bytitle, null, 4));
  }
  else {
    res.status(404).send('Book not found');
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
