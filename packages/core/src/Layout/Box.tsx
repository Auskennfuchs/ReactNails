import React, { forwardRef, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { Color } from '../Color'
import { SpacingType } from '../Theme/baseTheme'
import {
    applyMediaQuery, MediaQueryAwareType, resolveBackgroundColor, resolveSpace,
} from '../utils/PropertyResolver'

type WidthType = string | string[] | null | (string | null)[]
type WidthInputType = string | string[] | null

export interface NailsBoxProps extends React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /**
     * width of box inside container. Has to be a ratio or list of ratios, e.g "1/2"
     */
    width?: string | string[]
    space?: MediaQueryAwareType<SpacingType>
    backgroundColor?: Color | string
}

const resolveWidth = (width: string): string => `width: ${width};`

const StyledBox = styled.div<NailsBoxProps & { boxWidth: WidthType }>`
    ${applyMediaQuery(resolveWidth, 'boxWidth')}
    ${resolveSpace}
    ${(p) => resolveBackgroundColor(p.backgroundColor)}
`

export const Box = forwardRef<HTMLDivElement, NailsBoxProps>(({
    width, space, backgroundColor, children,
}, ref) => {
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

    const convertBoxWidth = useCallback((inputWidth: WidthInputType | undefined): WidthType => {
        if (!inputWidth || !(typeof inputWidth === 'string' || Array.isArray(inputWidth))) {
            return null
        }

        if (Array.isArray(inputWidth)) {
            return inputWidth.map((w) => resolveWidthEntry(w))
        }
        return resolveWidthEntry(inputWidth)
    }, [resolveWidthEntry])

    const boxWidth = useMemo(() => convertBoxWidth(width), [convertBoxWidth, width])

    return (
        <StyledBox ref={ref} boxWidth={boxWidth} space={space} backgroundColor={backgroundColor}>
            {children}
        </StyledBox>
    )
})
