import { useCallback, useEffect, useState } from 'react'

export type SubscribeFunction = (val: any) => void

class GlobalState<StateType> {
    private value: StateType

    private subscribers: Array<SubscribeFunction> = []

    constructor(initialValue: StateType) {
        this.value = initialValue
    }

    public get Value(): StateType { return this.value }

    public set Value(newState: StateType) {
        if (this.Value === newState) {
            return
        }
        this.value = newState
        this.subscribers.forEach((subscriber) => {
            subscriber(this.value)
        })
    }

    public subscribe = (itemToScubscribe: SubscribeFunction) => {
        if (this.subscribers.indexOf(itemToScubscribe) > -1) {
            // already in list
            return
        }
        this.subscribers.push(itemToScubscribe)
    }

    public unsubscribe = (itemToUnsubscribe: SubscribeFunction) => {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber !== itemToUnsubscribe)
    }
}

export default GlobalState

export const useGlobalState = <T extends object>(globalState: GlobalState<T>): [T, (state: T) => void] => {
    const [, setLocalState] = useState<T>()
    const state: T = globalState.Value

    const reRender = useCallback(() => {
        setLocalState({} as T)
    }, [])

    useEffect(() => {
        globalState.subscribe(reRender)
        return () => {
            globalState.unsubscribe(reRender)
        }
    }, [globalState, reRender])

    const setState = (newState: T) => {
        globalState.Value = newState
    }

    return [state, setState]
}
