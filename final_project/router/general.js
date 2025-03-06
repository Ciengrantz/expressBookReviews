const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
        resolve(books)
  // removed timeout
  })
  .then((books)=>{
    res.send(JSON.stringify(books,null,4));
  })
  .catch((error)=>{
    res.status(500).send('Error fetching books');
  });
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookDetails = books[isbn];
return new Promise((resolve, reject) => {
    setTimeout(()=>{
        if (bookDetails) {
            resolve(bookDetails);
        }
        else {
            reject("Book not found");
        }
     }, 1000);
})
  .then((bookDetails) =>{

    res.send(JSON.stringify(bookDetails, null, 4));

  })  
  .catch((error)=>{
    res.status(404).send(error);
  });
});

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author.toLowerCase();
  const Byauthor = [];
  return new Promise((resolve, reject) => {
    if (Byauthor){
        resolve(Byauthor)
    }else {
        reject("Author not found")
    }
  })
  .then((Byauthor)=>{
    for (const key in books) {
        if (books.hasOwnProperty(key)) {
          const book = books[key];
          if (book.author.toLowerCase() === author) {
            Byauthor.push(book);
          }
        }
      }
      if (Byauthor.length > 0){
        res.send(JSON.stringify(Byauthor,null, 4));
      }  
      else {
        res.status(404).send('No books found by this author');
      }
    

    
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title.toLowerCase();
  const Bytitle = [];
  return new Promise((resolve, reject) => {
    if (Bytitle){
        resolve(Bytitle)
    }else {
        reject("Author not found")
    }
  })
  .then((Bytitle)=>{
    for (const key in books) {
        if (books.hasOwnProperty(key)) {
          const book = books[key];
          if (book.title.toLowerCase() === title) {
            Bytitle.push(book);
          }
        }
      }
      if (Bytitle.length > 0){
        res.send(JSON.stringify(Bytitle,null, 4));
      }  else {
        res.status(404).send('No books found by this title.');
      }
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookreview = books[isbn];
  if (bookreview){
    //works
    res.send(JSON.stringify("Review:" + bookreview.reviews, null, 4));
  }
  else{
    res.status(404).send('Review not found');
  }
 });


module.exports.general = public_users;
