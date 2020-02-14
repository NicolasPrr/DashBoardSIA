const { override, fixBabelImports, addLessLoader } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#7285AB",
      // "@menu-dark-bg": "#5B5C5E",
      //  "@menu-dark-color": "#5B5C5E",
       "@layout-header-background": "#5B5C5E"
    }
  })
);
