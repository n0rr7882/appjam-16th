import mongoose, { Schema } from 'mongoose';

const post = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, required: true, ref: 'user' }],
    comments: [{ type: Schema.Types.ObjectId, required: true, ref: 'comment' }],
}, { timestamps: true });

function removeV(next) {
    this.select('-__v');
    return next();
}

post.pre('find', removeV);
post.pre('findOne', removeV);
post.pre('findById', removeV);

export default mongoose.model('post', post);
