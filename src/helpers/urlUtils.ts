export const getQueryParams = (url: string): Record<string, string> => {
    const queryParams: Record<string, string> = {};
    new URL(url).searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });
    return queryParams;
};