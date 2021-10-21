import React, { forwardRef, useCallback, useMemo } from 'react'
import styled from 'styled-components'

type WidthType = string | string[] | null | (string | null)[]
type WidthInputType = string | string[] | null

export interface NailsBoxProps extends React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /**
     * width of box inside container. Has to be a ratio or list of ratios, e.g "1/2"
     */
    width?: string | string[]
}

const StyledBox = styled.div<NailsBoxProps & { boxWidth: WidthType }>`
  
`

export const Box = forwardRef<HTMLDivElement, NailsBoxProps>(({ width, children }: NailsBoxProps, ref) => {
    const resolveWidthEntry = (inputWidth: string): string | null => {
        const parts = inputWidth.split('/')
        if (parts.length !== 2) {
            return inputWidth
        }
        const n1 = Number(parts[0])
        const n2 = Number(parts[1])
        if (Number.isNaN(n1) || Number.isNaN(n2)) {
            return null
        }
        return `${(n1 / n2) * 100}%`
    }

    const convertBoxWidth = useCallback((inputWidth: WidthInputType | undefined): WidthType => {
        if (!inputWidth || !(typeof inputWidth === 'string' || Array.isArray(inputWidth))) {
            return null
        }

        if (Array.isArray(inputWidth)) {
            return inputWidth.map((w) => resolveWidthEntry(w))
        }
        return resolveWidthEntry(inputWidth)
    }, [])

    const boxWidth = useMemo(() => convertBoxWidth(width), [convertBoxWidth, width])

    return (
        <StyledBox ref={ref} boxWidth={boxWidth}>
            {children}
        </StyledBox>
    )
})
