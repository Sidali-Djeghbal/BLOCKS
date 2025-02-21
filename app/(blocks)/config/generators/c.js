import * as Blockly from 'blockly';

export const CGenerator = new Blockly.Generator('C');

CGenerator.ORDER_ATOMIC = 0;
CGenerator.ORDER_ASSIGNMENT = 1;
CGenerator.ORDER_NONE = 99;

CGenerator.forBlock = {
  'c_print_number': function(block) {
    let number = CGenerator.valueToCode(block, 'NUMBER', CGenerator.ORDER_NONE) || '0';
    let varType = block.getFieldValue('VAR_TYPE');
    
    let format;
    switch(varType) {
        case 'float':
            format = '%f';
            break;
        case 'double':
            format = '%lf';
            break;
        default:
            format = '%d';
    }
    
    return `printf("${format}", ${number});\n`;
},
  'c_print_text': function(block){
    let text = block.getFieldValue("TEXT_INPUT") || ""; 
    return `printf("${text}");\n`;  
  },
  'c_variable_declare': function(block) {
    var variableType = block.getFieldValue('TYPE');  
    var variableName = block.getFieldValue('VAR');   
    var variableValue = CGenerator.valueToCode(block, 'VALUE', CGenerator.ORDER_ATOMIC) || '0'; 
     return `${variableType} ${variableName} = ${variableValue};\n`;

},
'variable_set':function(block){
  var varName = block.getFieldValue('VAR'); 
    var operation = block.getFieldValue('OPERATION');
    var value = CGenerator.valueToCode(block, "VALUE", CGenerator.ORDER_ATOMIC) || "0";

    var code = varName + " " + operation + " " + value + ";\n";
    return code;
},

  'c_if': function(block) {
    const condition = CGenerator.valueToCode(block, 'CONDITION', CGenerator.ORDER_NONE) || '0';
    const statements = CGenerator.statementToCode(block, 'DO');
    return `if (${condition}) {\n${statements}}\n`;
  },
  'c_else':function(block){
    const statements = CGenerator.statementToCode(block, 'DO');
    return `else {\n${statements}}\n`;
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

  'c_main': function(block) {
    var statements_body = CGenerator.statementToCode(block, 'BODY').trim();  
    var code = `int main() {\n${statements_body}\n  return 0;\n}\n`;
    return code;
  },

  'c_function': function(block) {
  
  var functionName = block.getFieldValue('NAME');
  var param1 = CGenerator.valueToCode(block, 'PARAM1', CGenerator.ORDER_ATOMIC) || '';
  var param2 = CGenerator.valueToCode(block, 'PARAM2', CGenerator.ORDER_ATOMIC) || '';
  var statements = CGenerator.statementToCode(block, 'BODY') || '  // Empty function\n';
  

  var parameters = param1 + (param1 && param2 ? ', ' : '') + param2 || 'void';
  
  return `void ${functionName}(${parameters}) {\n${statements}}\n`;
},



  'c_function_call': function(block) {
    const functionName = block.getFieldValue('NAME');
  
    const arg1 = CGenerator.valueToCode(block, 'ARG1', CGenerator.ORDER_NONE) || '';
    
    const arg2 = CGenerator.valueToCode(block, 'ARG2', CGenerator.ORDER_NONE);

    
    let code = `${functionName}(`;
    if (arg1) {
        code += arg1;
    }
    if (arg2) {
        code += `, ${arg2}`;
    }
    code += `);\n`;

    return code;

},
'c_function_parameter':function(block){
  let paramType = block.getFieldValue("TYPE"); 
    let paramName = block.getFieldValue("VAR");  

    let code = paramType + " " + paramName;  

    return [code, CGenerator.ORDER_ATOMIC];
},
  
  'c_number': function(block) {
    let number = block.getFieldValue('NUM');
    return [number, CGenerator.ORDER_ATOMIC];
  },



  'c_arithmetic': function(block) {
    let A = CGenerator.valueToCode(block, 'A', CGenerator.ORDER_ATOMIC) || '0';
    let B = CGenerator.valueToCode(block, 'B', CGenerator.ORDER_ATOMIC) || '0';
    let operator = block.getFieldValue('OP');
    return [`(${A} ${operator} ${B})`, CGenerator.ORDER_ATOMIC];
  },
  'c_variable_get': function(block) {
    return [block.getFieldValue('VAR'), CGenerator.ORDER_ATOMIC];
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
  },
  'c_scan':function(block){
    var varType = block.getFieldValue('VAR_TYPE'); // Gets the selected format specifier
    var varName = block.getFieldValue('VAR_NAME'); // Gets the variable name

    var code = `scanf("${varType}", &${varName});\n`;
    return code;
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

  CGenerator.scrub_ = function(block, code, opt_thisOnly) {
    // Get the next block if it exists
    const nextBlock = block.getNextBlock();
    let nextCode = '';
    
    if (nextBlock && !opt_thisOnly) {
      nextCode = CGenerator.blockToCode(nextBlock);
    }
    
    return code + nextCode;
  };
  
  CGenerator.finish = function(code) {
    let includes = '#include <stdio.h>\n#include <stdlib.h>\n\n';
  
    if (!code) {
      code=" ";
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