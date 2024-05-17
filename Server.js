const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Define review schema
const reviewSchema = new mongoose.Schema({
    imdb: { type: String, unique: true },
    rating: Number,
    review: String
});

// Define review model
const Review = mongoose.model('Review', reviewSchema);

// Route for retrieving all reviews
app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for retrieving a specific review by IMDb ID
app.get('/reviews/:imdb', async (req, res) => {
    const { imdb } = req.params;
    try {
        const review = await Review.find({ imdb:imdb });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for submitting a new review
app.post('/reviews', async (req, res) => {
    const review = new Review({
        imdb: req.body.imdb,
        rating: req.body.rating,
        review: req.body.review
    });
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for updating an existing review by IMDb ID
app.put('/reviews/:imdb', async (req, res) => {
    const { imdb } = req.params;
    try {
        const updatedReview = await Review.findOneAndUpdate({ imdb }, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for deleting an existing review by IMDb ID
app.delete('/reviews/:imdb', async (req, res) => {
    const { imdb } = req.params;
    try {
        const deletedReview = await Review.findOneAndDelete({ imdb });
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
