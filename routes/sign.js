import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../database/models/User';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/', async (req, res) => {
    try {
        let user = (await User.login(req.body.userid, req.body.password));
        if (!user) {
            throw new Error('ID 혹은 암호가 일치하지 않습니다.');
        }
        const token = sign({ id: user._id }, constants.JWT_SALT);
        user = { ...user._doc, dday: user.dday, rank: user.rank };
        return res.send({ success: true, message: 'SUCCESS', token, user });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.get('/', filter, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        user = { ...user._doc, dday: user.dday, rank: user.rank };
        return res.send({ success: true, message: 'SUCCESS', user });
    } catch ({ message }) {
        console.error(err);
        return res.status(400).send({ success: false, message: err.message });
    }
});


export default router;