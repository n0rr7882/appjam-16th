export const CHECK_LIST = {
    user: [
        { property: 'userid', reg: /^(?=.*)[a-zA-Z0-9]{6,20}$/, message: 'ID는 6자이상, 영문자, 숫자(선택)로 이루어져야 합니다.' },
        { property: 'username', reg: /\w+/, message: '사용자 이름을 기입해주세요.' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/, message: '8자 이상의 영문, 숫자로 이루어진 암호를 기입해주세요.' },
        { property: 'farewellFor', reg: /\d+/, message: '이별으로부터 얼마나 지났나요?' }
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
