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
            width="1/3"
            space={{
                [MediaQueryBreakPoint.small]: SpacingType.m,
                [MediaQueryBreakPoint.mediumMin]: SpacingType.l,
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
