import { Color } from '../Color'

interface Palette {
    [name: string]: Color
}

interface BaseTheme extends ThemeEntry {
    palette: Palette
    backgroundColors: Palette
    textColors: Palette
}

const palette: Palette = {
    red: Color.RGB(255, 0, 0),
}

const backgroundColors: Palette = {
    red: palette.red,
}

export const baseTheme: BaseTheme = {
    palette,
    backgroundColors,
    textColors: {},
}

export interface ThemeEntry {
    [name: string]: Color | string | number | ThemeEntry
}
