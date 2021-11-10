import { css } from 'styled-components'

import { Color } from '../Color'
import {
    BreakPoint, CssFunction, MediaQuery, MediaQueryBreakPoint,
} from '../Layout/MediaQuery'
import { SpacingType, StyledBaseTheme } from '../Theme'

export type ResolverFunc = (value?: any, props?: any) => any
export const applySingle = (func: ResolverFunc, propName: string, discardNull: boolean = true): any => (props: any) => {
    const { [propName]: propObject } = props
    if (discardNull && !propObject) {
        return null
    }
    return func(propObject, props)
}

type PropsMediaQueryValues<T> = {
    [name in MediaQueryBreakPoint]?: T
}

export type MediaQueryAwareType<T> = T | PropsMediaQueryValues<T>

export type MediaQueryAwareArrayType<T> = MediaQueryAwareType<T | Array<T>>

type PropsType = {
    [name: string]: MediaQueryAwareArrayType<any>
}

const applyMediaQueryValues = <T>(
    propValue: MediaQueryAwareArrayType<T> | MediaQueryAwareType<T>,
    func: ResolverFunc, props: PropsType,
) => {
    if (Array.isArray(propValue)) {
        return func(propValue, props)
    }
    return func(propValue, props)
}

export const applyMediaQuery = <T>(func: ResolverFunc, propName: string, discardNull: boolean = true): any => (props: PropsType) => {
    const { [propName]: propObject } = props
    if (discardNull && !propObject) {
        return null
    }
    if (typeof propObject === 'object' && !Array.isArray(propObject)) {
        const mediaPropObject = propObject as PropsMediaQueryValues<T>
        return Object.entries(mediaPropObject).reduce<CssFunction | undefined>((res, [breakPoint, value]): any => css`
            ${res}
            ${MediaQuery[breakPoint as BreakPoint]`
                ${applyMediaQueryValues(value, func, props)}
            `}
        `, undefined)
    }
    return applyMediaQueryValues(propObject, func, props)
}

const resolveSpaceSingle = (space: SpacingType) => space && css`
    padding: ${(p: StyledBaseTheme) => p.theme.spacing(space)};
`

export const resolveSpace = applyMediaQuery(resolveSpaceSingle, 'space')

export const resolveBackgroundColor = (color: Color | string | undefined) => color && css`
    background-color: ${(p: StyledBaseTheme) => p.theme.color(color)};
`
