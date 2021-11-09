import { css, FlattenInterpolation, ThemeProps } from 'styled-components'

export enum BreakPoint {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    XLarge = 'xlarge',
    Wide = 'wide',
}

type BreakPointType = {
    [name in BreakPoint]: {
        maxWidth?: number
        minWidth?: number
    }
}

export const breakPoints: BreakPointType = {
    [BreakPoint.Small]: { maxWidth: 767.98 },
    [BreakPoint.Medium]: { minWidth: 768, maxWidth: 991.98 },
    [BreakPoint.Large]: { minWidth: 992, maxWidth: 1199.98 },
    [BreakPoint.XLarge]: { minWidth: 1200, maxWidth: 1919.98 },
    [BreakPoint.Wide]: { minWidth: 1920 },
}

export type CssFunction = (...args: any[]) => FlattenInterpolation<ThemeProps<any>>

export enum MediaQueryBreakPoint {
    /**
     * media query IE11
     */
    IE11 = 'IE11',
    /**
     * media query small devices <768px
     */
    small = 'small',
    /**
     * media query medium devices <992px
     */
    medium = 'medium',
    /**
     * media query large devices <1200px
     */
    large = 'large',
    /**
     * media query xlarge devices <1920px
     */
    xlarge = 'xlarge',
    /**
     * media query widescreen devices >=1920px
     */
    wide = 'wide',
    mediumMin = 'mediumMin',
    largeMin = 'largeMin',
    xlargeMin = 'xlargeMin',
    wideMin = 'wideMin',
    smallMax = 'smallMax',
    mediumMax = 'mediumMax',
    largeMax = 'largeMax',
    xlargeMax = 'xlargeMax',
    /**
     * media query small devices on IE11 <768px
     */
    smallIE11 = 'smallIE11',
    /**
     * media query medium devices on IE11 <992px
     */
    mediumIE11 = 'mediumIE11',
    /**
     * media query large devices on IE11 <1200px
     */
    largeIE11 = 'largeIE11',
    /**
     * media query xlarge devices on IE11 <1920px
     */
    xlargeIE11 = 'xlargeIE11',
    /**
     * media query widescreen devices on IE11 >=1920px
     */
    wideIE11 = 'wideIE11',

}

type MediaQueryType = {
    [name in MediaQueryBreakPoint]: CssFunction
}

interface LooseMediaQueryType {
    [name: string]: CssFunction
}

export const MediaQuery: MediaQueryType = {
    IE11: (...args: [any]) => css`
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    ${css.call(undefined, ...args)}
}
`,
    small: (null as unknown) as CssFunction,
    medium: (null as unknown) as CssFunction,
    large: (null as unknown) as CssFunction,
    xlarge: (null as unknown) as CssFunction,
    wide: (null as unknown) as CssFunction,
    mediumMin: (null as unknown) as CssFunction,
    largeMin: (null as unknown) as CssFunction,
    xlargeMin: (null as unknown) as CssFunction,
    wideMin: (null as unknown) as CssFunction,
    smallMax: (null as unknown) as CssFunction,
    mediumMax: (null as unknown) as CssFunction,
    largeMax: (null as unknown) as CssFunction,
    xlargeMax: (null as unknown) as CssFunction,
    smallIE11: (null as unknown) as CssFunction,
    mediumIE11: (null as unknown) as CssFunction,
    largeIE11: (null as unknown) as CssFunction,
    xlargeIE11: (null as unknown) as CssFunction,
    wideIE11: (null as unknown) as CssFunction,
}

const createMinMaxWidth = (minWidth: number | undefined, maxWidth: number | undefined): string => {
    const tmp = []
    if (minWidth !== undefined) {
        tmp.push(`min-width: ${minWidth}px`)
    }
    if (maxWidth !== undefined) {
        tmp.push(`max-width: ${maxWidth}px`)
    }
    return tmp.join(') and (')
}

Object.keys(breakPoints).forEach((k) => {
    const bp: { maxWidth?: number; minWidth?: number } = breakPoints[k as BreakPoint]
    const LooseMediaQuery = MediaQuery as unknown as LooseMediaQueryType

    MediaQuery[k as BreakPoint] = (...args: [any]) => css`
@media screen and (${createMinMaxWidth(bp.minWidth, bp.maxWidth)}) {
    ${css.call(undefined, ...args)}
}
`
    if (bp.minWidth) {
        LooseMediaQuery[`${k}Min`] = (...args: [any]): FlattenInterpolation<ThemeProps<any>> => css`
@media screen and (min-width: ${bp.minWidth}px) {
    ${css.call(undefined, ...args)}
}
`
    }

    if (bp.maxWidth) {
        LooseMediaQuery[`${k}Max`] = (...args: [any]): FlattenInterpolation<ThemeProps<any>> => css`
@media screen and (max-width: ${bp.maxWidth}px) {
    ${css.call(undefined, ...args)}
}
`
    }

    LooseMediaQuery[`${k}IE11`] = (...args: [any]) => css`
@media screen and (${createMinMaxWidth(bp.minWidth, bp.maxWidth)}) and (-ms-high-contrast: active) and (-ms-high-contrast: none) {
    ${css.call(undefined, ...args)}
}
`
})
