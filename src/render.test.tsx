import React from 'react';

import { render } from './render';

describe('render', () => {
    it('should properly render an element', () => {
        const element = (
            <span>
                <div>hello world</div>
                <div>test</div>
            </span>
        );

        const result = render(element);

        expect(result).toBe(
            '<span>' +
            '<div>hello world</div>' +
            '<div>test</div>' +
            '</span>'
        );
    });

    it('should properly render an element and prettify an output', () => {
        const element = (
            <span>
                <div>hello world</div>
                <div>test</div>
            </span>
        );

        const result = render(element, { prettify: true });

        expect(result).toBe(
            '<span>\n' +
            '  <div>hello world</div>\n' +
            '  <div>test</div>\n' +
            '</span>'
        );
    });
});
