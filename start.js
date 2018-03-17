'use strict';

const path = require('path');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

process.on('unhandledRejection', err => {
    throw err
});

const shouldBuild = !process.argv.includes('--no-build');
const cmd = `${shouldBuild ? 'vapor build && ' : ''}vapor run`;

const childProcess = spawnSync(cmd, [], {
    cwd: path.join(__dirname, 'api'),
    stdio: 'inherit',
    shell: true,
});

if (childProcess.error) {
    console.log(chalk.red(`Error occurred.\n${childProcess.error}`));
}
