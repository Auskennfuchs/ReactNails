import {
    Box, Color, MediaQueryBreakPoint, NailsApp, SpacingType,
} from '@reactnails/core'
import styled from 'styled-components'

const color: Color = Color.RGB(207, 216, 220)

const TextComp = styled.div`
    background-color: #ccc;
`

const App = () => (
    <NailsApp theme={{
        colors: {
            backgroundColors: {
                lightGray: color,
            },
        },
    }}
    >
        <Box
            width={{
                [MediaQueryBreakPoint.small]: '100vw',
                [MediaQueryBreakPoint.mediumMin]: '1/2',
                [MediaQueryBreakPoint.wideMin]: '80%',
            }}
            height="50vh"
            minHeight="400px"
            space={{
                [MediaQueryBreakPoint.small]: SpacingType.m,
                [MediaQueryBreakPoint.mediumMin]: [SpacingType.l, SpacingType.xl],
            }}
            backgroundColor="backgroundColors.lightGray"
            textStyle={{
                [MediaQueryBreakPoint.small]: 500,
                [MediaQueryBreakPoint.mediumMin]: 300,
            }}
        >
            Administration
            {' '}
            {color.hsl}
            {' '}
            {color.hex}
        </Box>
        <TextComp>Text</TextComp>
    </NailsApp>
)

export default App
