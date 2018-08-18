import { Router } from 'express';
import fs from 'fs-extra';

import User from '../database/models/User';
import { checkProperty } from '../tools/validator';

const router = Router();

function uploadHandler(thumbnail, user) {
    return fs.ensureDir(`${__dirname}/../uploads/${user._id}`).then(() => thumbnail.mv(`${__dirname}/../uploads/${user._id}/thumbnail.jpg`))
}

router.post('/', async (req, res) => {
    try {
        if ((await User.findOne({ userid: req.body.userid }))) {
            throw new Error('이미 등록된 ID입니다.');
        }
        const validated = checkProperty(req.body, 'user', true);
        if (validated.message !== 'SUCCESS') {
            throw new Error(validated.message);
        }
        if (!(req.files && req.files.thumbnail)) {
            throw new Error('프로필 이미지를 등록해주세요.');
        }
        let user = new User(validated.data);
        await uploadHandler(req.files.thumbnail, user);
        await user.save();

        user = { ...user._doc, dday: user.dday, rank: user.rank };
        return res.send({ success: true, message: 'SUCCESS', user });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('존재하지 않는 계정입니다.');
        }
        user = { ...user._doc, dday: user.dday, rank: user.rank };
        return res.send({ success: true, message: 'SUCCESS', user });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
});

export default router;