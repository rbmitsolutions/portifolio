module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".json"],
        alias: {
          "@components": "./src/components",
          "@pages": "./src/pages",
          "@styles": "./src/styles",
          "@services": "./src/services",
          "@layouts": "./src/layouts",
          "@types": "./src/types",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
};
