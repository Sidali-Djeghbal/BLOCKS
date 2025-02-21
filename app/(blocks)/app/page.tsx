"use client";

import React, { useEffect, useRef } from "react";
import * as Blockly from 'blockly';
import { cBlocks } from '../config/blocks/c_blocks';
import { CGenerator } from '../config/generators/c';
import { toolbox } from '../config/toolbox';
import './blockly.css';
import { useState } from 'react';

const BlocklyApp: React.FC = () => {
  const blocklyDivRef = useRef<HTMLDivElement>(null);
  const outputPaneRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [compiling, setCompiling] = useState(false);
  const [output, setOutput] = useState('');

  const handleCompile = async () => {
    if (!workspaceRef.current) return;
    setCompiling(true);
    setOutput('Compiling...');

    try {
      const code = CGenerator.workspaceToCode(workspaceRef.current);
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const result = await response.json();
      setOutput(result.output || 'Compilation successful!');
    } catch (error) {
      setOutput('Error during compilation: ' + (error as Error).message);
    } finally {
      setCompiling(false);
    }
  };
  useEffect(() => {
    if (!blocklyDivRef.current) return;

    // Register blocks
    Blockly.common.defineBlocks(cBlocks);

    // Initialize Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
      toolbox,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      }
    });

    // Handle workspace changes
    workspaceRef.current.addChangeListener(() => {
      if (workspaceRef.current) {
        const code = CGenerator.workspaceToCode(workspaceRef.current);
        const codeElement = document.querySelector('#generatedCode code');
        if (codeElement) {
          codeElement.textContent = code;
        }
      }
    });

    // Handle window resize
    const handleResize = () => {
      if (blocklyDivRef.current && workspaceRef.current) {
        Blockly.svgResize(workspaceRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize

    return () => {
      window.removeEventListener('resize', handleResize);
      workspaceRef.current?.dispose();
    };
  }, []);
  return (
    <div id="pageContainer" className="flex-container">
      <div id="blocklyDiv" ref={blocklyDivRef} className="blockly-workspace"></div>
      <div id="outputPane" ref={outputPaneRef} className="output-pane">
        <pre id="generatedCode" className="generated-code">
          <code></code>
        </pre>
        <div id="output" className="output-area">
          <button
            onClick={handleCompile}
            disabled={compiling}
            className="compile-button"
          >
            {compiling ? 'Compiling...' : 'Compile & Run'}
          </button>
          {output && <pre className="compilation-output">{output}</pre>}
        </div>
      </div>
    </div>
  );
};

export default BlocklyApp;


