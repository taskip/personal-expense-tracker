// rome-ignore lint: needs any
export interface Type<T = any> extends Function {
// rome-ignore lint: needs any
new (...args: any[]): T;
}

