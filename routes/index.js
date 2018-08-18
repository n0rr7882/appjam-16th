import { Router } from 'express';

import user from './user';
import sign from './sign';
import post from './post';
import comment from './comment';
import like from './like';

import errorHandler from './error';

const router = Router();

router.use('/sign', sign);
router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);
router.use('/likes', like);

router.use(errorHandler);

export default router;