'use strict';

const path = require('path');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

process.on('unhandledRejection', err => {
    throw err
});

// Check if yarn is available to use, otherwise use npm
const checkYarn = spawnSync('which yarn', [], { shell: true });
const packageManager  = checkYarn.status === 0 ? 'yarn' : 'npm';

console.log(chalk.cyan('Installing packages for client.'));

const install = spawnSync(packageManager + ' install', [], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'inherit',
    shell: true,
});

if (install.error) {
    console.log(chalk.red(`Error occurred.\n${install.error}`));
} else if (install.status === 0) {
    console.log(chalk.green('Packages successfully installed!'));
} else {
    console.log(chalk.red(`${packageManager} install exited with code ${code}`));
}
