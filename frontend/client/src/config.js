const prod = {
    env: 'production',
    api_host: '', // an empty string to signify a relative path. can also put a deployment URL.
    endpoints: {text_replace: '/anon/text-replace'}
};

const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', // web server localhost port
    endpoints: {text_replace: '/anon/text-replace'},
    errors: {
        requestFailed: "Failed to request resource"
    }
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;