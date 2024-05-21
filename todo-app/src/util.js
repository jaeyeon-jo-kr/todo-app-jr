import { useEffect, useState } from "react"

export function useFetch(url, init){
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

export function useJsonFetch(url, init){
    const [jsonResult, setJsonResult] = useState(null);
    const [jsonError, setJsonError] = useState(null);
    const [jsonLoading, setJsonLoading] = useState(true);
    const {isLoading, result, error} = useFetch(url,init);
    useEffect(() => {
        if(isLoading){
            setJsonLoading(isLoading)
        }else if(error){
            setJsonError(error)
        }else{
            result
            .json()
            .then(setJsonResult)
            .error(setJsonError)
            .finally(()=>setJsonLoading(false))
        }
        result.json().then(json => setJsonResult(json)).catch()
    }, [error, isLoading,result])

    return {isLoading:jsonLoading, 
            result:jsonResult, 
            error:jsonError}

}