import {useState} from 'react'

export default (url) => {
 const [isLoading, setLoading] = useState(false)
 const [response, setResponse] = useState(null)
 const [error, setError] = useState(null)

 const doFetch = () => {}
 return [{isLoading, response, error}, doFetch]
}
