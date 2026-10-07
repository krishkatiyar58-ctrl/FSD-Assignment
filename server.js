const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Sample books
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        year: 1988
    },
    {
        id: 2,
        title: "Harry Potter",
        author: "J.K. Rowling",
        year: 1997
    }
];

// GET - Display all books
app.get("/books", (req, res) => {
    res.json(books);
});

// POST - Add a new book
app.post("/books", (req, res) => {
    const { title, author, year } = req.body;

    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        year: year
    };

    books.push(newBook);

    res.json({
        message: "Book added successfully",
        book: newBook
    });
});

// PUT - Update book
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.year = req.body.year;

    res.json({
        message: "Book updated successfully",
        book: book
    });
});

// DELETE - Delete book
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const bookExists = books.some(b => b.id === id);

    if (!bookExists) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books = books.filter(b => b.id !== id);

    res.json({
        message: "Book deleted successfully"
    });
});

// Open website
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});