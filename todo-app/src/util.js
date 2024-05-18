import { useEffect, useState } from "react"

export default function useFetch(url, init){
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        fetch(url, init)
        .then((result) => setResult(result))
        .catch(setError)
        .finally(()=> {setIsLoading(false)})
    }, [url,init])
    

    return {isLoading, result, error};
}