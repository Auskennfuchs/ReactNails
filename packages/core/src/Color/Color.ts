import { NumberUtils } from '../utils/NumberUtils'

export type WcagPassResult = {
    contrast: number
    passAAALarge: boolean
    passAAA: boolean
    passAA: boolean
    passAALarge: boolean
    passGraphUI: boolean
}

export class Color {
    /**
     * red portion 0-255
     */
    readonly r: number

    /**
     * green portion 0-255
     */
    readonly g: number

    /**
     * blue portion 0-255
     */
    readonly b: number

    /**
     * hue 0-300
     */
    readonly h: number

    /**
     * saturation 0-100
     */
    readonly s: number

    /**
     * lightness 0-100
     */
    readonly l: number

    /**
     * alpha 0-1.0
     */
    readonly a: number

    public static readonly black = new Color(0, 0, 0, 0, 0, 0, 1.0)

    public static readonly white = new Color(255, 255, 255, 0, 0, 100, 1.0)

    private constructor(r: number, g: number, b: number, h: number, s: number, l: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.h = h
        this.s = s
        this.l = l
        this.a = a
    }

    /**
     * create color based on rgb
     * @param r red portion 0-255
     * @param g green portion 0-255
     * @param b blue portion 0-255
     * @returns Color
     */
    public static RGB = (r: number, g: number, b: number): Color => {
        const { h, s, l } = Color.RGBToHSL(r, g, b)
        return new Color(r, g, b, h, s, l, 1.0)
    }

    /**
     * create color based on hsl
     * @param h hue 0-300
     * @param s saturation 0-100
     * @param l lightness 0-100
     * @returns Color
     */
    public static HSL = (h: number, s: number, l: number): Color => {
        const { r, g, b } = Color.HSLToRGB(h, s, l)
        return new Color(r, g, b, h, s, l, 1.0)
    }

    public static RGBA = (r: number, g: number, b: number, a: number): Color => {
        const { h, s, l } = Color.RGBToHSL(r, g, b)
        return new Color(r, g, b, h, s, l, a)
    }

    public static contrast = (background: Color, foreground: Color): number => {
        const bgr = background.getNonAlphaColor()
        const fgr = foreground.getNonAlphaColor(bgr)
        return bgr.contrast(fgr)
    }

    /**
     * creates a darker version of the current color
     * @param percentage darkening 0-100
     * @returns Color
     */
    public darken = (percentage: number): Color => Color.HSL(this.h, this.s, Math.max(0, this.l - percentage))

    /**
     * creates a lighter version of the current color
     * @param percentage ligtening 0-100
     * @returns Color
     */
    public lighten = (percentage: number): Color => Color.HSL(this.h, this.s, Math.min(100, this.l + percentage))

    /**
     *
     * @returns luminance of color in range 0-1
     */
    public luminance = () => (0.2126 * Color.toSRGB(this.r) + 0.7152 * Color.toSRGB(this.g) + 0.0722 * Color.toSRGB(this.b))

    /**
     * calculates contrast between colors without alpha
     * @param col color to compare against
     * @returns constrast 1:1 - 21:1 with scale of 1 decimal
     */
    private contrast = (col: Color): number => {
        const l1 = this.luminance()
        const l2 = col.luminance()
        const contrast = l1 < l2 ? (l2 + 0.05) / (l1 + 0.05) : (l1 + 0.05) / (l2 + 0.05)
        return NumberUtils.roundDecimal(contrast, 1)
    }

    /**
     * checks color contrast after WCAG 2.1 standard
     * @param col
     * @returns WcagPassResult for contrast on small and large texts
     */
    public wcagContrast = (col: Color): WcagPassResult => {
        const contrast = this.contrast(col)
        return {
            contrast,
            passAA: contrast >= 4.5,
            passAAA: contrast >= 7,
            passAALarge: contrast >= 3,
            passAAALarge: contrast >= 4.5,
            passGraphUI: contrast >= 3,
        }
    }

    /**
     *
     * @returns hex string of current color
     */
    public toString = (): string => this.hex()

