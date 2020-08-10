module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `
          @import "@/scss/_variables";
          @import "@/scss/_fonts";
          @import "@/scss/_typography";
          @import "@/scss/base";
          @import "@/scss/_buttons";
          @import "@/scss/_links";
          @import "@/scss/_mapNav";
          `
        }
      }
    }
  };