import React from 'react';

import { renderElement } from './render-element';

describe('renderElement', () => {
    it('should properly handle an undefined value', () => {
        const element = undefined;
        const result = renderElement(element);
        expect(result).toBe('');
    });

    it('should properly handle a null value', () => {
        const element = null;
        const result = renderElement(element);
        expect(result).toBe('');
    });

    it('should properly handle a boolean true value', () => {
        const element = true;
        const result = renderElement(element);
        expect(result).toBe('');
    });

    it('should properly handle a boolean false value', () => {
        const element = false;
        const result = renderElement(element);
        expect(result).toBe('');
    });

    it('should properly handle a string value', () => {
        const element = 'hey';
        const result = renderElement(element);
        expect(result).toBe('hey');
    });

    it('should properly handle a string value with emojis', () => {
        const element = 'hello world 🍫 poop 💩 test';
        const result = renderElement(element);
        expect(result).toBe('hello world 🍫 poop 💩 test');
    });

    it('should properly handle a number value', () => {
        const element = 1337;
        const result = renderElement(element);
        expect(result).toBe('1337');
    });

    it('should stringify arrays', () => {
        const element = [
            <div/>,
            <span/>,
            <form>hello</form>
        ];
        const result = renderElement(element);
        expect(result).toBe('<div/><span/><form>hello</form>');
    });

    it('should stringify fragments', () => {
        const element = (
            <React.Fragment>
                <div/>
                <span/>
                <form>hello</form>
            </React.Fragment>
        );

        const result = renderElement(element);
        expect(result).toBe('<div/><span/><form>hello</form>');
    });

    it('should stringify fragments defined using short syntax', () => {
        const element = (
            <>
                <div/>
                <span/>
                <form>hello</form>
            </>
        );

        const result = renderElement(element);
        expect(result).toBe('<div/><span/><form>hello</form>');
    });

    it('should stringify a tag', () => {
        // @ts-ignore
        const element = <foo/>;
        const result = renderElement(element);
        expect(result).toBe('<foo/>');
    });

    it('should stringify a tag with a property', () => {
        // @ts-ignore
        const element = <lorem-ipsum answer={42}/>;
        const result = renderElement(element);
        expect(result).toBe('<lorem-ipsum answer="42"/>');
    });

    it('should stringify a tag with a child', () => {
        // @ts-ignore
        const element = <bar>hello</bar>;
        const result = renderElement(element);
        expect(result).toBe('<bar>hello</bar>');
    });

    it('should stringify a tag with a property and a child', () => {
        // @ts-ignore
        const element = <div><strong>hello 123</strong></div>;
        const result = renderElement(element);
        expect(result).toBe('<div><strong>hello 123</strong></div>');
    });

    it('should stringify components', () => {
        // @ts-ignore
        const Component = () => <marquee>choo choo</marquee>;
        const element = <div><Component/></div>;

        const result = renderElement(element);

        expect(result).toBe('<div><marquee>choo choo</marquee></div>');
    });

    it('should stringify components with props', () => {
        // @ts-ignore
        const Item = ({ value }) => <li>{ value }</li>;
        const element = (
            <ul>
                <Item value='aaa'/>
                <Item value='bbb'/>
                <Item value='ccc'/>
            </ul>
        );

        const result = renderElement(element);

        expect(result).toBe(
            '<ul>' +
            '<li>aaa</li>' +
            '<li>bbb</li>' +
            '<li>ccc</li>' +
            '</ul>'
        );
    });

    it('should stringify nested components', () => {
        const ComponentA = ({ value }: { value: string }) => <h1 color={'red'}>{ value }</h1>;
        const ComponentB = ({ x } : { x: string }) => <iframe><ComponentA value={x}/></iframe>;
        const ComponentC = () => <ComponentB x='wat'/>;
        const element = <div><ComponentC/></div>

        const result = renderElement(element);

        expect(result).toBe(
            '<div>' +
            '<iframe>' +
            '<h1 color="red">wat</h1>' +
            '</iframe>' +
            '</div>'
        );
    });

    it('should properly persist nested string values with whitespace', () => {
        const text = `test
        of a magic
        | text with
        | indentation
        
        `;

        const element = <div><span><h2>{ text }</h2></span></div>;

        const result = renderElement(element);

        expect(result).toBe(
            '<div>' +
            '<span>' +
            '<h2>' +
            `test
        of a magic
        | text with
        | indentation
        
        ` +
            '</h2>' +
            '</span>' +
            '</div>'
        );
    });
});
