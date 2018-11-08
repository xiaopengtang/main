const { execFile, exec } = require('child_process');
const fs = require('fs')

const str = 
`#!/bin/sh
cd /dev-center/main
git fetch origin 
git fetch origin/master
cd /dev-center/main/sso/
rm -rf node_modules/ 
cnpm i
`


const createSh = name => new Promise(resolve => {
    return fs.writeFile(name, str, {mode: 7}, e => resolve())
})
const mode = (name, mode) => new Promise(resolve => fs.chmod(name, mode, e => resolve())) 

const init = () => new Promise(async(resolve, reject) => {
    // const sh = './demo.sh'
    // await createSh(sh)
    // await mode(sh, '777')
    const child = exec(str, (error, stdout, stderr) => {
        // console.log({stdout, stderr});
        if (error) {
            // console.log({error})
            reject(error)
            // throw error;
        }
    //   console.log(stdout);
    });
    // console.log(child)
    child.stdout.on('data', (data) => {
        console.log(`输出：${data}`);
    });
    child.stderr.on('data', (data) => {
        // console.log(`错误：${data}`);
    });
      
    child.on('close', (code) => {
        // console.log(`子进程退出码：${code}`);
        resolve()
    });
})

// process.on('error', e => console.log('this is process', e))

init().then(() => console.log('this is over')).catch(e => console.log(e))
