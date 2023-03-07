import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    role: {
        type: String,
        enum: ['normal', 'admin'],
        default: 'normal'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users',
});

export default userSchema;
