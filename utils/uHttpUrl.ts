export default function (s: any) {
    var t;
    try {
        t = new URL(s)
    } catch (t) {
        return !1
    }
    return ["http:", "https:"].includes(t.protocol)
}