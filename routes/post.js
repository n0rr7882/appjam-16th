import { Router } from 'express';
import fs from 'fs-extra';

import Post from '../database/models/Post';
import { filter } from '../tools/authentication';
import { checkProperty } from '../tools/validator';

const router = Router();

function uploadHandler(image, post) {
    return fs.ensureDir(`${__dirname}/../uploads/${post._id}`).then(() => image.mv(`${__dirname}/../uploads/${post._id}/image.jpg`))
}

router.post('/', filter, async (req, res) => {
    try {
        const validated = checkProperty(req.body, 'post', true);
        if (validated.message !== 'SUCCESS') {
            throw new Error(validated.message);
        }
        validated.data.user = req.user.id;
        let post = new Post(validated.data);
        if (req.files && req.files.image) {
            await uploadHandler(req.files.image, post);
        }
        post = await Post.findById((await post.save())._id).populate('user');
        const extendedUser = { ...post.user._doc, dday: post.user.dday, rank: post.user.rank };
        post = { ...post._doc, user: extendedUser };
        return res.send({ success: true, message: 'SUCCESS', post });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.get('/mine', filter, async (req, res) => {
    try {
        let posts = await Post.find({ user: req.user.id }).sort('-createdAt').populate('user');
        posts = posts.map(post => {
            const extendedUser = { ...post.user._doc, dday: post.user.dday, rank: post.user.rank };
            return { ...post._doc, user: extendedUser };
        });
        return res.send({ success: true, message: 'SUCCESS', posts });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.get('/:id', filter, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id).populate('user');
        if (!post) {
            throw new Error('존재하지 않는 게시글입니다.');
        }
        const extendedUser = { ...post.user._doc, dday: post.user.dday, rank: post.user.rank };
        post = { ...post._doc, user: extendedUser };
        return res.send({ success: true, message: 'SUCCESS', post });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.get('/', filter, async (req, res) => {
    try {
        let posts = await Post.find().sort('-createdAt').populate('user');
        posts = posts.map(post => {
            const extendedUser = { ...post.user._doc, dday: post.user.dday, rank: post.user.rank };
            return { ...post._doc, user: extendedUser };
        });
        return res.send({ success: true, message: 'SUCCESS', posts });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
});

export default router;
