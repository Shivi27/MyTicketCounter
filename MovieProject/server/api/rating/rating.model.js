'use strict';

import mongoose from 'mongoose';

var RatingSchema = new mongoose.Schema({
  	myMovie: String,
    name: String,
    email: String,
    myRating: String
});

export default mongoose.model('Rating', RatingSchema);
