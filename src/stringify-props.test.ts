import { stringifyProps } from './stringify-props';

describe('stringifyProps', () => {
    it('should return an empty string for null value', () => {
        const result = stringifyProps(null);
        expect(result).toEqual([]);
    });

    it('should return an empty string for undefined value', () => {
        const result = stringifyProps(undefined);
        expect(result).toEqual([]);
    });

    it('should properly stringify a pair with a string', () => {
        const result = stringifyProps({ lorem: 'ipsum' });
        expect(result).toEqual(['lorem="ipsum"']);
    });

    it('should properly stringify a pair with a number', () => {
        const result = stringifyProps({ thing: 42 });
        expect(result).toEqual(['thing="42"']);
    });

    it('should properly stringify a pair with a boolean', () => {
        const result = stringifyProps({ test: false });
        expect(result).toEqual(['test="false"']);
    });

    it('should properly stringify multiple pairs', () => {
        const result = stringifyProps({ a: '1', b: 2, c: true });
        expect(result).toEqual(['a="1"', 'b="2"', 'c="true"']);
    });
});
