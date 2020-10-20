# react-render-static

A tool (with CLI) for rendering [React](https://reactjs.org) Components.
Uses custom React renderer that does not perform any Html semantics validation.

Supports [babel](https://babeljs.io).

## Usage

### Library

Pass an element to a `render()` function:

```javascript
import React from 'react';
import { render } from 'react-render-static';

const Compontent = () => <div>Hello World!</div>;
const output = render(<Compontent/>);
console.log(output);
```

Output:
```html
<div>Hello World!</div>
```

### Command line

Have an input file exporting React Component (default export):

```javascript
import React from 'react';

export default () => <div>Hello World!</div>;
```

Run CLI:

```sh
$ react-render-static component.js
```

Output:
```html
<div>Hello World!</div>
```

## License
[MIT](license.md)
