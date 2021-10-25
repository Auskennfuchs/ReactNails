import { cloneDeep, merge } from 'lodash'

import GlobalState from '../utils/GlobalState'
import { baseTheme, ThemeEntry } from './baseTheme'

export type ThemeCompnentEntry = {
    [name: string]: ThemeEntry
}

export type ThemeFuncResult<R extends ThemeEntry> = [string, R]

export type ThemeFunc<T extends ThemeEntry, R extends ThemeEntry> = (res: T) => ThemeFuncResult<R>

interface ThemeFuncEntry<T extends ThemeEntry, R extends ThemeEntry> {
    priority: number
    func: ThemeFunc<T, R>
}

type ThemeFuncList = Array<ThemeFuncEntry<ThemeEntry, ThemeEntry>>

export const globalThemeFuncs = new GlobalState<ThemeFuncList>([])

/**
 * adds new Theme declarations to the theme
 * @param func
 * @param priority priority of evaluating function, higher number means later processing
 */
export const addThemeComponent = <I extends ThemeEntry, R extends ThemeEntry>(func: ThemeFunc<I, R>, priority: number = 0) => {
    const tf: ThemeFuncList = [...globalThemeFuncs.Value, {
        priority, func,
    } as unknown as ThemeFuncEntry<ThemeEntry, ThemeEntry>]
    tf.sort((a, b) => a.priority - b.priority)
    globalThemeFuncs.Value = tf
}

export const resolveTheme = (theme: ThemeEntry = {}): object => {
    const res: ThemeEntry = merge(cloneDeep(baseTheme), cloneDeep(theme))
    globalThemeFuncs.Value.forEach((tf) => {
        const [id, style] = tf.func(res)
        res[id] = merge((res[id]) || {}, style)
    })

    // override again with specific values
    return merge(res, theme)
}
