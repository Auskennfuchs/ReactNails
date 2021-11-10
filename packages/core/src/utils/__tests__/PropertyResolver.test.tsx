import { MediaQueryBreakPoint, SpacingType } from '../..'
import { applyMediaQuery } from '../PropertyResolver'

describe('PropertyResolver tests', () => {
    const resolver = (space: SpacingType | SpacingType[]): string => {
        if (Array.isArray(space)) {
            return `padding: ${space.join(' ')}`
        }
        return `padding: ${space}`
    }

    test('should apply single value', () => {
        const res = applyMediaQuery(resolver, 'space')({
            space: SpacingType.m,
        })
        expect(res).toBe('padding: m')
    })

    test('should apply array values', () => {
        const res = applyMediaQuery(resolver, 'space')({
            space: [SpacingType.s, SpacingType.m],
        })
        expect(res).toBe('padding: s m')
    })

    test('should apply media value', () => {
        const res = applyMediaQuery(resolver, 'space')({
            space: {
                [MediaQueryBreakPoint.large]: SpacingType.l,
            },
        })
        expect(res.join('')).toMatchSnapshot()
    })

    test('should apply media array value', () => {
        const res = applyMediaQuery(resolver, 'space')({
            space: {
                [MediaQueryBreakPoint.IE11]: [SpacingType.l, SpacingType.xl],
            },
        })
        expect(res.join('')).toMatchSnapshot()
    })

    test('should apply multiple media values', () => {
        const res = applyMediaQuery(resolver, 'space')({
            space: {
                [MediaQueryBreakPoint.IE11]: [SpacingType.l, SpacingType.xl],
                [MediaQueryBreakPoint.large]: SpacingType.m,
            },
        })
        expect(res.join('')).toMatchSnapshot()
    })
})
