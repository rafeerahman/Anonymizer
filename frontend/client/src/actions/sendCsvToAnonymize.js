import ENV from '../config.js'

const API_HOST = ENV.api_host 
const ENDPOINT = ENV.endpoints.csv_file_replace

export const sendCsvToAnonymize = (file, replaceTerms, setResponseText, notify) => {
    const URL = `${API_HOST + ENDPOINT}`
    let data = new FormData()
    data.append('inputFile', file)
    data.append('replaceTerms', JSON.stringify(replaceTerms))

    const request = new Request(URL, {
        method: 'post',
        body: data
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
        setResponseText(text)
        notify("Success! The output is ready for download.")
    })
    .catch(e => {
        console.log(e)
        notify(ENV.errors.requestFailed)
    })
}