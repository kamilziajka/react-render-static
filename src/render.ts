import { ReactNode } from 'react';

import { renderElement } from './render-element';
import xmlFormatter from 'xml-formatter';

type Config = {
    prettify: boolean
};

const prettify = (input: string) => xmlFormatter(input, {
    indentation: '  ',
    lineSeparator: '\n',
    collapseContent: true
});

export const render = (element: ReactNode, config?: Config): string => {
    let output = renderElement(element);

    output = config?.prettify ? prettify(output) : output;

    return output;
};
