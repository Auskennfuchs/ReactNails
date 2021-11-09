import { render } from '@testing-library/react'
import React from 'react'

import { NailsApp, SpacingType } from '../..'
import { Box, MediaQueryBreakPoint } from '..'

describe('Box tests', () => {
    test('should render', () => {
        const { container } = render(<Box space={SpacingType.m} />, {
            wrapper: ({ children }) => (
                <NailsApp>
                    {children}
                </NailsApp>
            ),
        })
        expect(container).toMatchSnapshot()
    })

    test('should render space media query', () => {
        const { container } = render(<Box space={{ [MediaQueryBreakPoint.small]: SpacingType.m }} />, {
            wrapper: ({ children }) => (
                <NailsApp>
                    {children}
                </NailsApp>
            ),
        })
        expect(container).toMatchSnapshot()
    })
})
