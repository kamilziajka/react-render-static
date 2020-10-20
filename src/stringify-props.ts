export const stringifyProps = (props: any): string[] => {
    return Object
        .entries(props || {})
        .map(([key, value]) => `${key}="${value}"`);
};
