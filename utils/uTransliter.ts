export default function (s: any, t?: any) {
    let e = <any>{
            "а": "a",
            "б": "b",
            "в": "v",
            "г": "g",
            "д": "d",
            "е": "e",
            "ё": "e",
            "ж": "j",
            "з": "z",
            "и": "i",
            "к": "k",
            "л": "l",
            "м": "m",
            "н": "n",
            "о": "o",
            "п": "p",
            "р": "r",
            "с": "s",
            "т": "t",
            "у": "u",
            "ф": "f",
            "х": "h",
            "ц": "c",
            "ч": "ch",
            "ш": "sh",
            "щ": "shch",
            "ы": "y",
            "э": "e",
            "ю": "u",
            "я": "ya",
            " ": "-"
        },
        n = <any>[];
    s = s.replace(/[ъь,]+/g, "").replace(/й/g, "i");
    for (let i = 0; i < s.length; ++i) n.push(e[s[i]] || null == e[s[i].toLowerCase()] && s[i] || e[s[i].toLowerCase()].replace(/^(.)/, (t: any) => {
        return t.toUpperCase()
    }));
    return t ? n.join("").toLowerCase() : n.join("")
}