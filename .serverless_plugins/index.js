const AWS = require("aws-sdk");
const lamda = new AWS.Lambda();

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      invoke: {
        usage: 'Invokes lambda created by service',
        lifecycleEvents: ['process'],
        options: {
          message: {
            usage: ": ",
            required: false,
            shortcut: 'h',
          },
        },
      },
    };

    this.hooks = {
      'invoke:process': this.process.bind(this)
    };
  }

  async process() {
    const params = {
      FunctionName: 'vf-project-dev-processData',
    };
    const res = await lamda.invoke(params);
    this.serverless.cli.log(JSON.stringify(res));
  }
}

module.exports = ServerlessPlugin;
