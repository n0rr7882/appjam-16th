import { Router } from 'express';
import { filter } from '../tools/authentication';
import Post from '../database/models/Post';

const router = Router();

router.post('/:id', filter, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
            await post.save();
        }
        return res.send({ success: true, message: 'SUCCESS' });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.delete('/:id', filter, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        post.likes.pull(req.user.id);
        await post.save();
        return res.send({ message: 'SUCCESS' });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ success: false, message: err.message });
    }
});

export default router;