# Musify UML Model Documentation

## Overview
The Musify UML Model represents the structure of a music management system designed to facilitate the interaction between users, administrators, DJs, playlists, songs, artists, and albums. It depicts the various entities involved in the system, their attributes, and the relationships between them.

## Entities

### User
- **Attributes:** `id`, `first name`, `last name`, `username`, `email`, `date of birth (DOB)`, `role`, `playlists`.
- **Relationships:** Can manage playlists and search for songs.

### Admin
- **Attributes:** Inherits User attributes and includes an admin-specific `role`.
- **Responsibilities:** Can manage user profiles.

### DJ
- **Attributes:** Inherits User attributes.
- **Responsibilities:** Can create and manage songs.

### Playlist
- **Attributes:** `User id` (owner), `playlist id`, `name`, `description`, and a collection of `songs`.
- **Functionality:** Allows users to create, update and delete playlist.

### Songs
- **Attributes:** `Song id`, `song name`, `artist id`, `album id`, `release year`, and `genre`.
- **Relationships:** Belong to albums and can be added to playlists.

### Artists
- **Attributes:** `Artist id`, `artist name`, `debut year`, and a list of `albums released`.
- **Functionality:** Represent musical artists/bands with their career information.

### Albums
- **Attributes:** `Album id`, `album name`, `release year`, `duration`, and a collection of `songs`.
- **Functionality:** Represent a collection of songs released together as an album.

## Functionality
- **User to Songs (Search):** Allows users to search for songs.
- **User to Playlist (Manage):** Allows users to create and manage their playlists.
- **DJ to Songs (Create):** Allows DJs to create new songs.

## Diagram Overview
The diagram illustrates one-to-many and one-to-one relationships, with users being able to manage multiple playlists, which in turn can contain multiple songs. Each song is associated with one artist and one album, while artists can have multiple albums.

![Musify uml model](/UML%20model.png) 

## Usage
This model is intended for developers to understand the structure of the Musify music management system and serves as a guide for database schema creation, API development, and UI design.


