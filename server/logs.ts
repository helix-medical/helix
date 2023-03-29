function log(method: string, url: string) {
    let color = "white";
    switch (method) {
        case "GET":
            color = "green";
            break;
        case "POST":
            color = "blue";
            break;
        case "PUT":
            color = "yellow";
            break;
        case "DELETE":
            color = "red";
            break;
        default:
            break;
    }
    console.log(`%c${method} %c${url}`, `color: ${color}`, "color: white");
}

export default log;
