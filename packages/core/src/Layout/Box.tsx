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

type DimensionType = string | null | {
    [name in MediaQueryBreakPoint]?: string | null
}

export interface NailsBoxProps extends Omit<DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * width of box inside container. Has to be a ratio or list of ratios, e.g "1/2"
     */
    width?: MediaQueryAwareType<string>
    height?: MediaQueryAwareType<string>
    minWidth?: MediaQueryAwareType<string>
    minHeight?: MediaQueryAwareType<string>
    maxWidth?: MediaQueryAwareType<string>
    maxHeight?: MediaQueryAwareType<string>
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
const resolveHeight = (height: string): string => `height: ${height};`
const resolveMinWidth = (width: string): string => `min-width: ${width};`
const resolveMinHeight = (height: string): string => `min-height: ${height};`
const resolveMaxWidth = (width: string): string => `max-width: ${width};`
const resolveMaxHeight = (height: string): string => `max-height: ${height};`

const StyledBox = styled.div<NailsBoxProps & {
    boxWidth: DimensionType
    boxHeight: DimensionType
    boxMinWidth: DimensionType
    boxMinHeight: DimensionType
    boxMaxWidth: DimensionType
    boxMaxHeight: DimensionType
}>`
    ${applyMediaQuery(resolveWidth, 'boxWidth')}
    ${applyMediaQuery(resolveHeight, 'boxHeight')}
    ${applyMediaQuery(resolveMinWidth, 'boxMinWidth')}
    ${applyMediaQuery(resolveMinHeight, 'boxMinHeight')}
    ${applyMediaQuery(resolveMaxWidth, 'boxMaxWidth')}
    ${applyMediaQuery(resolveMaxHeight, 'boxMaxHeight')}
    ${resolveSpace}
    ${(p) => resolveBackgroundColor(p.backgroundColor)}
    ${resolveTextStyle}
`

export const Box = forwardRef<HTMLDivElement, NailsBoxProps>(({
    width, height, minWidth, maxWidth, minHeight, maxHeight, children, ...rest
}, ref) => {
    const resolveDimensionEntry = useCallback((inputWidth: string): string | null => {
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

    const convertBoxDimension = useCallback((inputDimension: MediaQueryAwareType<string> | undefined): DimensionType => {
        if (!inputDimension || !(typeof inputDimension === 'string' || typeof inputDimension === 'object')) {
            return null
        }

        if (typeof inputDimension === 'object') {
            return Object.entries(inputDimension).reduce((res, [key, value]) => ({
                ...res,
                [key]: resolveDimensionEntry(value),
            }), {})
        }
        return resolveDimensionEntry(inputDimension)
    }, [resolveDimensionEntry])

    const boxWidth = useMemo(() => convertBoxDimension(width), [convertBoxDimension, width])
    const boxHeight = useMemo(() => convertBoxDimension(height), [convertBoxDimension, height])
    const boxMinWidth = useMemo(() => convertBoxDimension(minWidth), [convertBoxDimension, minWidth])
    const boxMinHeight = useMemo(() => convertBoxDimension(minHeight), [convertBoxDimension, minHeight])
    const boxMaxWidth = useMemo(() => convertBoxDimension(maxWidth), [convertBoxDimension, maxWidth])
    const boxMaxHeight = useMemo(() => convertBoxDimension(maxHeight), [convertBoxDimension, maxHeight])

    return (
        <StyledBox
            {...rest}
            ref={ref}
            boxWidth={boxWidth}
            boxHeight={boxHeight}
            boxMinWidth={boxMinWidth}
            boxMinHeight={boxMinHeight}
            boxMaxWidth={boxMaxWidth}
            boxMaxHeight={boxMaxHeight}
        >
            {children}
        </StyledBox>
    )
})
