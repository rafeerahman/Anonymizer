import ENV from '../config.js'

const API_HOST = ENV.api_host 
const ENDPOINT_TEXT = ENV.endpoints.text_replace 
const ENDPOINT_TEXT_FILE = ENV.endpoints.text_file_replace
const USER_HAS_BEEN_NOTIFIED = "User has been notified"


/**
 * The max-chars for the textarea is 500. If the user uploaded a file,
 * we will use the file endpoint. Otherwise, we will use the text endpoint.
 * 
 * @param {text data} data 
 */
export const sendTextToAnonymize = (text, file, replaceTerms, setResponseText, notify, setLoading, useAuto, autoReplaceTerms) => {
    if (file) {
        const URL = `${API_HOST + ENDPOINT_TEXT_FILE}`
        let data = new FormData()
        data.append('inputTextFile', file)
        data.append('replaceTerms', JSON.stringify(replaceTerms)) 
        data.append('autoReplace', useAuto) // 
        if (useAuto) { 
            data.append('autoReplaceTerms', JSON.stringify(autoReplaceTerms))
        }

        const request = new Request(URL, {
            method: 'post',
            body: data // FormData headers are included automatically. 
        })

        setLoading(true)

        fetch(request)
        .then(res => {
            if (res.status !== 200) {
                notify("Error: " + res.status)
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
        .finally(() => {
            setLoading(false)
        })
    } else {
        const URL = `${API_HOST + ENDPOINT_TEXT}`;
        
        let body = {
            inputText: text,
            replaceTerms: replaceTerms,
            autoReplace: useAuto // Boolean, true or false
        }
        
        if (useAuto) {
            body.autoReplaceTerms = autoReplaceTerms
        }

        const request = new Request(URL, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        
        setLoading(true)

        fetch(request)
        .then(res => {
            if (res.status !== 200) {
                let customStatus = res.status.toString()
                if (ENV.errors[customStatus]) {
                    notify(ENV.errors[customStatus]);
                    return Promise.reject(USER_HAS_BEEN_NOTIFIED)
                } else {
                    return Promise.reject(new Error(res.status));
                }
            }

            return res.json()
        })
        .then(data => {
            setResponseText(data.message)
            notify("Success! The output is ready for download.")
        })
        .catch(e => {
            if (e === USER_HAS_BEEN_NOTIFIED) {
                return 
            } else if (e.message === "400") {
                notify(ENV.errors.badRequest)
            } else {
                notify(ENV.errors.requestFailed)
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }   
}   
