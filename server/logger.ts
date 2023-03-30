const log = (header: string, message: string) => {
    const date = new Date().toLocaleString();
    console.log(`[${date}] -- [${header}] -- ${message}`);
    // Save on file
};

const get = (url: string) => log(`REQ GET`, `${url}`);
const post = (url: string) => log(`REQ POST`, `${url}`);
const put = (url: string) => log(`REQ PUT`, `${url}`);
const del = (url: string) => log(`REQ DELETE`, `${url}`);
const use = (url: string) => log(`MIDDLEWARE`, `${url}`);
const info = (...message: string[]) => log(`INFO`, `${message}`);
const err = (message: string) => log(`ERROR`, `${message}`);
const warn = (message: string) => log(`WARN`, `${message}`);
const debug = (message: string) => log(`DEBUG`, `${message}`);
const success = (message: string) => log(`SUCCESS`, `${message}`);

export default module.exports = {
    get,
    post,
    put,
    del,
    use,
    info,
    err,
    warn,
    debug,
    success,
};
