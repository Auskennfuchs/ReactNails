import styled from 'styled-components'
import React, { useMemo, forwardRef } from 'react'

type WidthType = string | string[] | null | (string | null)[]
type WidthInputType = string | string[] | null

export interface NailsBoxProps extends React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /**
     * width of box inside container. Has to be a ratio or list of ratios, e.g "1/2"
     */
    width?: string | string[],
}

const StyledBox = styled.div<NailsBoxProps & { boxWidth: WidthType }>`
  
`

export const Box = forwardRef<HTMLDivElement, NailsBoxProps>(({ width, children }: NailsBoxProps, ref) => {

    const resolveWidthEntry = (width: string): string | null => {
        const parts = width.split("/")
        if (parts.length !== 2) {
            return width
        }
        const n1 = Number(parts[0])
        const n2 = Number(parts[1])
        if (isNaN(n1) || isNaN(n2)) {
            return null
        }
        return `${n1 / n2 * 100}%`
    }

    const convertBoxWidth = (width: WidthInputType | undefined): WidthType => {
        if (!width || !(typeof width === "string" || Array.isArray(width))) {
            return null
        }

        if (Array.isArray(width)) {
            return width.map(w => resolveWidthEntry(w))
        } else {
            return resolveWidthEntry(width)
        }
    }

    const boxWidth = useMemo(() => convertBoxWidth(width), [width])

    return (
        <StyledBox ref={ref} boxWidth={boxWidth}>
            {children}
        </StyledBox>
    )
})