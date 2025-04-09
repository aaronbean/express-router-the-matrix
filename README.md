# express-route-the-matrix

Node.js Express route that returns a configurable matrix of falling letters.

## Install
```
npm i express-route-the-matrix
```

## Options
| Option            | Description                     | Default Value           |
|-------------------|---------------------------------|-------------------------|
| `backgroundColor` | Background color of the matrix  | `'#000'` (black)        |
| `characters`      | Characters to use in the matrix | `'アァカサタナABCDEF123456…'` |
| `fontFamily`      | Font family of the matrix text  | `'monospace'`           |
| `fontSize`        | Font size of the matrix text    | `16`                    |
| `interval`        | Time between drawing (in ms)    | `33`                    |
| `pageTitle`       | Title of the page               | `'The Matrix'`          |
| `textColor`       | Color of the matrix text        | `'#0F0'` (green)        |

## Usage
```javascript
const express = require('express');
const { theMatrixRoute } = require('express-route-the-matrix');

const app = express();

const matrixRoute = theMatrixRoute({
    backgroundColor: '#000',
    characters: 'アァカサタナABCDEF123456',
    textColor: '#0F0',
    title: 'The Matrix',
});

app.use('/matrix', matrixRoute);

app.listen(3000);
```
