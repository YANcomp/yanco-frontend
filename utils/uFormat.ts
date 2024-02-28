export default function (t: any, n?: any) {
    let e,
        o = "0".concat(t.getDate()).substr(-2),
        r = "".concat(t.getDate())

    n = n ? n : "d.m.Y"
    e = "".concat(t.getFullYear());
    let c = "".concat(t.getDay()),
        l = Q[t.getMonth()][0],
        d = Q[t.getMonth()][1],
        h = "0".concat(t.getMonth() + 1).substr(-2),
        m = "".concat(t.getMonth() + 1),
        f = e.substr(-2),
        v = "0".concat(t.getHours()).substr(-2),
        V = "".concat(t.getHours()),
        i = "0".concat(t.getMinutes()).substr(-2),
        s = "0".concat(t.getSeconds()).substr(-2),
        y = Y[t.getDay()];
    return n.replace("d", o).replace("j", r).replace("w", c).replace("FG", d).replace("F", l).replace("m", h).replace("n", m).replace("Y", e).replace("y", f).replace("H", v).replace("G", V).replace("i", i).replace("s", s).replace("ND", y).trim()
}

let Q = [
        ["январь", "января"],
        ["февраль", "февраля"],
        ["март", "марта"],
        ["апрель", "апреля"],
        ["май", "мая"],
        ["июнь", "июня"],
        ["июль", "июля"],
        ["август", "августа"],
        ["сентябрь", "сентября"],
        ["октябрь", "октября"],
        ["ноябрь", "ноября"],
        ["декабрь", "декабря"]
    ],
    Y = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]