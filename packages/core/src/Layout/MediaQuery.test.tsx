import { MediaQuery } from './MediaQuery'

describe('MediaQuery tests', () => {
    test('small', () => {
        const cssString = MediaQuery.small`;`
        expect(cssString.join('')).toStrictEqual(`
@media screen and (max-width: 767px) {
    ;
}
`)
    })

    test('medium', () => {
        const cssString = MediaQuery.medium`;`
        expect(cssString.join('')).toStrictEqual(`
@media screen and (min-width: 768px) and (max-width: 991px) {
    ;
}
`)
    })

    test('IE11', () => {
        const cssString = MediaQuery.IE11`;`
        expect(cssString.join('')).toStrictEqual(`
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    ;
}
`)
    })

    test('xlargeIE11', () => {
        const cssString = MediaQuery.xlargeIE11`;`
        expect(cssString.join('')).toStrictEqual(`
@media screen and (min-width: 1200px) and (max-width: 1919px) and (-ms-high-contrast: active) and (-ms-high-contrast: none) {
    ;
}
`)
    })

    test('largeMax', () => {
        const cssString = MediaQuery.largeMax`;`
        expect(cssString.join('')).toStrictEqual(`
@media screen and (max-width: 1199px) {
    ;
}
`)
    })

    test('mediumMin', () => {
        const cssString = MediaQuery.mediumMin`;`
        expect(cssString.join('')).toStrictEqual(`
@media screen and (min-width: 768px) {
    ;
}
`)
    })
})
