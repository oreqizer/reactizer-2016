import { join } from 'path';
import { exec } from 'shelljs';

export default function (command) {
  return cb => {
    const child = exec(join(__dirname, `../../node_modules/.bin/${command}`), { async: true });

    child.on('close', cb);
  };
}
