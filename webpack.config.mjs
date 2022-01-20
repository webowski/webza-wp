import { resolve }              from 'path'
import fs                       from 'fs-extra'
import chalk                    from 'chalk'
import chokidar                 from 'chokidar'
import BeforeBuildPlugin        from 'before-build-webpack'
import MiniCssExtractPlugin     from 'mini-css-extract-plugin'
import SVGSpritemapPlugin       from 'svg-spritemap-webpack-plugin'
import { VueLoaderPlugin }      from 'vue-loader'

const __dirname = resolve()
const mode = process.env.NODE_ENV || 'development'
const target = mode === 'development' ? 'web' : 'browserslist'

export default {
	mode: mode,

	context: __dirname,

	entry: {
		styles: './styles/index.scss',
		bundle: './scripts/index.js',
	},

	output: {
		path: __dirname,
		filename: 'scripts/[name].min.js',
		assetModuleFilename: 'images/[hash][ext][query]',
		chunkFilename: '[id].[chunkhash].js',
	},

	module: {
		rules: [

			// Styles
			{
				test: /\.(scss|css)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '',
						}
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env'],
									// ['flex-gap-polyfill', ],
								]
							}
						}
					},
					'sass-loader',
				]
			},

			// Images
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},

			// Scripts
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						cacheDirectory: true,
					}
				}
			},

			// Vue
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      },

		]
	},

	plugins: [
		new BeforeBuildPlugin(function(stats, callback) {
			console.log( '\n' + chalk.blue.bold('Run webpack build') + ' on ' + chalk.green.bold(__dirname) )
			// cleanTwigCache(callback)
			callback()
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].min.css',
		}),
		new SVGSpritemapPlugin('./images/icons/*.svg', {
			output: {
				filename: 'images/icons.min.svg',
				svgo: false,
			},
			sprite: {
				prefix: false,
				generate: {
					title: false,
				}
			}
		}),
		new VueLoaderPlugin(),
	],

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
      // 'vue': mode === 'development' ? 'vue/dist/vue.esm-browser' : 'vue/dist/vue.esm-browser.prod',
      'vue': 'vue/dist/vue.esm-browser',
      // 'vue': 'vue/dist/vue.esm-bundler',
		},
	},

	watchOptions: {
		ignored: '**/node_modules',
	},

	target: target,
	devtool: mode === 'development' ? 'source-map' : false,
	performance: {
		// hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},

	// Host
	// devServer: {
	// 	before(app, server) {
	// 		console.log('before')
	// 		chokidar.watch([
	// 			'./**/*.php',
	// 			'./**/*.twig',
	// 			'./**/*.html',
	// 		], {
	// 			ignored: /(node_modules|cache)/,
	// 		}).on('all', function() {
	// 			// fs.rmdir('./cache/twig', { recursive: true })
	// 			server.sockWrite(server.sockets, 'content-changed');
	// 		})
	// 	},
	// 	host: 'site.loc',
	// 	port: 3000,
	// 	// proxy: {
	// 	// 	'/': {
	// 	// 		target: 'http://site.ru:3000',
	// 	// 	},
	// 	// },
	// 	// proxy: {
	// 	// 	'/api': 'http://localhost:3000',
	// 	// 	pathRewrite: { '^/api' : '' }
	// 	// },
	// 	// publicPath: '/',
	// 	// hot: true,
	// 	contentBase: __dirname,
	// 	watchContentBase: true,
	// },

	// Static
	devServer: {
    static: {
			directory: __dirname,
      staticOptions: {},
      publicPath: "/",
      serveIndex: true,
      watch: true,
    },
		setupMiddlewares: function(middlewares, devServer) {

			// middlewares.unshift({
			// 	name: 'before',
			// 	middleware: (req, res) => {
			// 		chokidar.watch([
			// 			'./**/*.php',
			// 			'./**/*.twig',
			// 			'./**/*.html',
			// 		], {
			// 			ignored: /(node_modules|cache)/,
			// 		}).on('all', function() {
			// 			// fs.rmdir('./cache/twig', { recursive: true })
			// 			console.log('chokidar')
			// 			devServer.sendMessage(devServer.sockets, 'content-changed');
			// 		})
			// 		res.send('Foo!')
			// 	}
			// })

			return middlewares
		},
  },

}

function cleanTwigCache(callback) {
	fs.emptyDir('./cache/twig')
		.then(() => {
			console.log(
				chalk.green( 'Twig cache is cleaned' )
			)
			callback()
		})
		.catch(err => {
			console.log(
				chalk.red( 'Twig cache is not cleaned' )
			)
			// console.error(err)
			callback()
		})
}
