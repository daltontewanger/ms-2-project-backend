# JEDCV Movie Reviews API

This is a RESTful API built with Node.js and Express.js to manage movie reviews. It provides endpoints for retrieving, creating, updating, and deleting movie reviews.

## Functionality

- **Middleware**: Utilizes CORS middleware to allow requests from specified origins.
- **MongoDB Connection**: Connects to a MongoDB database using Mongoose.
- **Endpoints**:
  - `GET /reviews`: Retrieves all movie reviews.
  - `GET /reviews/:imdb`: Retrieves all movie reviews for a specific IMDb ID.
  - `GET /reviews/:imdb/:id`: Retrieves a specific review by its ID.
  - `POST /reviews`: Submits a new movie review.
  - `PUT /reviews/:id`: Updates an existing movie review by its ID.
  - `DELETE /reviews/:id`: Deletes an existing movie review by its ID.

## Prerequisites

Before running the server, ensure you have:

- Node.js installed.
- MongoDB installed and running.
- Set up a `.env` file with the following variables:
  - `PORT`: Port number for the server.
  - `MONGO_URI`: MongoDB connection URI.

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and set the `PORT` and `MONGO_URI` variables.
4. Run the server using `npm start`.


## Collaborators / Site Owners & Creators
```jsx
import React from 'react';

const Collaborators = () => {
  const collaborators = [
    "Courtney Rudd",
    "Jacob Bunnell",
    "Emily Ochoa",
    "Victor Estrada",
    "Dalton Tewanger"
  ];

  return (
    <div>
      <h2>Collaborators</h2>
      <ul>
        {collaborators.map((collaborator, index) => (
          <li key={index}>{collaborator}</li>
        ))}
      </ul>
    </div>
  );
}

export default Collaborators;
