import { Router } from 'express';
import Post from '../database/models/Post';
import Comment from '../database/models/Comment';
import { checkProperty } from '../tools/validator';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/:id', filter, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        const validated = checkProperty(req.body, 'comment', true);
        if (validated.message !== 'SUCCESS') {
            throw new Error(validated.message);
        }
        validated.data.post = post._id;
        validated.data.user = req.user.id;
        let comment = await Comment.findById((await Comment.create(validated.data))._id).populate('user');
        post.comments.push(comment._id);
        await post.save();
        const extendedUser = { ...comment.user._doc, dday: comment.user.dday, rank: comment.user.rank };
        comment = { ...comment._doc, user: extendedUser };
        return res.send({ success: true, message: 'SUCCESS', comment });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.get('/:id', filter, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        let comments = await Comment.find({ post: post._id }).populate('user').sort('-createdAt');
        comments = comments.map(comment => {
            const extendedUser = { ...comment.user._doc, dday: comment.user.dday, rank: comment.user.rank };
            return { ...comment._doc, user: extendedUser };
        });
        return res.send({ success: true, message: 'SUCCESS', comments });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ success: false, message: err.message });
    }
});

export default router;