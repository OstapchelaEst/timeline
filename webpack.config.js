import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },

  devServer: {
    static: path.resolve('public'),
    port: 3000,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve('src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  { name: 'removeViewBox', active: false },
                  { name: 'removeDimensions', active: true },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
        issuer: /\.(html|css|scss)$/,
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                namedExport: false,
                exportLocalsConvention: 'asIs',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content, loaderContext) => {
                const filePath = loaderContext.resourcePath
                if (filePath.includes('variables.scss')) return content
                return `@use "@/styles/variables.scss" as *;\n${content}`
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content, loaderContext) => {
                const filePath = loaderContext.resourcePath
                if (filePath.includes('variables.scss')) return content
                return `@use "@/styles/variables.scss" as *;\n${content}`
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
