import { Configuration } from "webpack";
import * as path from "path";
import rxPath = require("rxjs/_esm5/path-mapping");
import * as HtmlWebPackPlugin from "html-webpack-plugin";

const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

const config: Configuration = {
    devtool: isProd ? "hidden-source-map" : "cheap-eval-source-map",
    context: path.resolve("./src"),
    entry: "./main.ts",
    output: {
        path: path.resolve("./dist"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].map",
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.ts$|\tsx.$/,
                exclude: ["node_modules"],
                loader: "ts-loader",
            },

        ],
    },
    resolve: {
        extensions: [".ts", ".tsx"],
        modules: [path.resolve("./src"), "node_modules"],
        alias: rxPath(),
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "RxJsTest",
            showErrors: true,
        }),
    ],
};

module.exports = config;
