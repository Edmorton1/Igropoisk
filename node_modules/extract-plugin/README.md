# webpack Extract Plugin

Extract any kind of files from a webpack build. Based on the `mini-css-extract-plugin` and similar to the `extract-text-webpack-plugin` but also works for webpack 4.

> Currently under development, only the most basic cases work reliably.

## Installation

```
npm i extract-plugin
```

## Usage

`src/index.js` Entry file

```js
import './some.properties'
import './more.properties'
```

`src/some.properties` First file to be extracted

```
Header.Title = Hello World
Header.Subtitle = How are you doing?
```

`src/more.properties` Second file to be extracted

```
Footer.Greeting = All rights reserved.
```

`webpack.config.js`

```js
const ExtractPlugin = require('extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.properties$/,
        use: [
          {
            loader: ExtractPlugin.loader
          },
          'raw-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractPlugin({
      filename: "[name].properties"
    })
  ]
}
```

`dist/main.properties` File with the extracted contents built by webpack

```
Header.Title = Hello World
Header.Subtitle = How are you doing?
Footer.Greeting = All rights reserved.
```

## Options

The plugin can be configured with options.

```
new ExtractPlugin({
  removeNewLine: true
})
```

`removeNewLine` default `false`

Removes the new line at the end of each file. Often these lines are added by the editor to make writing code easier.

## License

MIT
