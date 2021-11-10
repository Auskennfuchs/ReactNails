import {
    Box, Color, MediaQueryBreakPoint, NailsApp, SpacingType,
} from '@reactnails/core'

const color: Color = Color.RGB(207, 216, 220)

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
                [MediaQueryBreakPoint.wideMin]: '80vw',
            }}
            space={{
                [MediaQueryBreakPoint.small]: SpacingType.m,
                [MediaQueryBreakPoint.mediumMin]: [SpacingType.l, SpacingType.s],
            }}
            backgroundColor="backgroundColors.lightGray"
        >
            Administration
            {' '}
            {color.hsl}
            {' '}
            {color.hex}
        </Box>
    </NailsApp>
)

export default App
