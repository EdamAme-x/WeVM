import './style.css';
import { WebContainer } from '@webcontainer/api';
import { files } from './files';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import { $ } from "./Xuery.min";

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener('load', async () => {

  const fitAddon = new FitAddon();

  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.loadAddon(fitAddon);
  terminal.open(terminalEl);
  terminal.writeln(" ")
  terminal.writeln(" Welcome to WeVM! 🔥 ")
  terminal.writeln(" ")

  fitAddon.fit();

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  const shellProcess = await startShell(terminal);
  window.addEventListener('resize', () => {
    fitAddon.fit();
    shellProcess.resize({
      cols: terminal.cols,
      rows: terminal.rows,
    });
  });
});

/**
 * @param {Terminal} terminal
 */
async function startShell(terminal) {
  const shellProcess = await webcontainerInstance.spawn('jsh', {
    terminal: {
      cols: terminal.cols,
      rows: terminal.rows,
    },
  });
  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );

  const input = shellProcess.input.getWriter();

  terminal.onData((data) => {
    input.write(data);
  });

  return shellProcess;
}

$("#app").in(div({
  class: "terminal"
}, ""))

/** @type {HTMLTextAreaElement | null} */
const terminalEl = $(".terminal").el;