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
| `fontFamily`      | Font family of the matrix text  | `'monospace'`           |
| `fontSize`        | Font size of the matrix text    | `16`                    |
| `interval`        | Time between drawing (in ms)    | `33`                    |
| `pageTitle`       | Title of the page               | `'The Matrix'`          |
| `textColor`       | Color of the matrix text        | `'#0F0'` (green)        |
| `womanAllowWalking`    | Whether the woman is allowed to walk | `true`               |
| `womanCooldown`      | Cooldown time for the woman's actions (in seconds)      | `10` (10 seconds)       |
| `womanDressColor`      | Color of the woman's dress      | `'#E60012'` (red)       |
| `womanDressGlowOpacity` | Shadow opacity of the woman's dress | `1.0`               |
| `womanDurationMin`      | Minimum duration the woman stays visible (in seconds)      | `5` (5 seconds)       |
| `womanDurationMax`      | Maximum duration the woman stays visible (in seconds)      | `12` (12 seconds)       |
| `womanEnabled`    | Whether the woman's dress is enabled | `true`               |
| `womanHairColor`      | Color of the woman's hair      | `'#F2CA65'` (blonde)       |
| `womanHairGlowOpacity` | Shadow opacity of the woman's hair | `1.0`               |
| `womanIntervalMin`      | Minimum interval between the woman's appearances (in seconds)      | `10` (10 seconds)       |
| `womanIntervalMax`      | Maximum interval between the woman's appearances (in seconds)      | `20` (20 seconds)       |
| `womanShadowBlur` | Shadow blur of the woman's dress| `8`                     |
| `womanSkinColor`      | Color of the woman's skin      | `'#F8CEB0'` (peach)       |
| `womanSkinGlowOpacity` | Shadow opacity of the woman's skin | `1.0`               |

## Usage
```javascript
const express = require('express');
const { theMatrixRoute } = require('express-router-the-matrix');

const app = express();

const matrixRoute = theMatrixRoute({
    backgroundColor: '#000',
    characters: 'アァカサタナABCDEF123456',
    pageTitle: 'The Matrix',
    textColor: '#0F0',
    womanDressColor: '#E60012',
    womanEnabled: true,
    womanHairColor: '#F2CA65',
    womanSkinColor: '#F8CEB0',
});

app.get('/matrix', matrixRoute);

app.listen(3000);
```
