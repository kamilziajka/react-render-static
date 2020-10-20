import { renderTag } from './render-tag';

describe('renderTag', () => {
    it('should stringify a tag without props and content', () => {
        const result = renderTag('div', null, null);
        expect(result).toBe('<div/>');
    });

    it('should stringify a tag without props', () => {
        const result = renderTag('div', null, 'hello world');
        expect(result).toBe('<div>hello world</div>');
    });

    it('should stringify a tag without content', () => {
        const result = renderTag('div', { foo: 'bar' }, null);
        expect(result).toBe('<div foo="bar"/>');
    });

    it('should stringify a tag with props and content', () => {
        const result = renderTag('div', { lorem: 'ipsum', dolor: 'sit' }, 'hey ho');
        expect(result).toBe('<div lorem="ipsum" dolor="sit">hey ho</div>');
    });
});
