import React, {
    DetailedHTMLProps, forwardRef, HtmlHTMLAttributes, useCallback, useMemo,
} from 'react'
import styled from 'styled-components'

import { Color } from '../Color'
import { SpacingType } from '../Theme/baseTheme'
import {
    applyMediaQuery, MediaQueryAwareArrayType, MediaQueryAwareType, resolveBackgroundColor, resolveSpace, resolveTextStyle,
} from '../utils/PropertyResolver'
import { MediaQueryBreakPoint } from './MediaQuery'

type WidthType = string | null | {
    [name in MediaQueryBreakPoint]?: string | null
}

export interface NailsBoxProps extends Omit<DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * width of box inside container. Has to be a ratio or list of ratios, e.g "1/2"
     */
    width?: MediaQueryAwareType<string>
    /**
     * padding to the inside elements
     */
    space?: MediaQueryAwareArrayType<SpacingType>
    /**
     * background color
     */
    backgroundColor?: Color | string
    /**
     * used text style
     */
    textStyle?: MediaQueryAwareType<number | string>
}

const resolveWidth = (width: string): string => `width: ${width};`

const StyledBox = styled.div<NailsBoxProps & { boxWidth: WidthType }>`
    ${applyMediaQuery(resolveWidth, 'boxWidth')}
    ${resolveSpace}
    ${(p) => resolveBackgroundColor(p.backgroundColor)}
    ${resolveTextStyle}
`

export const Box = forwardRef<HTMLDivElement, NailsBoxProps>(({ width, children, ...rest }, ref) => {
    const resolveWidthEntry = useCallback((inputWidth: string): string | null => {
        const parts = inputWidth.split('/')
        if (parts.length !== 2) {
            return inputWidth
        }
        const n1 = Number(parts[0])
        const n2 = Number(parts[1])
        if (Number.isNaN(n1) || Number.isNaN(n2)) {
            return null
        }
        return `${(n1 / n2) * 100}% `
    }, [])

    const convertBoxWidth = useCallback((inputWidth: MediaQueryAwareType<string> | undefined): WidthType => {
        if (!inputWidth || !(typeof inputWidth === 'string' || typeof inputWidth === 'object')) {
            return null
        }

        if (typeof inputWidth === 'object') {
            return Object.entries(inputWidth).reduce((res, [key, value]) => ({
                ...res,
                [key]: resolveWidthEntry(value),
            }), {})
        }
        return resolveWidthEntry(inputWidth)
    }, [resolveWidthEntry])

    const boxWidth = useMemo(() => convertBoxWidth(width), [convertBoxWidth, width])

    return (
        <StyledBox {...rest} ref={ref} boxWidth={boxWidth}>
            {children}
        </StyledBox>
    )
})
