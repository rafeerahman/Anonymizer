import ENV from '../config.js'

const API_HOST = ENV.api_host 
const ENDPOINT = ENV.endpoints.csv_file_replace

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