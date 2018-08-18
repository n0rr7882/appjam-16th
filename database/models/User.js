import mongoose, { Schema } from 'mongoose';
import { password } from '../../tools/password';

const moment = require('moment');

const user = new Schema({
    userid: { type: String, required: true, index: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    ddate: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

user.virtual('dday').get(function () {
    return moment.duration(moment().diff(moment(this.ddate), 'days')) + 0;
});

user.virtual('rank').get(function () {
    const dday = moment.duration(moment().diff(moment(this.ddate), 'days')) + 0;
    let rank = '';
    if (dday < 7) rank = '인턴';
    else if (dday < 15) rank = '신입';
    else if (dday < 30) rank = '대리';
    else if (dday < 100) rank = '과장';
    else if (dday < 182) rank = '부장';
    else if (dday < 365) rank = '이사';
    else if (dday < 500) rank = '건물주';
    else if (dday < 750) rank = '마법사';
    else if (dday < 1000) rank = '타노스';
    else rank = '타노스 마스터';
    return rank;
});

function encryptPassword(next) {
    if (!this.isModified('password')) return next();
    this.password = password(this.password);
    return next();
}

function removePassword(next) {
    this.select('-password -__v');
    return next();
}

user.pre('save', encryptPassword);
user.pre('update', encryptPassword);
user.pre('find', removePassword);
user.pre('findOne', removePassword);
user.pre('findById', removePassword);

user.statics.login = function (userid, plainPassword) {
    return this.findOne({ userid, password: password(plainPassword) });
}

export default mongoose.model('user', user);
