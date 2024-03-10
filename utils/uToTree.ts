export default function t(e: any, n?: any) {
    let o = e.filter((a: any) => {
        return a.parentID === n
    });
    return o.length ? o.map((n: any) => {
        return {
            ...n,
            children: t(e, n.ID)
        }
    }) : []
}