import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import TerserPlugin from "terser-webpack-plugin"


type Mode = "production" | "development";

interface EnvInterface {
    mode: Mode;
    port: number;
}

const config = (env: EnvInterface): webpack.Configuration => {
    const isDev = env.mode == 'development'
    const isProd = env.mode == 'production'

    const config: webpack.Configuration = {
        mode: env.mode,
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
            assetModuleFilename: 'assets/[name][ext]',
            publicPath: "/",
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new webpack.ProgressPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|jpg|mp3)$/i,
                    type: 'asset/resource',
                  },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      isProd ? MiniCssExtractPlugin.loader : "style-loader",
                      "css-loader",
                      "sass-loader",
                    ],
                  },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: {
            historyApiFallback: true,
            static: path.resolve(__dirname, "public"), // Раздаем файлы из public
            hot: true,
            port: env.port,
            open: true,
        } as DevServerConfiguration,
        optimization: {
            splitChunks: {
            chunks: 'all'
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify,
                    terserOptions: {
                        compress: {
                            drop_console: true
                        }
                    }
                })
            ]
          },
    };
    if (isProd) {
        config.plugins.push(new MiniCssExtractPlugin({
            filename: `css/[name].[contenthash:8].css`,
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
        // config.plugins.push(new BundleAnalyzerPlugin({
        //     analyzerPort: 8889,
        // }))
    }

    return config;
};

export default config;
