const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");

const {
    NODE_ENV = 'production',
  } = process.env;

module.exports = (env) => {
    const isDev = NODE_ENV != 'production';
    return {
        entry: "./src/index.ts",
        mode: isDev ? "development" : "production",
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, "dist"),
        },
        target: "node",
        watch: isDev,
        devtool: isDev ? "eval-source-map" : false,
        resolve: {
            extensions: [".js", ".ts"],
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "~": path.resolve(__dirname, "./"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: "ts-loader",
                },
            ],
        },
        plugins: [
            new WebpackShellPlugin({
                onBuildEnd: ["nodemon ./dist/bundle.js"],
            }),
        ],
        externals: [webpackNodeExternals()],
    };
};
