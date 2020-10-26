const path = require('path');

module.exports = {
    mode: 'none', // 
    entry: './src/index.css', //入口文件路径
    output: {
        filename: 'builde.js', //出口文件路径
        path: path.join(__dirname, 'dist') //指定输出文件所在目录,这里必须是绝对路径，所以通过Node中path模块生成绝对路径
    }
    modules: {
        rules: [{
            test: /\.css$/,
            use: ['css-loader']
        }]
    }
}