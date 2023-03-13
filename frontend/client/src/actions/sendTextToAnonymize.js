import ENV from '../config.js'

const API_HOST = ENV.api_host 
const ENDPOINT_TEXT = ENV.endpoints.text_replace 
const ENDPOINT_TEXT_FILE = ENV.endpoints.text_file_replace


const convertToQueryString = (params) => {
    return Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
}

/**
 * The max-chars for the textarea is 500. If the user uploaded a file,
 * we will use the file endpoint. Otherwise, we will use the text endpoint.
 * 
 * @param {text data} data 
 */
export const sendTextToAnonymize = (text, file, replaceTerms, setResponseText, notify) => {
    if (file) {
        const URL = `${API_HOST + ENDPOINT_TEXT_FILE}`
        let data = new FormData()
        data.append('inputTextFile', file)
        data.append('replaceTerms', JSON.stringify(replaceTerms))

        const request = new Request(URL, {
            method: 'post',
            body: data // FormData headers are included automatically. 
        })

        fetch(request)
        .then(res => {
            if (res.status !== 200) {
                notify("Error " + res.status)
                return 
            }

            return res.text();
        })
        .then(text => {
            if (!text) {
                return 
            }
            setResponseText(text)
            notify("Success! The output is ready for download.")
        })
        .catch(e => {
            notify(ENV.errors.requestFailed)
        })
    } else {
        const queryParams = {
            inputText: encodeURIComponent(text),
            replaceTerms: JSON.stringify(replaceTerms)
        };

        const queryString = convertToQueryString(queryParams)
        const URL = `${API_HOST + ENDPOINT_TEXT}`;
        
        const request = new Request(URL, {
            method: 'post',
            body: JSON.stringify({
                inputText: text,
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
                return 
            }

            return res.json();
        })
        .then(data => {
            if (!data) {
                return
            }
            setResponseText(data.message)
            notify("Success! The output is ready for download.")
        })
        .catch(e => {
            notify(ENV.errors.requestFailed)
        })
    }   
}   
