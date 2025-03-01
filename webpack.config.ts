import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, {Configuration} from 'webpack';
import {Configuration as DevServerConfiguration} from 'webpack-dev-server';

type Mode = "production" | "development";

interface EnvInterface {
    mode: Mode;
    port: number;
}

const config = (env: EnvInterface): webpack.Configuration => {
    const config: webpack.Configuration = {
        mode: 'production',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            assetModuleFilename: 'assets/[name][ext]',
            publicPath: "/",
            clean: true,
        },
        
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new webpack.ProgressPlugin()
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
                      "style-loader",
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
            historyApiFallback: {
                index: "/index.html", // Указывает, что при 404 возвращаем index.html
            },
            static: path.resolve(__dirname, "public"), // Раздаем файлы из public
            hot: true,
            port: env.port,
            open: true,
        }
    };

    return config;
};

export default config;
