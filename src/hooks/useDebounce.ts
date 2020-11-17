import {useState, useEffect} from 'react';

/**
 * Debounces a provided value.
 * @template T
 * @param {T} value
 * @param {number} delay
 * @return {T}
 */
export default function useDebounce<T>(value:T, delay:number){
  const [debouncedValue, setDebouncedValue]= useState(value);

  useEffect(
      ()=> {
        const handler = setTimeout(()=> {
          setDebouncedValue((value))
        }, delay);

        return () => clearTimeout(handler)
      }, [value, delay]
  )

  return debouncedValue;
}
