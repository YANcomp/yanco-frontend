export default function (e: any, n?: any) {
    let o = e.filter((a: any) => {
        return a.parentID === n
    });
    return o.length ? o.map((b: any) => {
        return {
            ...b,
            children: uToTree(e, b.ID)
        }
    }) : []
}