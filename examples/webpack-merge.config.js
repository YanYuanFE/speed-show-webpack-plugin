const merge = require("webpack-merge");
const SpeedMeasurePlugin = require("../index");

const smp = new SpeedMeasurePlugin();
const TARGET = process.env.npm_lifecycle_event;

const commonConfig = {
  entry: {
    app: ["./index.js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style", "css"],
      },
    ],
  },
};

let mergedConfig = commonConfig;

if (TARGET === "start") {
  mergedConfig = merge(common, {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: "babel?stage=1",
        },
      ],
    },
  });
}

// The only difference to how you normally use webpack-merge is that you need
// to `smp.wrap` whatever your final config is
module.exports = smp.wrap(mergedConfig);
