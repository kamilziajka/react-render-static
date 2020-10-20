import { stringifyProps } from './stringify-props';

export const renderTag = (type: string, props: any, content: any): string => {
    const typeAndProps = [type, ...stringifyProps(props)].join(' ');

    return content ?
        `<${typeAndProps}>${content}</${type}>` :
        `<${typeAndProps}/>`;
};
