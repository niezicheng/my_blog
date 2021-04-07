const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})

// const withCss = require('@zeit/next-css');
// const withSass = require('@zeit/next-sass');
// module.exports = {
//   webpack(config, ...args) {
//     config = withCss().webpack(config, ...args);
//     config = withSass().webpack(config, ...args);
//     return config;
//   }
// }