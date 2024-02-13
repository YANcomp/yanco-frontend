let r = "80",
    c = "208",
    l = "390",
    d = "800",
    o = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1MS4wMDAwMDAsIC01ODcuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNS4wMDAwMDAsIDExOS4wMDAwMDApIiAvPgogICAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgICAgZD0iTTI2OC4yLDU5MyBMMjcyLDU5MyBDMjcyLDU5MyAyNzQsNTkzIDI3NCw1OTUgTDI3NCw2MDUgQzI3NCw2MDcgMjcyLDYwNyAyNzIsNjA3IEwyNTQsNjA3IEMyNTQsNjA3IDI1Miw2MDcgMjUyLDYwNSBMMjUyLDU5NSBDMjUyLDU5MyAyNTQsNTkzIDI1NCw1OTMgTDI1Ny44LDU5MyBMMjU4LjczODcyLDU5MS40MzU0NjcgQzI1OC44ODIyOTgsNTkxLjE5NjE3MSAyNTkuMjI0MDUzLDU5MSAyNTkuNTAwNDM2LDU5MSBMMjY2LjQ5OTU2NCw1OTEgQzI2Ni43NjkyMDMsNTkxIDI2Ny4xMTY5NzksNTkxLjE5NDk2NSAyNjcuMjYxMjgsNTkxLjQzNTQ2NyBMMjY4LjIsNTkzIEwyNjguMiw1OTMgWiBNMjYzLDYwNCBDMjY1LjQ4NTI4MSw2MDQgMjY3LjUsNjAxLjk4NTI4MSAyNjcuNSw1OTkuNSBDMjY3LjUsNTk3LjAxNDcxOSAyNjUuNDg1MjgxLDU5NSAyNjMsNTk1IEMyNjAuNTE0NzE5LDU5NSAyNTguNSw1OTcuMDE0NzE5IDI1OC41LDU5OS41IEMyNTguNSw2MDEuOTg1MjgxIDI2MC41MTQ3MTksNjA0IDI2Myw2MDQgWiBNMjYzLDYwMyBDMjY0LjkzMjk5Nyw2MDMgMjY2LjUsNjAxLjQzMjk5NyAyNjYuNSw1OTkuNSBDMjY2LjUsNTk3LjU2NzAwMyAyNjQuOTMyOTk3LDU5NiAyNjMsNTk2IEMyNjEuMDY3MDAzLDU5NiAyNTkuNSw1OTcuNTY3MDAzIDI1OS41LDU5OS41IEMyNTkuNSw2MDEuNDMyOTk3IDI2MS4wNjcwMDMsNjAzIDI2Myw2MDMgWiBNMjY5LDU5NyBDMjY5LjU1MjI4NSw1OTcgMjcwLDU5Ni41NTIyODUgMjcwLDU5NiBDMjcwLDU5NS40NDc3MTUgMjY5LjU1MjI4NSw1OTUgMjY5LDU5NSBDMjY4LjQ0NzcxNSw1OTUgMjY4LDU5NS40NDc3MTUgMjY4LDU5NiBDMjY4LDU5Ni41NTIyODUgMjY4LjQ0NzcxNSw1OTcgMjY5LDU5NyBaIE0yNTUuMjIxNjc3LDU5MS41IEMyNTUuMDk5MjQ4LDU5MS41IDI1NSw1OTEuNTg4NzQzIDI1NSw1OTEuNjk5OTYxIEwyNTUsNTkyLjMwMDAzOSBDMjU1LDU5Mi40MTA0NzQgMjU1LjA5OTE4LDU5Mi41IDI1NS4yMjE2NzcsNTkyLjUgTDI1Ni43NzgzMjMsNTkyLjUgQzI1Ni45MDA3NTIsNTkyLjUgMjU3LDU5Mi40MTEyNTcgMjU3LDU5Mi4zMDAwMzkgTDI1Nyw1OTEuNjk5OTYxIEMyNTcsNTkxLjU4OTUyNiAyNTYuOTAwODIsNTkxLjUgMjU2Ljc3ODMyMyw1OTEuNSBMMjU1LjIyMTY3Nyw1OTEuNSBaIgogICAgICAgICAgICAgICAgZmlsbD0iI2U2ZTZlNiIgLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="

export default function (product: any, t: any, e: any) {
    let v = product.images && product.images.length > 0 ? product.images.map((n: any) => {
        return "" + e + "/products/" + (product.productID !== undefined ? product.productID : product.ID) + "/" + t + "/" + n
    }) : []

    let V = []
    switch (t) {
        case r:
            V = product.imagesSizeXS !== undefined ? product.imagesSizeXS : v;
            break;
        case c:
            V = product.imagesSizeS !== undefined ? product.imagesSizeS : v;
            break;
        case l:
            V = product.imagesSizeM !== undefined ? product.imagesSizeM : v;
            break;
        case d:
            V = product.imagesSizeL !== undefined ? product.imagesSizeL : v;
            break;
        default:
            V = v
    }

    let y = product;
    product.images = V.length > 0 ? V : [o]
    return y
}

export const SIZE_XS = r
export const SIZE_S = c
export const SIZE_M = l
export const SIZE_L = d