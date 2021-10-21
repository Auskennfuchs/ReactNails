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
    [BreakPoint.Small]: { maxWidth: 767 },
    [BreakPoint.Medium]: { minWidth: 768, maxWidth: 991 },
    [BreakPoint.Large]: { minWidth: 992, maxWidth: 1199 },
    [BreakPoint.XLarge]: { minWidth: 1200, maxWidth: 1919 },
    [BreakPoint.Wide]: { minWidth: 1920 },
}

interface MediaQueryType {
    breakPoints: BreakPointType
    IE11: (...args: any[]) => FlattenInterpolation<ThemeProps<any>>
    [name: string]: any
}

export const MediaQuery: MediaQueryType = {
    breakPoints,
    IE11: (...args: [any]) => css`
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            ${css.call(undefined, ...args)}
        }
    `,
}

Object.keys(breakPoints).forEach((k) => {
    const bp: { maxWidth?: number; minWidth?: number } = breakPoints[k as BreakPoint]
    MediaQuery[k] = (...args: [any]) => css`
        @media screen and ${bp.minWidth && `(min-width: ${bp.minWidth}px)`} ${bp.minWidth && bp.maxWidth && ' and '} ${bp.maxWidth && `(max-width: ${bp.maxWidth}px)`} {
            ${css.call(undefined, ...args)}
        }
    `
    if (bp.minWidth) {
        MediaQuery[`${k}Min`] = (...args: [any]): FlattenInterpolation<ThemeProps<any>> => css`
            @media screen and (min-width: ${bp.minWidth}px) {
                ${css.call(undefined, ...args)}
            }
        `
    }

    if (bp.maxWidth) {
        MediaQuery[`${k}Max`] = (...args: [any]): FlattenInterpolation<ThemeProps<any>> => css`
            @media screen and (max-width: ${bp.maxWidth}px) {
                ${css.call(undefined, ...args)}
            }
        `
    }

    MediaQuery[`${k}IE11`] = (...args: [any]) => css`
        @media screen and ${bp.minWidth && `(min-width: ${bp.minWidth}px)`} ${bp.minWidth && bp.maxWidth && ' and '} ${bp.maxWidth && `(max-width: ${bp.maxWidth}px)`} and (-ms-high-contrast: active) and (-ms-high-contrast:none) {
            ${css.call(undefined, ...args)}
        }
    `
})
