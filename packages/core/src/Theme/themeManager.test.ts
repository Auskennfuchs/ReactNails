import { Color } from '..'
import { addThemeComponent, resolveTheme } from '.'
import { ThemeEntry } from './baseTheme'

describe('ThemeManager', () => {
    test('add theme component', () => {
        addThemeComponent(() => ['newThemeComponent', {
            backgroundColor: Color.black,
        }])

        const resTheme = resolveTheme({})
        expect(resTheme).toMatchSnapshot()
    })

    test('add theme component with default', () => {
        addThemeComponent(() => ['newThemeComponent', {
            backgroundColor: Color.black,
        }])

        const resTheme = resolveTheme()
        expect(resTheme).toMatchSnapshot()
    })

    test('add theme component derived', () => {
        interface BasicThemeComponent extends ThemeEntry {
            backgroundColor: Color
        }

        interface ThemeBasic extends ThemeEntry {
            newThemeComponent: BasicThemeComponent
        }

        interface DerivedThemeComponent extends BasicThemeComponent {
            textColor: Color
        }

        type ResDerivedThemeComponent = {
            derivedThemeComponent: DerivedThemeComponent
        }

        addThemeComponent<ThemeEntry, BasicThemeComponent>(() => ['newThemeComponent', {
            backgroundColor: Color.black,
        }])

        addThemeComponent<ThemeBasic, DerivedThemeComponent>((res) => ['derivedThemeComponent', {
            ...res.newThemeComponent,
            textColor: Color.RGB(255, 255, 255),
        }])

        const resTheme = resolveTheme() as ResDerivedThemeComponent
        expect(resTheme.derivedThemeComponent.backgroundColor).toStrictEqual(Color.black)
    })
})
