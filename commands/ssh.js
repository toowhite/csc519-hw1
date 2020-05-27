const chalk = require('chalk');
const fs    = require('fs');
const os    = require('os');
const path  = require('path');
const child_process = require('child_process');
const VBoxManage = require('../lib/VBoxManage');

exports.command = 'ssh';
exports.desc = 'ssh into the VM';
exports.builder = yargs => {
    yargs.options({
    });
};


exports.handler = async argv => {
    (async () => {
        await ssh_into_vm();
    })();
};

async function ssh_into_vm()
{
    let name = `V`;    
    console.log(chalk.keyword('pink')(`ssh to ${name}`));

    let state = await VBoxManage.show(name);
    console.log(`VM is currently: ${state}`);
    if( state == 'poweroff' || state == 'aborted') {
        console.log(`${name} is down. Cannot ssh to it.`);
        return;
    }

    let sshCmd = `ssh -q -i "${path.join(os.homedir(), '.bakerx', 'insecure_private_key')}" -p 2800 -o StrictHostKeyChecking=no vagrant@127.0.0.1`;
    console.log(`Connecting with ${sshCmd}`);
    child_process.execSync(sshCmd, {stdio: ['inherit', 'inherit', 'inherit']});

}