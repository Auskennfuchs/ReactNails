import './App.css'

import { Color } from '@reactnails/core'

import logo from './logo.svg'

const color: Color = Color.RGBA(75, 68, 182, 0.3)

console.log('color', color.hsl())

const App = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p style={{ color: color.rgb() }}>
                Edit
                {' '}
                <code>src/App.tsx</code>
                {' '}
                and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    </div>
)

export default App
