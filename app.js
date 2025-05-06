import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
});

db.connect();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

// Fetch books and associated covers/authors from database
app.get('/books', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books ORDER BY id ASC');
        const books = result.rows;

        // Fetch covers and author photos
        for (let book of books) {
            if (book.olid && book.olid.trim() !== '') {
                // Use the OLID to get cover from OpenLibrary
                book.cover_url = `https://covers.openlibrary.org/b/olid/${book.olid}-L.jpg`;
                book.author_photo_url = `https://covers.openlibrary.org/a/olid/${book.olid}-S.jpg`;
            } else {
                // Use placeholder image if no OLID available
                book.cover_url = '/images/Image-placeholder.png';
            }
        }

        res.render('books', { books });
    } catch (error) {
        console.error(error);
        res.render('books', { books: [], error: 'Error fetching book data' });
    }
});

// get OLID from OpenLibrary API
async function getOLID(title, author) {
    try{
        const response = await axios.get(`https://openlibrary.org/search.json?title=${title}&author=${author}`)
        if (response.data.docs && response.data.docs.length > 0 && response.data.docs[0].cover_edition_key) {
            return response.data.docs[0].cover_edition_key;
        }
        return null;
    } catch (error) {
        console.error('Error fetching OLID:', error);
        return null;
    }
}

//display add book form
app.get("/books/add", (req, res) => {
    res.render('add-book');
});

// add a new book
app.post("/books/add", async (req, res) => {
    try {
        const { title, author, rating, review, date_read } = req.body;
        const olid = await getOLID(title, author);

        // Insert into database, including OLID
        await db.query(
            'INSERT INTO books (title, author, rating, review, date_read, olid) VALUES ($1, $2, $3, $4, $5, $6)', 
            [title, author, rating, review, date_read, olid || '']
        );

        res.redirect('/books');
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Error adding book');
    }
});

//show book edit page
app.get("/books/edit/:id", async(req, res) => {
    try {
        const bookId = req.params.id;
        const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Book not found');
        }
        
        const book = result.rows[0];
        res.render('edit-book', { book });
    } catch (error) {
        console.error('Error fetching book for editing:', error);
        res.status(500).send('Error fetching book data');
    }
});

// edit book 
app.put("/books/edit/:id", async(req, res) => {
    try {
        const bookId = req.params.id;
        const { title, author, rating, review, date_read } = req.body;
        
        // Get OLID for the updated book info
        const olid = await getOLID(title, author);
        
        await db.query(`
            UPDATE books
            SET title = $1,
                author = $2,
                rating = $3,
                review = $4,
                date_read = $5,
                olid = $6
            WHERE id = $7
        `, [title, author, rating, review, date_read, olid || '', bookId]);

        res.redirect('/books');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
});

// Delete book
app.post("/books/delete/:id", async(req, res) => {
    try {
        const bookId = req.params.id;
        await db.query('DELETE FROM books WHERE id = $1', [bookId]);
        res.redirect('/books');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

app.get("/books/about", (req,res)=>{
    res.render('about');
})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});