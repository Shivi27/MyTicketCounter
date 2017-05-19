'use strict';

import mongoose from 'mongoose';

var MovieSchema = new mongoose.Schema({
  	Poster: String,
    Title: String,
    Year: String,
    Genre: String

});

export default mongoose.model('Movie', MovieSchema);
