import ENV from '../config.js'

const API_HOST = ENV.api_host 
const ENDPOINT = ENV.endpoints.text_replace 

/**
 * 
 * @param {text data} data 
 */
export const sendTextToAnonymize = (text, file, replaceTerms, setResponseText, notify) => {
    const URL = `${API_HOST + ENDPOINT}`

    const request = new Request(URL, {
        method: 'post',
        body: JSON.stringify({
            text: text,
            replaceTerms: replaceTerms
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    
    fetch(request)
    .then((res) => {
        if (res.status !== 200) {
            notify("Error: " + res.status)
        }
    })
    .then(json => {
        setResponseText(json.data.message)
    })
    .catch(e => {
        console.log(e)
        notify(ENV.errors.requestFailed)
    })
}
