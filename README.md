# 📚 BookStore Manager

A simple BookStore Management System built with **Node.js**, **Express.js**, **EJS**, and **Multer**.  
No database required — books are stored in memory (array).  
Supports book cover image upload using Multer.

---

## 🚀 How to Run

### Step 1 — Install Node.js
Download from 👉 https://nodejs.org and install the LTS version.

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Start the Server
```bash
node app.js
```

### Step 4 — Open in Browser
```
http://localhost:9000
```

---

## ✨ Features

- 📋 Dashboard with total, available, out of stock, and genre count cards
- ➕ Add new books with title, author, genre, price, and cover image
- ✏️ Edit existing book details and status
- 🗑️ Delete books (also removes uploaded image from server)
- 🔄 Toggle book status — Available ↔ Out of Stock
- 🖼️ Book cover image upload using Multer
- 👁️ Live image preview before submitting form
- 📖 Fallback emoji shown if no image uploaded

---

## 📁 Project Structure

```
BookStore/
│
├── views/
│   ├── header.ejs          → Navbar + HTML head (shared)
│   ├── footer.ejs          → Footer + scripts (shared)
│   ├── dashboard.ejs       → Home page with stats + book table
│   ├── add-book.ejs        → Add new book form
│   └── edit-book.ejs       → Edit existing book form
│
├── public/
│   ├── css/
│   │   └── style.css       → Custom styles
│   └── uploads/            → Book cover images stored here
│
├── app.js                  → Main server (routes + multer + logic)
├── package.json            → Project info and dependencies
└── README.md               → Project documentation
```

---

## 📦 Dependencies

| Package   | Purpose                        |
|-----------|--------------------------------|
| express   | Web framework for Node.js      |
| ejs       | HTML templating engine         |
| multer    | File/image upload handling     |

Install all at once:
```bash
npm install express ejs multer
```

---

## 📌 Book Object Structure

```javascript
{
  id: 1,
  title: "The Alchemist",
  author: "Paulo Coelho",
  genre: "Fiction",
  price: 299,
  status: "Available",   // Available | Out of Stock
  image: "/uploads/filename.jpg"  // null if no image uploaded
}
```

---

## 🖼️ Image Upload Details

- Handled by **Multer**
- Images saved inside `public/uploads/` folder
- Accepted formats: JPG, JPEG, PNG, WEBP
- Old image is automatically deleted when a new one is uploaded
- If no image is uploaded, a 📖 emoji placeholder is shown

---

## 🔄 Status Flow

```
Available  ⟷  Out of Stock
```
Click the 🔄 button on any book row to toggle status.

---

## 🛠️ Tech Stack

| Technology  | Use                  |
|-------------|----------------------|
| Node.js     | Backend runtime      |
| Express.js  | Server and routing   |
| EJS         | HTML template engine |
| Multer      | Image file upload    |
| Bootstrap 5 | UI styling           |

---

## ⚠️ Common Errors and Fixes

| Error | Fix |
|-------|-----|
| `Cannot find module 'express'` | Run `npm install` |
| `EADDRINUSE: port 9000` | Another app using port 9000 — change `PORT` in `app.js` |
| Image not showing | Make sure `public/uploads/` folder exists |
| `node is not recognized` | Install Node.js from nodejs.org |

---

## 👨‍💻 Author

**Your Name**  
GitHub: [@your-username](https://github.com/devanshimarvania)

---
<img width="1920" height="1080" alt="Screenshot 2026-05-04 081549" src="https://github.com/user-attachments/assets/40716308-c413-46dc-a360-cd80dfe5a880" />
<img width="1920" height="1032" alt="Screenshot 2026-05-04 081606" src="https://github.com/user-attachments/assets/3c7a2f16-defa-4825-bb38-ec742d361a3f" />
<img width="1920" height="1032" alt="Screenshot 2026-05-04 081639" src="https://github.com/user-attachments/assets/8ef28537-b637-4bf5-82a5-a8117fba12d6" />
<img width="1920" height="1080" alt="Screenshot 2026-05-04 082140" src="https://github.com/user-attachments/assets/9a996a6b-3d30-4837-8513-78e2d4324e90" />
<img width="1920" height="1080" alt="Screenshot 2026-05-04 082208" src="https://github.com/user-attachments/assets/3e828062-6458-4438-8ef7-388826504015" />
<img width="1920" height="1080" alt="Screenshot 2026-05-04 082228" src="https://github.com/user-attachments/assets/a66b4dc5-0c43-4d1e-bf5f-b35084f8c069" />
<img width="1920" height="1080" alt="Screenshot 2026-05-04 082240" src="https://github.com/user-attachments/assets/1f97d889-4c2d-40f9-a4f5-ce7d4181ba43" />
<img width="1920" height="1080" alt="Screenshot 2026-05-04 082250" src="https://github.com/user-attachments/assets/43880bcd-d714-4851-9c52-427d5e21bbb9" />
<img width="1920" height="1080" alt="Screenshot 2026-05-04 082917" src="https://github.com/user-attachments/assets/38436389-48fa-4b64-8cfa-44bf69108230" />
