import { Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    password: String
}, {
    collection: 'users',
});

export default userSchema;
