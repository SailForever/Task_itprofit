const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [path.resolve(__dirname, 'src/frontend/styles')],
							},
						},
					},
				],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin()],
	devServer: {
    static: path.join(__dirname, 'public'),
    hot: true,
    open: true,
	},
}
