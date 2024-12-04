const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    // 진입점 (컴파일할 타입스크립트 파일들의 시작점 지정)
    popup: "./src/popup/popup.ts",
    background: "./src/background/background.ts",
    content: "./src/content/content.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 결과물이 저장될 폴더
    filename: "[name]/[name].js", // 출력 파일 이름 형식
    environment: {
      // 구형 브라우저
      arrowFunction: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 파일에 대해
        use: "ts-loader", // ts-loader를 사용
        exclude: /node_modules/, // node_modules 제외
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // ts나 js 확장자 자동 해석
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // 그대로 복사할 파일들
        { from: "manifest.json", to: "manifest.json" },
        { from: "src/popup/popup.html", to: "popup/popup.html" },
        { from: "src/popup/popup.css", to: "popup/popup.css" },
      ],
    }),
  ],
};
