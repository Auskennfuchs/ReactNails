import { Color } from '../Color'

interface Palette {
    [name: string]: Color
}

interface Colors {
    [name: string]: Palette
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

const base = {
    gap: 4,
    gapUnit: 'px',
}

export enum SpacingType {
    none = 'none',
    xs = 'xs',
    s = 's',
    m = 'm',
    l = 'l',
    xl = 'xl',
    xxl = 'xxl',
}

export const baseTheme = {
    base,
    spaces: {
        none: 0,
        xs: 1,
        s: 2,
        m: 4,
        l: 10,
        xl: 15,
        xxl: 20,
    } as { [name in SpacingType]: number },
    colors: {
        palette,
        backgroundColors,
        textColors,
    } as Colors,
    spacing(space: SpacingType | number): string {
        if (typeof space === 'number') {
            return `${(space as number) * this.base.gap}${this.base.gapUnit}`
        }
        return `${this.spaces[space] * this.base.gap}${this.base.gapUnit}`
    },
    color(color: Color | string): string {
        if (color instanceof Color) {
            return color.rgb
        }
        if (typeof color === 'string') {
            const parts = color.split('.')
            const pal = this.colors[parts[0]]
            if (pal) {
                return pal[parts[1]]?.rgb || Color.magenta.rgb
            }
        }
        return Color.magenta.rgb
    },
}

export type BaseTheme = typeof baseTheme

export type StyledTheme<T extends ThemeEntry | undefined> = {
    theme: BaseTheme & T
}

export type StyledBaseTheme = StyledTheme<{}>

export interface ThemeEntry {
    [name: string]: Color | string | number | ThemeEntry
}
