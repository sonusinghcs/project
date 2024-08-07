import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data,setdata] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const abortController = new AbortController();

        fetch(url,{signal: abortController.signal})
        .then(res => {return res.json()})
        .then(data => {
            
            setdata(data)
            setIsPending(false)
            setError(null);
        }).catch(error => {
            setError(error.message);
            setIsPending(false);});
            return () => abortController.abort();
       },[url]);
       return {data, isPending, error };
}

export default useFetch;