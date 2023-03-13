const prod = {
    env: 'production',
    api_host: 'https://csc301-378115-backend-4ic67og2pa-pd.a.run.app', // an empty string to signify a relative path. can also put a deployment URL.
    endpoints: {
        text_replace: '/anon/text-replace', 
        text_file_replace: '/anon/text-file-replace',
        csv_file_replace: '/anon/csv-file-replace',
    },
    errors: {
        requestFailed: "Failed to request resource"
    }
};

const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', // web server localhost port
    endpoints: {
        text_replace: '/anon/text-replace', 
        text_file_replace: '/anon/text-file-replace',
        csv_file_replace: '/anon/csv-file-replace',
    },
    errors: {
        requestFailed: "Failed to request resource"
    }
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;