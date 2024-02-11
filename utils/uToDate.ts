export default function (date: any) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -108e5,
        e = Date.parse(date);
    return isNaN(e) ? void 0 : new Date(e + t)
}