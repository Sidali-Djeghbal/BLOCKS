import * as Blockly from 'blockly';

export const cBlocks = {
  'c_print_number': {
    init: function() {
    this.appendValueInput("NUMBER")
        .setCheck(null)
        .appendField("print")
        .appendField(new Blockly.FieldDropdown([
          ["int", "int"],
          ["float", "float"],
          ["double", "double"]
        ]), "VAR_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Print a number based on its type");
    this.setHelpUrl("");
  }
  },
  'c_print_text':{
    init: function() {
      this.appendDummyInput()
          .appendField("print")
          .appendField(new Blockly.FieldTextInput(""), "TEXT_INPUT");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Prints a text string to the console.");
  }
  },
  'c_variable_declare': {
    init: function() {
      this.appendValueInput('VALUE')
          .appendField('declare')
          .appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['float', 'float'],
            ['char', 'char'],
            ['double', 'double']
          ]), 'TYPE')
          .appendField(new Blockly.FieldTextInput('x'), 'VAR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
      this.setTooltip('Declare a variable');
    }
  },
  'variable_set': {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("myVar"), "VAR") 
          .appendField(new Blockly.FieldDropdown([
            ["=", "="],
            ["+=", "+="],
            ["-=", "-="],
            ["*=", "*="],
            ["/=", "/="]
          ]), "OPERATION");
      this.appendValueInput("VALUE")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Set, increment, or decrement a variable using a custom name");
    }
},


  'c_if': {
    init: function() {
      this.appendValueInput('CONDITION')
          .setCheck('Boolean')
          .appendField('if');
      this.appendStatementInput('DO')
          .setCheck(null)
          .appendField('do');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('If statement');
    }
  },
  'c_else':{
    init: function() {
      this.appendDummyInput()
          .appendField("else");
      this.appendStatementInput("DO")
          .setCheck(null) 
          .appendField("do");
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(180);
      this.setTooltip("Executes code if the if-condition is false.");
  }
  },

  'c_while': {
    init: function() {
      this.appendValueInput('CONDITION')
          .setCheck('Boolean')
          .appendField('while');
      this.appendStatementInput('DO')
          .setCheck(null)
          .appendField('do');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('While loop');
    }
  },

  'c_for': {
    init: function() {
      this.appendDummyInput()
          .appendField('for')
          .appendField(new Blockly.FieldTextInput('i'), 'VAR')
          .appendField('= ')
          .appendField(new Blockly.FieldNumber(0), 'START');
      this.appendValueInput('CONDITION')
          .setCheck('Boolean')
          .appendField(';');
      this.appendValueInput('STEP')
          .setCheck('Number')
          .appendField('; step');
      this.appendStatementInput('DO')
          .setCheck(null)
          .appendField('do');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('For loop');
  }
  },

  'c_main': {
    init: function() {
      this.appendDummyInput()
          .appendField("main");
      this.appendStatementInput("BODY")
          .setCheck(null);
      this.setColour(230);
      this.setTooltip("Defines the main function.");
      this.setHelpUrl("");
  }
  },

  'c_function': {
    init: function() {
      this.appendDummyInput()
          .appendField("Function")
          .appendField(new Blockly.FieldTextInput("myFunction"), "NAME");
  
      // Add two parameter inputs
      this.appendValueInput("PARAM1")
          .setCheck("Function_Parameter")
          .appendField("Parameter 1:");
      
      this.appendValueInput("PARAM2")
          .setCheck("Function_Parameter")
          .appendField("Parameter 2:");
  
      this.appendStatementInput("BODY")
          .setCheck(null)
          .appendField("do");
  
      this.setInputsInline(false);
      this.setColour(160);
      this.setTooltip("Defines a function with two parameters");
      this.setHelpUrl("");
    }
  },
 'c_function_call': {
  init: function() {
    this.appendDummyInput()
        .appendField('call')
        .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');
    
    this.appendValueInput('ARG1')
        .setCheck(null)
        .appendField('parameter 1');
    
    this.appendValueInput('ARG2')
        .setCheck(null)
        .appendField('parameter 2');
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Calls a function with two parameters');
    this.setHelpUrl('');
  }
},
  'c_function_parameter':{
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ["int", "int"], 
            ["float", "float"], 
            ["char", "char"]
          ]), "TYPE")
          .appendField(new Blockly.FieldTextInput("param"), "VAR");
      this.setOutput(true, "Function_Parameter"); 
      this.setColour(230);
      this.setTooltip("Function parameter");
      this.setHelpUrl("");
    }
  },


  'c_number': {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), 'NUM');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('A number.');
    }
  },

  'c_arithmetic': {
    init: function() {
      this.appendValueInput('A')
          .setCheck('Number');
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ['+', '+'],
            ['-', '-'],
            ['*', '*'],
            ['/', '/'],
            ['%', '%']
          ]), 'OP');
      this.appendValueInput('B')
          .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('Arithmetic operations');
    }
  },
  'c_variable_get': {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput('x'), 'VAR');
      this.setOutput(true, 'Number');
      this.setColour(330);
      this.setPreviousStatement(true,null);
      this.setPreviousStatement(true,null);
      this.setTooltip('Get the value of a variable');
    }
  },
  'c_logic_compare': {
  init: function() {
    this.appendValueInput('A')
        .setCheck('Number'); 
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['==', '=='],
          ['!=', '!='],
          ['<', '<'],
          ['>', '>'],
          ['<=', '<='],
          ['>=', '>=']
        ]), 'OP');
    this.appendValueInput('B')
        .setCheck('Number');
    this.setOutput(true, 'Boolean');  
    this.setColour(210);
    this.setTooltip('Comparison operator');
  }
},
  'c_text':{
    init: function() {
        this.appendDummyInput()
            .appendField('"')
            .appendField(new Blockly.FieldTextInput("text"), "TEXT")
            .appendField('"');
        this.setOutput(true, 'String');
        this.setColour(160);
        this.setTooltip('A text (string) input.');
      }
  },
  'c_scan':{
    init: function () {
      this.appendDummyInput()
          .appendField("scanf")
          .appendField(new Blockly.FieldDropdown([
              ["int", "%d"],
              ["char", "%c"],
              ["float", "%f"],
              ["double", "%lf"]
          ]), "VAR_TYPE")
          .appendField("&")
          .appendField(new Blockly.FieldTextInput("variable_name"), "VAR_NAME");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Scans a value and stores it in a variable.");
      this.setHelpUrl("");
  }
}

};

