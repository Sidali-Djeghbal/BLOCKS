import * as Blockly from 'blockly';

export const CGenerator = new Blockly.Generator('C');

CGenerator.ORDER_ATOMIC = 0;
CGenerator.ORDER_ASSIGNMENT = 1;
CGenerator.ORDER_NONE = 99;

CGenerator.forBlock = {
  'c_print_number': function(block) {
    let number = CGenerator.valueToCode(block, 'NUMBER', CGenerator.ORDER_NONE) || '0';
    return `printf("%d", ${number});\n`;  // Change `%d` to `%f` for floats
  },
  'c_print_text': function(block){
    let text = CGenerator.valueToCode(block, 'TEXT', CGenerator.ORDER_NONE) || '""';
    return `printf("%s", ${text});\n`;
  },
  'c_variable_declare': function(block) {
    const type = block.getFieldValue('TYPE');
    const variable = block.getFieldValue('VAR');
    const value = CGenerator.valueToCode(block, 'VALUE', CGenerator.ORDER_ASSIGNMENT) || '0';

    return `${type} ${variable} = ${value};\n`;
  },

  'c_if': function(block) {
    const condition = CGenerator.valueToCode(block, 'CONDITION', CGenerator.ORDER_NONE) || '0';
    const statements = CGenerator.statementToCode(block, 'DO');
    return `if (${condition}) {\n${statements}}\n`;
  },

  'c_while': function(block) {
    const condition = CGenerator.valueToCode(block, 'CONDITION', CGenerator.ORDER_NONE) || '0';
    const statements = CGenerator.statementToCode(block, 'DO');
    return `while (${condition}) {\n${statements}}\n`;
  },

  'c_for': function(block) {
    const variable = block.getFieldValue('VAR');
    const start = block.getFieldValue('START');
    const condition = CGenerator.valueToCode(block, 'CONDITION', CGenerator.ORDER_NONE) || '1';
    const step = CGenerator.valueToCode(block, 'STEP', CGenerator.ORDER_NONE) || '1';
    const statements = CGenerator.statementToCode(block, 'DO');
    return `for (int ${variable} = ${start}; ${condition}; ${variable} += ${step}) {\n${statements}}\n`;
  },

  'c_function': function(block) {
    const name = block.getFieldValue('NAME');
    const body = CGenerator.statementToCode(block, 'BODY');
    return `void ${name}() {\n${body}}\n`;
  },

  // 🔹 Generator for c_number
  'c_number': function(block) {
    let number = block.getFieldValue('NUM');
    return [number, CGenerator.ORDER_ATOMIC];
  },

  // 🔹 Generator for c_arithmetic
  'c_arithmetic': function(block) {
    let A = CGenerator.valueToCode(block, 'A', CGenerator.ORDER_ATOMIC) || '0';
    let B = CGenerator.valueToCode(block, 'B', CGenerator.ORDER_ATOMIC) || '0';
    let operator = block.getFieldValue('OP');
    return [`(${A} ${operator} ${B})`, CGenerator.ORDER_ATOMIC];
  },
  'c_variable_get': function(block) {
    const variable = block.getFieldValue('VAR');
    return [variable, CGenerator.ORDER_ATOMIC];
  },
  'c_logic_compare':function(block){
    let A = CGenerator.valueToCode(block, 'A', CGenerator.ORDER_ATOMIC) || '0';
    let B = CGenerator.valueToCode(block, 'B', CGenerator.ORDER_ATOMIC) || '0';
    let operator = block.getFieldValue('OP');

    return [`(${A} ${operator} ${B})`, CGenerator.ORDER_ATOMIC];
  },
  'c_text':function(block){
    let text = block.getFieldValue('TEXT');
    return [`"${text}"`, CGenerator.ORDER_ATOMIC];
  }
};


CGenerator.init = function(workspace) {
    this.definitions_ = Object.create(null);
    this.functionDefinitions_ = Object.create(null);
  
    if (!this.nameDB_) {
      this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
    } else {
      this.nameDB_.reset();
    }
  };
  
  CGenerator.finish = function(code) {
    let includes = '#include <stdio.h>\n#include <stdlib.h>\n\n';
  
    if (!code.includes('int main')) {
      code = 'int main() {\n' + this.prefixLines(code, '    ') + '\n    return 0;\n}';
    }
  
    return includes + code;
  };
  
  CGenerator.scrubNakedValue = function(line) {
    return line + ';\n';
  };
  
  CGenerator.quote_ = function(string) {
    return '"' + string.replace(/\\/g, '\\\\')
                       .replace(/\n/g, '\\n')
                       .replace(/\"/g, '\\"') + '"';
  }; 