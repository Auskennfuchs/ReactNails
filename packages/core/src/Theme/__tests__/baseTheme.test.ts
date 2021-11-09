import { SpacingType } from '..'
import { baseTheme } from '../baseTheme'

describe('baseTheme tests', () => {
    test('should return m-space', () => {
        expect(baseTheme.spacing(SpacingType.m)).toEqual('16px')
    })

    test('should 7 times gap', () => {
        expect(baseTheme.spacing(7)).toEqual('28px')
    })
})
