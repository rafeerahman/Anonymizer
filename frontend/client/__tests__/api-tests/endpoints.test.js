import ENV from '../../src/config.js';
import axios from 'axios'


// To run, type `npx jest` in the root directory
// The server must be running for these tests to work

const API_HOST = ENV.api_host 
const ENDPOINT_TEXT = ENV.endpoints.text_replace 
const ENDPOINT_TEXT_FILE = ENV.endpoints.text_file_replace
const ENDPOINT_CSV_FILE= ENV.endpoints.csv_file_replace

describe('Endpoint tests', () => {

    // Gives 400 error according to backend team
    it('should not auto replace anything because hugging face API does not detect anything', async () => {
        const URL = `${API_HOST + ENDPOINT_TEXT}`
        const data = {inputText: "hi my name is bob and i am at google", autoReplaceTerms: {names: "NAME", org: "ORG"}, autoReplace: true}

        try {
            const response = await axios.post(URL, data);
            // If the request is successful, it means the status is not 400, so fail the test
            expect(true).toBe(false);
          } catch (error) {
            // Check if the error is an AxiosError
            if (axios.isAxiosError(error)) {
              // Verify if the status code is 400 as expected
              expect(error.response.status).toBe(400);
            } else {
              // If the error is not an AxiosError, fail the test
              expect(true).toBe(false);
            }
        }
    })

    it('should auto replace the names correctly with given input', async () => {
        const URL = `${API_HOST + ENDPOINT_TEXT}`
        const data = {inputText: "Hi my name is Bob and I am at Google", autoReplaceTerms: {names: "NAME", org: "ORG"}, autoReplace: true}
        const response = await axios.post(URL, data) // axios automatically formats data correctly
        expect(response.status).toBe(200)
        expect(response.data.message).toBe("Hi my name is NAME and I am at ORG")
    })
})

