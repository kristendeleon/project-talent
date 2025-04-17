//const Dotenv = require('dotenv-webpack');
//console.log(process.env)

//module.exports = {
//    context: __dirname,
//    entry: {
//        homePage: './ReactScripts/Home.js'
//    },
//    output:
//    {
//        path: __dirname + "/dist",
//        filename: "[name].bundle.js"
//    },
//    mode: 'development',
//    watch: true,
//    module: {
//        rules: [
//            {
//                test: /\.jsx?$/,
//                exclude: /(node_modules)/,
//                use: {
//                    loader: 'babel-loader',
//                    options: {
//                        presets: ['babel-preset-env', 'babel-preset-react']
//                    }
//                }
//            },
//            {
//                test: /\.css$/,
//                loaders: [
//                    'style-loader',
//                    'css-loader?modules'
//                ]
//            }
//        ]
//    },
//    plugins: [
//        new Dotenv({
//            path: '.env.development'
//        })
//    ]
   
//}
const Dotenv = require('dotenv-webpack');
const { webpack } = require('webpack');


module.exports = (env, argv) => {
    const envPath = env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env'
    console.log(envPath)
    const config = {
        context: __dirname,
        entry: {
            homePage: './ReactScripts/Home.js'
        },
        output:
        {
            path: __dirname + "/dist",
            filename: "[name].bundle.js"
        },
        watch: true,
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env', 'babel-preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader?modules'
                    ]
                }
            ]
        },
        plugins: [
            new Dotenv({
                path: envPath
            })
        ]
    }

    return config;
}