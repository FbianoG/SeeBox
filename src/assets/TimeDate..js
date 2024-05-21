export default function TimeDate() {
    const date = new Date();
    const date2 = date.getTimezoneOffset() * 60000
    return new Date(date.getTime() - date2).toISOString()
}