import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string,
    initialValue: T | (() =>T)){
        const [value, setValue] = useState<T>(()=> {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null) {
            if(typeof initialValue ==="function"){
                return (initialValue as () =>T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
        }) //Checks if the value exists yet

        useEffect(() => {
          localStorage.setItem(key,JSON.stringify(value))
        }, [value,key]) // every time it changes it updates
        

        return [value, setValue] as [T, typeof setValue]
    }