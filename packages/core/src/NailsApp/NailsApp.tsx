import React, { FC, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { globalThemeFuncs, resolveTheme, ThemeEntry } from '../Theme'
import { useGlobalState } from '../utils/GlobalState'

interface Props {
    /**
     * override any value of the default theme
     */
    theme?: ThemeEntry
}

export const NailsApp: FC<Props> = ({ theme, children }) => {
    const [useTheme, setUseTheme] = useState(resolveTheme(theme))

    const [themeFuncs] = useGlobalState(globalThemeFuncs)

    useEffect(() => {
        const newTheme = resolveTheme(theme || {})
        setUseTheme(newTheme)
    }, [theme, themeFuncs])

    return (
        <ThemeProvider theme={useTheme}>
            {children}
        </ThemeProvider>
    )
}
