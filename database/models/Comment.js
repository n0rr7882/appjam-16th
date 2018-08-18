import mongoose, { Schema } from 'mongoose';

const comment = new Schema({
    post: { type: Schema.Types.ObjectId, required: true, ref: 'post' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    content: { type: String, required: true }
}, { timestamps: true });


function removeV(next) {
    this.select('-__v');
    return next();
}

comment.pre('find', removeV);
comment.pre('findOne', removeV);
comment.pre('findById', removeV)

export default mongoose.model('comment', comment);
