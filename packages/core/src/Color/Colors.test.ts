import { Color, WcagPassResult } from './Color'

describe('Color tests', () => {
    test('Color construct from rgb red', () => {
        const rgbColor = Color.RGB(255, 0, 0)
        expect(rgbColor.r).toStrictEqual(255)
        expect(rgbColor.g).toStrictEqual(0)
        expect(rgbColor.b).toStrictEqual(0)
        expect(rgbColor.h).toStrictEqual(0)
        expect(rgbColor.s).toStrictEqual(100)
        expect(rgbColor.l).toStrictEqual(50)
        expect(rgbColor.hsl()).toStrictEqual('hsl(0deg 100% 50%)')
        expect(rgbColor.rgb()).toStrictEqual('rgb(255,0,0)')
    })

    test('Color construct from rgb green', () => {
        const rgbColor = Color.RGB(0, 255, 0)
        expect(rgbColor.r).toStrictEqual(0)
        expect(rgbColor.g).toStrictEqual(255)
        expect(rgbColor.b).toStrictEqual(0)
        expect(rgbColor.h).toStrictEqual(120)
        expect(rgbColor.s).toStrictEqual(100)
        expect(rgbColor.l).toStrictEqual(50)
    })

    test('Color construct from rgb blue', () => {
        const rgbColor = Color.RGB(0, 0, 255)
        expect(rgbColor.r).toStrictEqual(0)
        expect(rgbColor.g).toStrictEqual(0)
        expect(rgbColor.b).toStrictEqual(255)
        expect(rgbColor.h).toStrictEqual(240)
        expect(rgbColor.s).toStrictEqual(100)
        expect(rgbColor.l).toStrictEqual(50)
    })

    test('Color construct from rgb black', () => {
        const rgbColor = Color.RGB(0, 0, 0)
        expect(rgbColor.r).toStrictEqual(0)
        expect(rgbColor.g).toStrictEqual(0)
        expect(rgbColor.b).toStrictEqual(0)

        expect(rgbColor.h).toStrictEqual(0)
        expect(rgbColor.s).toStrictEqual(0)
        expect(rgbColor.l).toStrictEqual(0)
    })

    test('Color construct from rgb white', () => {
        const rgbColor = Color.RGB(255, 255, 255)
        expect(rgbColor.r).toStrictEqual(255)
        expect(rgbColor.g).toStrictEqual(255)
        expect(rgbColor.b).toStrictEqual(255)

        expect(rgbColor.h).toStrictEqual(0)
        expect(rgbColor.s).toStrictEqual(0)
        expect(rgbColor.l).toStrictEqual(100)
    })

    test('Color construct from rgb magenta', () => {
        const rgbColor = Color.RGB(255, 0, 255)
        expect(rgbColor.r).toStrictEqual(255)
        expect(rgbColor.g).toStrictEqual(0)
        expect(rgbColor.b).toStrictEqual(255)

        expect(rgbColor.h).toStrictEqual(300)
        expect(rgbColor.s).toStrictEqual(100)
        expect(rgbColor.l).toStrictEqual(50)
    })

    test('Color construct from hsl red', () => {
        const hslColor = Color.HSL(0, 100, 50)
        expect(hslColor.r).toStrictEqual(255)
        expect(hslColor.g).toStrictEqual(0)
        expect(hslColor.b).toStrictEqual(0)
        expect(hslColor.h).toStrictEqual(0)
        expect(hslColor.s).toStrictEqual(100)
        expect(hslColor.l).toStrictEqual(50)
    })

    test('Color construct from hsl green', () => {
        const hslColor = Color.HSL(120, 100, 50)
        expect(hslColor.r).toStrictEqual(0)
        expect(hslColor.g).toStrictEqual(255)
        expect(hslColor.b).toStrictEqual(0)
        expect(hslColor.h).toStrictEqual(120)
        expect(hslColor.s).toStrictEqual(100)
        expect(hslColor.l).toStrictEqual(50)
    })

    test('Color construct from hsl blue', () => {
        const hslColor = Color.HSL(240, 100, 50)
        expect(hslColor.r).toStrictEqual(0)
        expect(hslColor.g).toStrictEqual(0)
        expect(hslColor.b).toStrictEqual(255)
        expect(hslColor.h).toStrictEqual(240)
        expect(hslColor.s).toStrictEqual(100)
        expect(hslColor.l).toStrictEqual(50)
    })

    test('Color construct from hsl black', () => {
        const hslColor = Color.HSL(0, 0, 0)
        expect(hslColor.r).toStrictEqual(0)
        expect(hslColor.g).toStrictEqual(0)
        expect(hslColor.b).toStrictEqual(0)
        expect(hslColor.h).toStrictEqual(0)
        expect(hslColor.s).toStrictEqual(0)
        expect(hslColor.l).toStrictEqual(0)
    })

    test('Color construct from hsl white', () => {
        const hslColor = Color.HSL(0, 0, 100)
        expect(hslColor.r).toStrictEqual(255)
        expect(hslColor.g).toStrictEqual(255)
        expect(hslColor.b).toStrictEqual(255)
        expect(hslColor.h).toStrictEqual(0)
        expect(hslColor.s).toStrictEqual(0)
        expect(hslColor.l).toStrictEqual(100)
    })

    test('Color construct from hsl magenta', () => {
        const rgbColor = Color.HSL(300, 100, 50)
        expect(rgbColor.r).toStrictEqual(255)
        expect(rgbColor.g).toStrictEqual(0)
        expect(rgbColor.b).toStrictEqual(255)

        expect(rgbColor.h).toStrictEqual(300)
        expect(rgbColor.s).toStrictEqual(100)
        expect(rgbColor.l).toStrictEqual(50)
    })

    test('Color toString', () => {
        let col = Color.RGB(255, 0, 0)
        expect(col.toString()).toStrictEqual('#FF0000')
        col = Color.RGB(0, 128, 0)
        expect(col.toString()).toStrictEqual('#008000')
        col = Color.RGB(0, 0, 56)
        expect(col.toString()).toStrictEqual('#000038')
    })

    test('Color string literal', () => {
        const col = Color.RGB(255, 0, 255)
        expect(`${col}`).toStrictEqual('#FF00FF')
    })

    test('Color darken 5%', () => {
        const col = Color.RGB(255, 0, 0).darken(5)
        expect(col.h).toStrictEqual(0)
        expect(col.s).toStrictEqual(100)
        expect(col.l).toStrictEqual(45)
        expect(col.r).toStrictEqual(230)
        expect(col.g).toStrictEqual(0)
        expect(col.b).toStrictEqual(0)
    })

    test('Color darken 10%', () => {
        const col = Color.RGB(0, 255, 0).darken(10)
        expect(col.h).toStrictEqual(120)
        expect(col.s).toStrictEqual(100)
        expect(col.l).toStrictEqual(40)
        expect(col.r).toStrictEqual(0)
        expect(col.g).toStrictEqual(204)
        expect(col.b).toStrictEqual(0)
    })

    test('Color lighten 10%', () => {
        const col = Color.HSL(0, 0, 10).lighten(10)
        expect(col.h).toStrictEqual(0)
        expect(col.s).toStrictEqual(0)
        expect(col.l).toStrictEqual(20)
        expect(col.r).toStrictEqual(51)
        expect(col.g).toStrictEqual(51)
        expect(col.b).toStrictEqual(51)
    })

    test('Color luminance', () => {
        const black = Color.RGB(0, 0, 0)
        expect(black.luminance()).toEqual(0)
        const white = Color.RGB(255, 255, 255)
        expect(Math.round(white.luminance() * 100) / 100).toEqual(1)
    })

    test('Color contrast black/white', () => {
        const black = Color.RGB(0, 0, 0)
        const white = Color.RGB(255, 255, 255)
        const contrast = Color.contrast(black, white)
        expect(contrast).toStrictEqual(21)
        expect(Color.contrast(black, white)).toStrictEqual(Color.contrast(white, black))
        expect(Color.contrast(black, black)).toStrictEqual(1)
        expect(Color.contrast(white, white)).toStrictEqual(1)
    })

    test('Color contrast real world', () => {
        const background = Color.RGB(23, 43, 77)
        const foreground = Color.RGB(255, 255, 255)
        const contrast = Color.contrast(background, foreground)
        expect(contrast).toStrictEqual(14.1)
    })

    test('Color WCAG check light on dark', () => {
        expect(Color.RGB(23, 43, 77).wcagContrast(Color.RGB(255, 255, 255))).toEqual({
            contrast: 14.1,
            passAA: true,
            passAAA: true,
            passAALarge: true,
            passAAALarge: true,
            passGraphUI: true,
        } as WcagPassResult)
    })

    test('Color WCAG check dark on dark', () => {
        expect(Color.RGB(23, 43, 77).wcagContrast(Color.RGB(30, 30, 30))).toEqual({
            contrast: 1.2,
            passAA: false,
            passAAA: false,
            passAALarge: false,
            passAAALarge: false,
            passGraphUI: false,
        } as WcagPassResult)
    })

    test('Color WCAG check light on grey', () => {
        expect(Color.RGB(137, 147, 164).wcagContrast(Color.RGB(255, 255, 255))).toEqual({
            contrast: 3.1,
            passAA: false,
            passAAA: false,
            passAALarge: true,
            passAAALarge: false,
            passGraphUI: true,
        } as WcagPassResult)
    })

    test('Color RGBA to hex', () => {
        const color = Color.RGBA(100, 100, 100, 0.5)
        expect(color.hex()).toStrictEqual('#64646480')
    })

    test('Color RGBA to rgb', () => {
        const color = Color.RGBA(100, 100, 100, 0.5)
        expect(color.rgb()).toStrictEqual('rgba(100,100,100,0.5)')
    })

    test('Color RGBA to hsl', () => {
        const color = Color.RGBA(200, 60, 200, 0.3)
        expect(color.hsl()).toStrictEqual('hsla(300deg 56% 51% / 0.3)')
    })

    test('Color constrast alpha', () => {
        const background = Color.RGB(100, 100, 100)
        const textColor = Color.RGBA(255, 0, 0, 0.8)
        const contrast = Color.contrast(background, textColor)
        expect(contrast).toStrictEqual(1.2)
    })

    test('Color white', () => {
        expect(Color.white.hex()).toStrictEqual(Color.RGB(255, 255, 255).hex())
        expect(Color.white.rgb()).toStrictEqual(Color.RGB(255, 255, 255).rgb())
        expect(Color.white.hsl()).toStrictEqual(Color.RGB(255, 255, 255).hsl())
    })
})
