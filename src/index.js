import * as Blockly from 'blockly';
import { cBlocks } from './blocks/c_blocks';
import {CGenerator} from './generators/c';
import { toolbox } from './toolbox';
import './index.css';

// Register blocks
Blockly.common.defineBlocks(cBlocks);

// Set up Blockly workspace
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, { toolbox });

// Generate C code
const generateCode = () => {
  const code = CGenerator.workspaceToCode(ws);
  console.log(CGenerator.workspaceToCode(ws));  // Check generated C code

  document.getElementById('generatedCode').innerText = code;
};

// Listen for changes
ws.addChangeListener(() => generateCode());
