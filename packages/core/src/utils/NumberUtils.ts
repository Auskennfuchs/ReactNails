const roundDecimal = (num: number, scale: number): number => Math.round(num * 10 ** scale) / 10 ** scale

export const NumberUtils = {
    roundDecimal,
}
