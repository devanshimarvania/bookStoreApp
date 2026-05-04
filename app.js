const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const app = express();

// Auto-create uploads folder if missing
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, uploadsDir); },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
      return cb(null, true);
    }
    cb(null, false);
  }
});

function uploadSafe(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (err) req.uploadError = err.message;
    next();
  });
}

let books  = [];
let nextId = 1;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploads explicitly
app.use('/uploads', express.static(uploadsDir));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dashboard
app.get('/', (req, res) => {
  const total     = books.length;
  const available = books.filter(b => b.status === 'Available').length;
  const outStock  = books.filter(b => b.status === 'Out of Stock').length;
  const genres    = [...new Set(books.map(b => b.genre))].length;
  res.render('dashboard', { books, total, available, outStock, genres, message: req.query.message || null });
});

app.get('/add', (req, res) => res.render('add-book', { error: null }));

app.post('/add', uploadSafe, (req, res) => {
  const title  = (req.body.title  || '').trim();
  const author = (req.body.author || '').trim();
  const genre  = req.body.genre  || 'Other';
  const price  = parseFloat(req.body.price) || 0;
  if (!title)  return res.render('add-book', { error: 'Book title is required.' });
  if (!author) return res.render('add-book', { error: 'Author name is required.' });
  const image = req.file ? '/uploads/' + req.file.filename : null;
  books.push({ id: nextId++, title, author, genre, price, status: 'Available', image });
  res.redirect('/?message=Book added successfully!');
});

app.get('/edit/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.redirect('/');
  res.render('edit-book', { book, error: null });
});

app.post('/edit/:id', uploadSafe, (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.redirect('/');
  const title  = (req.body.title  || '').trim();
  const author = (req.body.author || '').trim();
  const genre  = req.body.genre  || books[idx].genre;
  const price  = parseFloat(req.body.price) || 0;
  const status = req.body.status || books[idx].status;
  if (!title)  return res.render('edit-book', { book: books[idx], error: 'Book title is required.' });
  if (!author) return res.render('edit-book', { book: books[idx], error: 'Author name is required.' });
  if (req.file && books[idx].image) {
    const oldPath = path.join(__dirname, 'public', books[idx].image);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }
  const image = req.file ? '/uploads/' + req.file.filename : books[idx].image;
  books[idx] = { ...books[idx], title, author, genre, price, status, image };
  res.redirect('/?message=Book updated successfully!');
});

app.post('/delete/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book && book.image) {
    const imgPath = path.join(__dirname, 'public', book.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.redirect('/?message=Book deleted successfully!');
});

app.post('/status/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) book.status = book.status === 'Available' ? 'Out of Stock' : 'Available';
  res.redirect('/');
});

const PORT = 9000;
app.listen(PORT, () => console.log(`BookStore running at http://localhost:${PORT}`));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookstoreApp')
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;