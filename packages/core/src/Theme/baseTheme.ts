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
    error: palette.red,
}

const textColors: Palette = {
    white: Color.white,
}

const base = {
    gap: 4,
    gapUnit: 'px',
}

enum FontWeight {
    medium = 500,
    semibold = 600,
    bold = 700,
}

export type TextSizeType = {
    fontSize: number
    fontWeight: number | FontWeight
    textTransform?: 'uppercase' | 'lowercase'
    lineHeight: number
    unit: 'px' | 'em' | 'rem'
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

const textSizes: Record<number, TextSizeType> = {
    900: {
        fontSize: 35,
        fontWeight: FontWeight.medium,
        lineHeight: 40,
        unit: 'px',
    },
    800: {
        fontSize: 29,
        fontWeight: FontWeight.semibold,
        lineHeight: 32,
        unit: 'px',
    },
    700: {
        fontSize: 24,
        fontWeight: FontWeight.medium,
        lineHeight: 28,
        unit: 'px',
    },
    600: {
        fontSize: 20,
        fontWeight: FontWeight.medium,
        lineHeight: 24,
        unit: 'px',
    },
    500: {
        fontSize: 16,
        fontWeight: FontWeight.semibold,
        lineHeight: 20,
        unit: 'px',
    },
    400: {
        fontSize: 14,
        fontWeight: FontWeight.semibold,
        lineHeight: 16,
        unit: 'px',
    },
    300: {
        fontSize: 12,
        fontWeight: FontWeight.semibold,
        lineHeight: 16,
        textTransform: 'uppercase',
        unit: 'px',
    },
    200: {
        fontSize: 12,
        fontWeight: FontWeight.semibold,
        lineHeight: 16,
        unit: 'px',
    },
    100: {
        fontSize: 11,
        fontWeight: FontWeight.bold,
        lineHeight: 16,
        unit: 'px',
    },
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
    textSizes,

    spacing(space: SpacingType | number | Array<SpacingType | number>): string {
        const resolveSpace = (sp: SpacingType | number) => {
            if (typeof sp === 'number') {
                return `${(sp as number) * this.base.gap}${this.base.gapUnit}`
            }
            return `${this.spaces[sp] * this.base.gap}${this.base.gapUnit}`
        }

        if (Array.isArray(space)) {
            return space.map(resolveSpace).join(' ')
        }
        return resolveSpace(space)
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
