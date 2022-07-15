export function getInArray(param) {
    return param.length === 1 && Array.isArray(param[0]) ? param[0] : param;
}