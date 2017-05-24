'use strict';

import mongoose from 'mongoose';

var SeatSchema = new mongoose.Schema({
	shivCity: String,
    shivLocation: String,
    shivName: String,
    movieTitle: String,
    shivDate: String,
    shivTime: String,
    userName: String,
    emailId: String
});

export default mongoose.model('Seat', SeatSchema);
