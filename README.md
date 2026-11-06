# express-router-the-matrix

Node.js Express route that returns a configurable matrix of falling letters.

## Install
```
npm i express-router-the-matrix
```

## Options
| Option            | Description                     | Default Value           |
|-------------------|---------------------------------|-------------------------|
| `backgroundColor` | Background color of the matrix  | `'#000'` (black)        |
| `characters`      | Characters to use in the matrix | `'アァカサタナABCDEF123456…'` |
| `dressColor`      | Color of the woman's dress      | `'#FF1A1A'` (red)       |
| `dressEnabled`    | Whether the woman's dress is enabled | `true`               |
| `dressShadowBlur` | Shadow blur of the woman's dress| `8`                     |
| `dressShadowOpacity` | Shadow opacity of the woman's dress | `1.0`               |
| `dressSheenColor` | Sheen color of the woman's dress| `'#FFB3B3'` (light red) |
| `fontFamily`      | Font family of the matrix text  | `'monospace'`           |
| `fontSize`        | Font size of the matrix text    | `16`                    |
| `interval`        | Time between drawing (in ms)    | `33`                    |
| `pageTitle`       | Title of the page               | `'The Matrix'`          |
| `textColor`       | Color of the matrix text        | `'#0F0'` (green)        |

## Usage
```javascript
const express = require('express');
const { theMatrixRoute } = require('express-router-the-matrix');

const app = express();

const matrixRoute = theMatrixRoute({
    backgroundColor: '#000',
    characters: 'アァカサタナABCDEF123456',
    dressColor: '#FF1A1A',
    pageTitle: 'The Matrix',
    textColor: '#0F0',
});

app.get('/matrix', matrixRoute);

app.listen(3000);
```
