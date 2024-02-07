export default function (phone: any) {
    let phoneString = "".concat(phone ? phone : ""),
        regex = phoneString.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
    return null !== regex ? "+".concat(regex[1], " (").concat(regex[2], ") ").concat(regex[3], "-").concat(regex[4], "-").concat(regex[5]) : phoneString
}