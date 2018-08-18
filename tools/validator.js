export const CHECK_LIST = {
    user: [
        { property: 'username', reg: /\w+/, message: '사용자 이름을 기입해주세요.' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/, message: '올바른 암호를 기입해주세요.' },
        { property: 'farewellFor', reg: /\d+/, message: '이별 뒤 얼마나 지났나요?' }
    ],
    post: [
        { property: 'title', reg: /.+/, message: '제목을 입력해주세요.' },
        { property: 'content', reg: /^(?=.*).+$/m, message: '내용을 입력해주세요.' }
    ],
    comment: [
        { property: 'content', reg: /^(?=.*).+$/m, message: 'INVALID_CONTENT' }
    ]
};

export function checkProperty(data, service, strict) {
    let result = {};
    for (const item of CHECK_LIST[service]) {
        if (data[item.property] && item.reg.exec(data[item.property])) {
            result[item.property] = data[item.property];
        } else {
            if (!strict && !data[item.property]) continue;
            return { message: item.message, data: null };
        }
    }
    return { message: 'SUCCESS', data: result };
}
