
export function getConfig(key: string): string {
    const res =  process.env[key] ?? '';
    return res;
};