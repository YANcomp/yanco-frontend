export default function (password: any) {
    var t = [];
    password.length < 6 && t.push("Пароль содержит менее 6 символов")
    return t
}