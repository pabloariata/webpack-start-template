const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');


module.exports = {
    
    mode: 'production',

    output: {
        clean: true, // borra el dist antes de volver a crear el dist
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/, // reg exp para obtener todos los .html
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/, // reg exp para obtener todos los .css
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/, // para copiar el archivo styles.css y aplicarlo al index.html
                use: [MiniCssExtract.loader, "css-loader"],

            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        new HtmlWebPack({
            title: 'WebPack Start App',
            // filename: 'index.html',
            template: './src/index.html' // con esta config, trae el html dentro del index.html de dev, sino solo trae el body vacio
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ],
}