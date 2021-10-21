import React from 'react'
import styled from 'styled-components'

export enum RowAlignType {
    /**
     * aligns horizontally centered
     */
    Center = 'center',
    /**
     * aligns horizontally top
     */
    Top = 'flex-start',
    /**
     * aligns horizontally bottom
     */
    Bottom = 'flex-end',
    Stretch = 'stretch',
    Baseline = 'baseline',
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: RowAlignType
}

export const Row = styled(({ align, ...rest }: RowProps) => (<div {...rest} />)).attrs((p: RowProps) => ({
    align: p.align || RowAlignType.Center,
}))`
    display: flex;
    flex-direction: row;
    align-items: ${(p) => p.align};
`
