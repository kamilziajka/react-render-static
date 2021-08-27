import { Fragment as ReactFragment, ReactComponentElement, ReactNode } from 'react';
import { renderTag } from './render-tag';

export const renderElement = (element: ReactNode): string => {
    if (
        element === undefined ||
        element === null ||
        typeof element === 'boolean'
    ) {
        return '';
    }

    if (typeof element === 'string' || typeof element === 'number') {
        return `${element}`;
    }

    if (Array.isArray(element)) {
        return element
            .map(element => renderElement(element))
            .join('');
    }

    const { type: Component, props } = <ReactComponentElement<any>>element;

    if (typeof Component === 'function') {
        return renderElement(
            Component.prototype && Component.prototype.isReactComponent ?
                new Component(props) :
                Component(props)
        );
    }

    const { children, ...remainingProps } = props;

    const renderedChildren = renderElement([].concat(children));

    const { type: Fragment } = <ReactComponentElement<typeof ReactFragment>>element;

    if (typeof Fragment === 'symbol' && Fragment === ReactFragment) {
        return renderedChildren;
    }

    return renderTag(Component, remainingProps, renderedChildren);
};
