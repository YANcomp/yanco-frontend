export default function (phone: string) {
    let link = phone.replace(/\s/g, "");
    return "tel:".concat(link)
}