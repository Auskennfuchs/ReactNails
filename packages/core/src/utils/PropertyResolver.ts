import { css } from 'styled-components'

import { Color } from '../Color'
import {
    BreakPoint, CssFunction, MediaQuery, MediaQueryBreakPoint,
} from '../Layout/MediaQuery'
import { BaseTheme, SpacingType, StyledBaseTheme } from '../Theme'

type PropsType = {
    theme: BaseTheme
    [name: string]: any
}

export type ResolverFunc = (value?: any, props?: PropsType) => any
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

const resolveSingleTextStyle: ResolverFunc = (textSize: number | string, props) => {
    if (typeof textSize === 'string') {
        return `font-size: ${textSize};`
    }
    if (typeof textSize === 'number') {
        const textDesc = props?.theme.textSizes[textSize]
        if (textDesc) {
            return css`
                font-size: ${textDesc.fontSize}${textDesc.unit};
                line-height: ${textDesc.lineHeight}${textDesc.unit};
                font-weight: ${textDesc.fontWeight};
                ${textDesc.textTransform && `text-transform: ${textDesc.textTransform}`}
            `
        }
    }
    return `font-size: ${textSize}px;`
}

export const resolveTextStyle: ResolverFunc = applyMediaQuery(resolveSingleTextStyle, 'textStyle')
