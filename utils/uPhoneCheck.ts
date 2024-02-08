export default function (phone: any) {
    return !isNaN(phone) && phone >= 79e9 && phone <= 79999999999
}