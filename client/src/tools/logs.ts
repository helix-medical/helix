class Log {
    ts: string;
    level: string;
    message: string;
    filename: string;

    constructor(filename: string) {
        this.filename = filename;
        this.ts = new Date().toLocaleString();
        this.level = "INFO";
        this.message = "Create Log Instance";
        this.print();
    }

    // save() {
    // }

    print() {
        console.log(`[${this.level}] - ${this.ts} - ${this.message}`);
    }

    info(message: string): void {
        this.level = "INFO";
        this.message = message;
        this.print();
    }

    error(message: string): void {
        this.level = "ERROR";
        this.message = message;
        this.print();
    }

    warn(message: string): void {
        this.level = "WARN";
        this.message = message;
        this.print();
    }

    debug(message: string): void {
        this.level = "DEBUG";
        this.message = message;
        this.print();
    }
}

export default Log;