    /**
     *
     * @returns hex string of current color
     */
    public hex = (): string => {
        if (this.hasAlpha()) {
            return `#${Color.toHex(this.r)}${Color.toHex(this.g)}${Color.toHex(this.b)}${Color.toHex(this.a * 255)}`
        }
        return `#${Color.toHex(this.r)}${Color.toHex(this.g)}${Color.toHex(this.b)}`
    }

    /**
     *
     * @returns rgb(r,g,b) representation of current color
     */
    public rgb = (): string => {
        if (this.hasAlpha()) {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`
        }
        return `rgb(${this.r},${this.g},${this.b})`
    }

    /**
     *
     * @returns hsl(h deg l% s%) representation of current color
     */
    public hsl = (): string => {
        if (this.hasAlpha()) {
            return `hsla(${this.h}deg ${this.s}% ${this.l}% / ${this.a})`
        }
        return `hsl(${this.h}deg ${this.s}% ${this.l}%)`
    }

    private hasAlpha = (): boolean => this.a < 1.0

    private getNonAlphaColor = (background: Color = Color.black): Color => {
        if (!this.hasAlpha()) {
            return this
        }
        return Color.RGB(Color.lerp(background.r, this.r, this.a),
            Color.lerp(background.g, this.g, this.a),
            Color.lerp(background.b, this.b, this.a))
    }

    private static lerp = (start: number, end: number, value: number): number => end * value + (1 - value) * start

    private static RGBToHSL(r: number, g: number, b: number): {
        h: number
        s: number
        l: number
    } {
        // Make r, g, and b fractions of 1
        const rP = r / 255
        const gP = g / 255
        const bP = b / 255

        // Find greatest and smallest channel values
        const cmin = Math.min(rP, gP, bP)
        const cmax = Math.max(rP, gP, bP)
        const delta = cmax - cmin
        let h = 0
        let s = 0
        let l = 0

        // Calculate hue
        // No difference
        if (delta === 0) {
            h = 0
        } else if (cmax === rP) {
            // Red is max
            h = ((gP - bP) / delta) % 6
        } else if (cmax === gP) {
            // Green is max
            h = (bP - rP) / delta + 2
        } else {
            // Blue is max
            h = (rP - gP) / delta + 4
        }

        h = Math.round(h * 60)

        // Make negative hues positive behind 360°
        if (h < 0) { h += 360 }

        // Calculate lightness
        l = (cmax + cmin) / 2

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1)
        l = +(l * 100).toFixed(1)

        return { h, s, l }
    }

    private static HSLToRGB(hue: number, sat: number, light: number): {
        r: number
        g: number
        b: number
    } {
        const satP = sat / 100
        const lightP = light / 100
        let t2
        const hueP = hue / 60
        if (lightP <= 0.5) {
            t2 = lightP * (satP + 1)
        } else {
            t2 = lightP + satP - (lightP * satP)
        }
        const t1 = lightP * 2 - t2
        const r = Math.round(Color.hueToRgb(t1, t2, hueP + 2) * 255)
        const g = Math.round(Color.hueToRgb(t1, t2, hueP) * 255)
        const b = Math.round(Color.hueToRgb(t1, t2, hueP - 2) * 255)
        return { r, g, b }
    }

    private static hueToRgb = (t1: number, t2: number, hue: number): number => {
        let tmpHue = hue
        if (tmpHue < 0) {
            tmpHue += 6
        }
        if (tmpHue >= 6) {
            tmpHue -= 6
        }
        if (tmpHue < 1) {
            return (t2 - t1) * tmpHue + t1
        } if (tmpHue < 3) {
            return t2
        } if (tmpHue < 4) {
            return (t2 - t1) * (4 - tmpHue) + t1
        }
        return t1
    }

    private static toHex = (val: number) => Math.round(val).toString(16).toUpperCase().padStart(2, '0')

    private static toSRGB = (val: number) => {
        let s = val / 255
        s = s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
        return s
    }
}
