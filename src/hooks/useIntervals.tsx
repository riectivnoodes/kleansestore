import { useState } from "react"

const useSetCount = () => {

    const [count, setCounter] = useState(
        {
            image: 0,
        }
    );
    return [count, (data: string, num: number) => {
        return setCounter((prev) => { return { ...prev, [data]: num } })
    }] as const
    // as const handles types 
}

export const useIncrementData = () => {

    const [count, setCount] = useSetCount();
    return [count, setCount, (greater: number, target: 'image', operator: boolean) => {
        // update target @types and count/setCount variables for additional instances

        if (operator && count[target] < greater) return setCount(target, (count[target] + 1));
        if (operator && count[target] >= greater) return setCount(target, (count[target] - count[target]));
        // increase count values unless target met
        if (!operator && count[target] > greater) return setCount(target, (count[target] - 1))
        if (!operator && count[target] <= greater) return setCount(target, greater)
        // decrease count values unless target met

        else return setCount;
    }] as const
    // increments / decrements count variables based on input vars 

};