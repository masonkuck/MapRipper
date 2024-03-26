var WebpackObfuscator = require('webpack-obfuscator');
module.exports = {
plugins: [
    new WebpackObfuscator ({
        stringArray: true,
    }, ['vendor.js'])
   ]
}