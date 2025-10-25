const dictMonth = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export function date2Str(date) {
    const monthStr = dictMonth[date.getMonth()]
    const dayStr = String(date.getDate())
    const yearStr = String(date.getFullYear())
    return `${monthStr} ${dayStr}, ${yearStr}`
}

export function str2Date(str) {
    return str ? new Date(str) : null
}

export function prettyfyDateStr(dateStr) {
    if (!dateStr) return null
    const s = dateStr.split(/[-T:]/)
    return `${dictMonth[s[1] - 1]} ${s[2]}, ${s[0]}`
}