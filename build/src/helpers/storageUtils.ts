export const setToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): any => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
