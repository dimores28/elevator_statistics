// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
	filenameHashing: false,
	productionSourceMap: false,
	chainWebpack: config => {
		config.module
		  .rule('vue')
		  .use('vue-loader')
		  .tap(options => {
			options['compilerOptions'] = {
			  ...options.compilerOptions || {},
			  isCustomElement: tag => tag === 'hgroup'
			};
			return options;
		  })
	  }
}

// chainWebpack: config => {
//     config.module
//       .rule('vue')
//       .use('compiler-dom')
//       .tap(options => {
//         options.compilerOptions = {
//           isCustomElement: tag => tag == "hgroup"
//         };
//         return options;
//       });
//   }