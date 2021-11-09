import { render } from '@testing-library/react'
import React from 'react'

import GlobalState, { useGlobalState } from '../GlobalState'

interface TestState {
    value: string
    numVal: number
}

const TestGlobalState: React.FC = () => {
    const [state, setState] = useGlobalState<TestState>(new GlobalState<TestState>({
        numVal: 1.34,
        value: 'TestString',
    }))

    return (
        <div>
            Test
        </div>
    )
}

describe('GlobalState tests', () => {
    test('default', () => {
        render(<TestGlobalState />)
    })
})
