export default function (t: any) {
    return Number.isInteger(t) || void 0 === t ? t : t.toFixed(2)
}