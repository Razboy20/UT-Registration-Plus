import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import { RuleSetRule, RuleSetUseItem } from 'webpack';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

type test = Exclude<RuleSetUseItem, string>;

function buildStyleLoaders(cssLoaderOptions: Record<string, any>): RuleSetUseItem[] {
    const loaders: (string | Record<string, any>)[] = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: { ...cssLoaderOptions, sourceMap: false },
        },
    ];
    if (process.env.NODE_ENV === 'production') loaders.push('postcss-loader');
    return loaders;
}

export const cssLoader: RuleSetRule = {
    test: cssRegex,
    exclude: cssModuleRegex,
    sideEffects: true,
    use: [
        ...buildStyleLoaders({
            importLoaders: 1,
            esModule: false,
        }),
    ],
};

export const cssModuleLoader: RuleSetRule = {
    test: cssModuleRegex,
    use: [
        ...buildStyleLoaders({
            importLoaders: 1,
            modules: {
                getLocalIdent: getCSSModuleLocalIdent,
            },
        }),
    ],
};

export const sassLoader: RuleSetRule = {
    test: sassRegex,
    exclude: sassModuleRegex,
    sideEffects: true,
    use: [
        ...buildStyleLoaders({
            importLoaders: 2,
        }),
        'sass-loader',
    ],
};

export const sassModuleLoader: RuleSetRule = {
    test: sassModuleRegex,
    use: [
        ...buildStyleLoaders({
            importLoaders: 2,
            modules: {
                getLocalIdent: getCSSModuleLocalIdent,
            },
        }),
        'sass-loader',
    ],
};
