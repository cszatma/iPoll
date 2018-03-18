'use strict';

const path = require('path');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

process.on('unhandledRejection', err => {
    throw err
});

// Check if yarn is available to use, otherwise use npm
const checkYarn = spawnSync('which yarn', [], { stdio: 'inherit', shell: true });
const packageManager  = checkYarn.status === 0 ? 'yarn' : 'npm';

return;

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
