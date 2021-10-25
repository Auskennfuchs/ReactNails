import { Color } from '../Color'

interface Palette {
    [name: string]: Color
}

const palette: Palette = {
    red: Color.RGB(255, 0, 0),
}

const backgroundColors: Palette = {
    red: palette.red,
}

const textColors: Palette = {
    white: Color.white,
}

export const baseTheme = {
    palette,
    backgroundColors,
    textColors,
}

export type BaseTheme = typeof baseTheme

export interface ThemeEntry {
    [name: string]: Color | string | number | ThemeEntry
}
