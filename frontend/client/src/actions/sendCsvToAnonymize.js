import ENV from '../config.js'

const API_HOST = ENV.api_host 
const ENDPOINT = ENV.endpoints.csv_file_replace

/**
 * Function that performs an action and sends a notification to the user
 *
 * @callback notify
 * @param {string} message - The message to send as a notification
 */

/**
 * Function that sets the response text state variable
 *
 * @callback setResponseText
 * @param {string} text - The text to set as the response
 */

/**
 * Function that sets the loading state variable to True or False
 *
 * @callback setLoading
 * @param {boolean} loading - The new value of the loading state variable
 */

/**
 * This function sends a request to our CSV File endpoint, and applies the users anonymization terms to their CSV.
 * If successful, the response is retrieved and put in a downloadable file.
 * 
 * @param {file} file 
 * @param {object} replaceTerms 
 * @param {setResponseText} setResponseText 
 * @param {notify} notify 
 * @param {setLoading} setLoading 
 * @param {boolean} useAuto - The state variable that tells us whether "auto-parameters" is enabled
 * @param {object} autoReplaceTerms 
 */
export const sendCsvToAnonymize = (file, replaceTerms, setResponseText, notify, setLoading, useAuto, autoReplaceTerms) => {
    const URL = `${API_HOST + ENDPOINT}`
    let data = new FormData()
    data.append('inputFile', file)
    
    data.append('replaceTerms', JSON.stringify(replaceTerms))
    data.append('autoReplace', useAuto)
    if (useAuto) {
        data.append('autoReplaceTerms', JSON.stringify(autoReplaceTerms))
    }

    const request = new Request(URL, {
        method: 'post',
        body: data
    })

    setLoading(true)

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
    .finally(() => {
        setLoading(false)
    })
}