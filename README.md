# Sticky Notes Django App

This project is a simple sticky notes application built using the Django web framework in Python. It allows users to create, store, and search through their notes. The notes are stored locally in a PostgreSQL (PSQL) database, and the web interface provides an easy-to-use experience for adding and searching notes.

## Features

- **Create Sticky Notes**: Users can add new sticky notes directly on the homepage of the web app.
- **Search Notes**: Easily search through existing notes using the search bar on the homepage.
- **Persistent Storage**: All notes are stored in a local PostgreSQL database, allowing users to access their notes anytime they visit the site.

## How It Works

1. **Homepage**: Users can create a new sticky note by filling out the note form and submitting it. All existing notes will appear on the homepage in a sticky note format.
   
2. **Search**: Users can search through their stored notes using the search bar on the homepage. The app will return notes that match the search query.

3. **Database**: Notes are stored in a PostgreSQL database, ensuring that the data is persistent and accessible across sessions.

### Requirements

- **Python 3.x**
- **Django 3.x or later**
- **PostgreSQL**: For storing sticky note data.

### Limitations
- **Local Storage Only:** The app is currently limited to running locally on a single machine.
- **Basic Search:** The search function only supports basic keyword matching. Advanced search functionality (e.g., filtering by date) may be added in future updates.

### Future
- To allow a weekly email to be sent of the all the notes heading to allow me to keep track of them. 

**Note** This project was designed for my own use, to allow further developement of django. It hasn't been updated for others to use, but are welcome to use :)
