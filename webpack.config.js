const path = require('path');
// 引入HTML插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件，每次打包会清空之前的文件再生产新的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 打包后文件的目录
		path: path.resolve(__dirname, 'dist'),
		// 打包后的文件
		filename: 'bundle.js',
		// 告诉webpack不使用箭头函数
		environment: {
			arrowFunction: false,
		}
	},
	// 打包时要用到的模块
	module: {
		rules: [
			{
				// 规则生效的文件
				test: /\.ts$/,
				// 要使用的loader
				use: [
					{
						loader: 'babel-loader',
						options: {
							// 设置预定义环境
							presets: [
								[
									'@babel/preset-env',
									{
										// 要兼容的浏览器
										targets: {
											"chrome": '88',
										},
										corejs: '3',
										// 按需使用 corejs
										useBuiltIns: 'usage'
									}
								]
							]
						}
					},
					'ts-loader'
				],
				// 要排除的文件
				exclude: /node-modules/
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											browsers: 'last 2 versions',
										}
									]
								]
							}
						}
					},
					'less-loader'
				]
			}
		]
	},
	// 配置webpack插件
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(),
	],
	// 用来设置引用模块
	resolve: {
		extensions: [ '.ts', '.js' ],
	}
}