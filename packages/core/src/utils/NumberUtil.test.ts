import { NumberUtils } from './NumberUtils'

describe('NumberUtil tests', () => {
    test('roundDecimal', () => {
        expect(NumberUtils.roundDecimal(0.999435, 2)).toStrictEqual(1)
        expect(NumberUtils.roundDecimal(0.439435, 1)).toStrictEqual(0.4)
    })
})
