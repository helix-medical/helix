import color from 'colors';

const log = (header: string, message: string) => {
    color.enable();
    const date = new Date().toLocaleString();
    console.log(`[${date}] -- [${header}] -- ${message}`);
    // Save on file
};

const get = (url: string, state: string, ...message: string[]) =>
    log(`GET`.green, `[${state}] -- ${url}${message.length > 0 ? ` -- ${message}` : ''}`);
const post = (url: string, state: string, ...message: string[]) =>
    log(`POST`.blue, `[${state}] -- ${url}${message.length > 0 ? ` -- ${message}` : ''}`);
const put = (url: string, state: string, ...message: string[]) =>
    log(`PUT`.yellow, `[${state}] -- ${url}${message.length > 0 ? ` -- ${message}` : ''}`);
const del = (url: string, state: string, ...message: string[]) =>
    log(`DELETE`.red, `[${state}] -- ${url}${message.length > 0 ? ` -- ${message}` : ''}`);
const use = (url: string, state: string, ...message: string[]) =>
    log(`USE`.magenta, `[${state}] -- ${url}${message.length > 0 ? ` -- ${message}` : ''}`);
const info = (...message: string[]) => log(`INFO`.cyan, `${message}`);
const err = (message: string) => log(`ERROR`.red, `${message}`);
const warn = (message: string) => log(`WARN`.yellow, `${message}`);
const debug = (message: string) => log(`DEBUG`.gray, `${message}`);
const success = (message: string) => log(`SUCCESS`.green, `${message}`);

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
