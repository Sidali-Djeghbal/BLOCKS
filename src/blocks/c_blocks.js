import * as Blockly from 'blockly';

export const cBlocks = {
  'c_print_number': {
    init: function() {
        this.appendValueInput('NUMBER')
            .setCheck('Number')
            .appendField('print number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Prints a number to the console.');
      }
  },
  'c_print_text':{
    init: function() {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('print text');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('Prints a text string to the console.');
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

  'c_function': {
    init: function() {
      this.appendDummyInput()
          .appendField('function')
          .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');
      this.appendStatementInput('BODY')
          .setCheck(null)
          .appendField('do');
      this.setColour(290);
      this.setTooltip('Function definition');
    }
  },

  // 🔹 Number Block
  'c_number': {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), 'NUM');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('A number.');
    }
  },

  // 🔹 Arithmetic Operations Block
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
      this.setOutput(true, 'Number'); // Can be adjusted based on type system
      this.setColour(330);
      this.setPreviousStatement(true,null);
      this.setPreviousStatement(true,null);
      this.setTooltip('Get the value of a variable');
    }
  },
  'c_logic_compare': {
  init: function() {
    this.appendValueInput('A')
        .setCheck('Number');  // Can be extended to other types like String
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
    this.setOutput(true, 'Boolean');  // Returns a boolean value
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
  }
};

