import mongoose, { Schema } from 'mongoose';

const post = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, required: true, ref: 'user' }],
    comments: [{ type: Schema.Types.ObjectId, required: true, ref: 'comment' }],
    image: String
}, { timestamps: true });

function removeV(next) {
    this.select('-__v');
    return next();
}

function updateImage(next) {
    this.thumbnail = `/uploads/${this._id}/image.jpg`;
    return next();
}

post.pre('save', updateImage);
post.pre('find', removeV);
post.pre('findOne', removeV);
post.pre('findById', removeV);

export default mongoose.model('post', post);
