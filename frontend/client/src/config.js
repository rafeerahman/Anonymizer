const prod = {
    env: 'production',
    api_host: 'https://csc301-378115-backend-4ic67og2pa-pd.a.run.app', // an empty string to signify a relative path. can also put a deployment URL.
    endpoints: {
        text_replace: '/api/anonymize/text', 
        text_file_replace: '/api/anonymize/file/txt',
        csv_file_replace: '/api/anonymize/file/csv',
    },
    errors: {
        requestFailed: "Failed to request resource",
        badRequest: "Invalid request. Please try again.",
        autoReplaceFail: "We were unable to detect any replaceable terms"
    }
};

const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', // web server localhost port
    endpoints: {
        text_replace: '/api/anonymize/text', 
        text_file_replace: '/api/anonymize/file/txt',
        csv_file_replace: '/api/anonymize/file/csv',
    },
    errors: {
        requestFailed: "Failed to request resource",
        badRequest: "Invalid request. Please try again.",
        autoReplaceFail: "We were unable to detect any replaceable terms"
    }
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;