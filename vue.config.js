const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
});

module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
        @import "@/assets/scss/_variables.scss";
        @import "@/assets/scss/_functions.scss";
        @import "@/assets/scss/_mixins.scss";
        @import "@/assets/scss/_classes.scss";
             
        `,
			},
		},
	},
};