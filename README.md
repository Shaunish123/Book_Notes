# Book Notes App

## Overview
The Book Notes App is a full-stack CRUD application designed for managing book notes. Users can add, edit, view, and delete notes for their favorite books. The application is built using Node.js, Express, and EJS templates for rendering views.

## Features
- **Create**: Add new book notes with details such as title, author, rating, summary, and date read.
- **Read**: View a list of all book notes and detailed information for each book.
- **Update**: Edit existing book notes to update any information.
- **Delete**: Remove book notes that are no longer needed.

## Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript) for templating
- CSS for styling
- JavaScript for client-side interactivity

## Folder Structure
```
book-notes-app
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
├── views
│   ├── layouts
│   │   └── main.ejs
│   ├── books
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── create.ejs
│   │   ├── edit.ejs
│   │   └── delete.ejs
│   └── partials
│       ├── header.ejs
│       └── footer.ejs
├── app.js
├── package.json
└── README.md
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

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.