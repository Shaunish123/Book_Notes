# Book Notes App

## Overview
The Book Notes App is a full-stack CRUD application designed for managing your reading collection and notes. Users can add, edit, view, and delete notes for their favorite books. The application fetches book covers and metadata from OpenLibrary API to provide a rich visual experience.

## Features
- **Create**: Add new book notes with details such as title, author, rating, review, and date read.
- **Read**: View a list of all book notes with book covers from OpenLibrary.
- **Update**: Edit existing book notes to update any information.
- **Delete**: Remove book notes that are no longer needed.
- **Star Rating System**: Interactive 5-star rating system for books.
- **Book Covers**: Automatic fetching of book covers using OpenLibrary's API.
- **Responsive Design**: Mobile-friendly interface that works on various screen sizes.
- **Enhanced UI**: Visual hover effects on clickable elements for better user experience.
- **Auto-scroll**: Automatically scrolls to newly added books for a better user experience.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS (Embedded JavaScript) for templating, CSS, JavaScript
- **API Integration**: OpenLibrary API for book metadata and covers
- **Other**: Axios for HTTP requests, Method-override for RESTful routes

## Project Structure
```
book-notes-app
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   └── images
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── books.ejs
│   ├── add-book.ejs
│   ├── edit-book.ejs
│   └── about.ejs
├── app.js
├── package.json
├── README.md
├── .gitignore
└── .envmock
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd book-notes-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a PostgreSQL database for the application.
5. Create a `.env` file based on `.envmock` with your database credentials:
   ```
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=3000
   ```

## Database Setup
Create a `books` table in your PostgreSQL database:
```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT,
    date_read DATE,
    olid VARCHAR(255)
);
```

## Usage
1. Start the server:
   ```
   npm start
   ```
   Or for development with auto-reload:
   ```
   npm run dev
   ```
2. Open your browser and go to `http://localhost:3000` to access the application.

## Features in Detail

### Book Cover Integration
The app uses the OpenLibrary API to fetch book covers based on the title and author. If a match is found, the book's cover is displayed; otherwise, a placeholder image is shown.

### Star Rating System
An interactive 5-star rating system allows users to rate books on a scale of 1 to 5. The UI updates dynamically as users interact with the stars.

### Responsive Design
The application is fully responsive and provides an optimal viewing experience across a wide range of devices.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.

## Acknowledgements
- [OpenLibrary API](https://openlibrary.org/developers/api) for providing book metadata and cover images
- [Font Awesome](https://fontawesome.com/) for the icons used throughout the application