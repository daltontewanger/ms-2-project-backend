const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Define review schema
const reviewSchema = new mongoose.Schema({
    rating: Number,
    review: String
});

// Define review model
const Review = mongoose.model('Review', reviewSchema);

// Route for submitting a new review
app.post('/reviews', async (req, res) => {
    const review = new Review({
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
