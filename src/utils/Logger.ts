/**
 * 日志工具类，用于统一管理应用程序的日志输出
 */
export class Logger {
    private static instance: Logger;
    private isDebugMode: boolean = true;

    private constructor() {}

    /**
     * 获取 Logger 单例实例
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * 设置是否为调试模式
     */
    public setDebugMode(isDebug: boolean): void {
        this.isDebugMode = isDebug;
    }

    /**
     * 输出普通日志信息
     */
    public log(message: string, ...args: any[]): void {
        if (this.isDebugMode) {
            console.log(message, ...args);
        }
    }

    /**
     * 输出错误日志信息
     */
    public error(message: string, ...args: any[]): void {
        console.error(message, ...args);
    }

    /**
     * 输出警告日志信息
     */
    public warn(message: string, ...args: any[]): void {
        if (this.isDebugMode) {
            console.warn(message, ...args);
        }
    }

    /**
     * 输出信息日志
     */
    public info(message: string, ...args: any[]): void {
        if (this.isDebugMode) {
            console.info(message, ...args);
        }
    }
} 