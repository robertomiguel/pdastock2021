import { useCallback, useRef } from 'react'

export const useBox = <T>(defaultValue?: T) => {
    const ref = useRef<any>(defaultValue)

    const setter = useCallback<(newValue: T | ((oldValue: T) => T)) => void>(
        (newValue) => {
            if (typeof newValue === 'function')
                ref.current = (newValue as (oldValue: T) => T)(ref.current)
            else ref.current = newValue
        },
        []
    )
    const array: [() => T, typeof setter] = [() => ref.current, setter]
    return array
}

export const useDelay = (fn: any, ms = 300) => {
    const [getLastTimeout, setLastTimeout] = useBox(
        undefined as unknown as NodeJS.Timeout
    )
    const cb: any = (...args: any) => {
        if (getLastTimeout()) clearTimeout(getLastTimeout())
        setLastTimeout(
            setTimeout(() => {
                fn(...args)
            }, ms)
        )
    }
    return cb
}
