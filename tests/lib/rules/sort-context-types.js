/**
 * @fileoverview Tests for sort-prop-types
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/sort-prop-types');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ERROR_MESSAGE = 'Prop types declarations should be sorted alphabetically';
const REQUIRED_ERROR_MESSAGE = 'Required prop types must be listed before all other prop types';
const CALLBACK_ERROR_MESSAGE = 'Callback prop types must be listed after all other prop types';

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('sort-prop-types', rule, {

  valid: [{
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    A: PropTypes.any,',
      '    Z: PropTypes.string,',
      '    a: PropTypes.any,',
      '    z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    A: PropTypes.any,',
      '    z: PropTypes.string,',
      '    Z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      ignoreCase: true,
      sortContextTypes: true
    }]
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});',
      'var Second = createReactClass({',
      '  contextTypes: {',
      '    AA: PropTypes.any,',
      '    ZZ: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '  a: PropTypes.string,',
      '  z: PropTypes.string',
      '};',
      'First.contextTypes.justforcheck = PropTypes.string;'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '  a: PropTypes.any,',
      '  A: PropTypes.any,',
      '  z: PropTypes.string,',
      '  Z: PropTypes.string',
      '};'
    ].join('\n'),
    options: [{
      ignoreCase: true,
      sortContextTypes: true
    }]
  }, {
    code: [
      'class Component extends React.Component {',
      '  static propTypes = {',
      '    a: PropTypes.any,',
      '    b: PropTypes.any,',
      '    c: PropTypes.any',
      '  };',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT
  }, {
    code: [
      'class Hello extends React.Component {',
      '  render() {',
      '    return <div>Hello</div>;',
      '  }',
      '}',
      'Hello.contextTypes = {',
      '  "aria-controls": PropTypes.string',
      '};'
    ].join('\n'),
    options: [{
      ignoreCase: true,
      sortContextTypes: true
    }]
  }, {
    // Invalid code, should not be validated
    code: [
      'class Component extends React.Component {',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    c: PropTypes.any,',
      '    b: PropTypes.any',
      '  };',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT
  }, {
    code: [
      'var Hello = createReactClass({',
      '  render: function() {',
      '    let { a, ...b } = obj;',
      '    let c = { ...d };',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    barRequired: PropTypes.func.isRequired,',
      '    onBar: PropTypes.func,',
      '    z: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '    barRequired: PropTypes.string.isRequired,',
      '    a: PropTypes.any',
      '};'
    ].join('\n'),
    options: [{
      requiredFirst: true,
      sortContextTypes: true
    }]
  }, {
    code: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '    fooRequired: MyPropType,',
      '};'
    ].join('\n'),
    options: [{
      requiredFirst: true,
      sortContextTypes: true
    }]
  }, {
    code: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '    barRequired: PropTypes.string.isRequired,',
      '    fooRequired: PropTypes.any.isRequired,',
      '    a: PropTypes.any,',
      '    onBar: PropTypes.func,',
      '    onFoo: PropTypes.func,',
      '    z: PropTypes.string',
      '};'
    ].join('\n'),
    options: [{
      requiredFirst: true,
      callbacksLast: true,
      sortContextTypes: true
    }]
  }, {
    code: [
      'export default class ClassWithSpreadInPropTypes extends BaseClass {',
      '  static contextTypes = {',
      '    b: PropTypes.string,',
      '    ...c.contextTypes,',
      '    a: PropTypes.string',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT
  }, {
    code: [
      'const contextTypes = require(\'./externalContextTypes\')',
      'const TextFieldLabel = (props) => {',
      '  return <div />;',
      '};',
      'TextFieldLabel.contextTypes = contextTypes;'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: [
      'const First = (props) => <div />;',
      'export const contextTypes = {',
      '    a: PropTypes.any,',
      '    z: PropTypes.string,',
      '};',
      'First.contextTypes = contextTypes;'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          c: PropTypes.any,
          C: PropTypes.string,
          a: PropTypes.any,
          b: PropTypes.bool,
        }),
      };
    `,
    options: [{
      sortContextTypes: true
    }]
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        a: PropTypes.any,
        b: PropTypes.any,
        c: PropTypes.shape({
          c: PropTypes.any,
          ...otherPropTypes,
          a: PropTypes.any,
          b: PropTypes.bool,
        }),
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }]
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        a: PropTypes.any,
        b: PropTypes.any,
        c: PropTypes.shape(
          importedPropType,
        ),
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }]
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        a: PropTypes.any,
        z: PropTypes.any,
      };
    `,
    options: [{
      noSortAlphabetically: true,
      sortContextTypes: true
    }]
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        z: PropTypes.any,
        a: PropTypes.any,
      };
    `,
    options: [{
      noSortAlphabetically: true,
      sortContextTypes: true
    }]
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        0: PropTypes.any,
        1: PropTypes.any,
      };
    `,
    options: [{
      ignoreCase: true,
      sortContextTypes: true
    }]
  }, {
    code: `
      const shape = {
        a: PropTypes.any,
        b: PropTypes.bool,
        c: PropTypes.any,
      };
      class Component extends React.Component {
        static propTypes = {
          x: PropTypes.shape(shape),
        };
        render() {
          return <div />;
        }
      }
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      const shape = {
        a: PropTypes.any,
        b: PropTypes.bool,
        c: PropTypes.any,
      };
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.shape(shape)
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }]
  }],

  invalid: [{
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    z: PropTypes.string,',
      '    a: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    z: PropTypes.any,',
      '    Z: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    Z: PropTypes.any,',
      '    z: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    Z: PropTypes.any,',
      '    a: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      ignoreCase: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    Z: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    A: PropTypes.any,',
      '    z: PropTypes.string,',
      '    Z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    errors: 2,
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    A: PropTypes.any,',
      '    Z: PropTypes.string,',
      '    a: PropTypes.any,',
      '    z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    Zz: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});',
      'var Second = createReactClass({',
      '  contextTypes: {',
      '    aAA: PropTypes.any,',
      '    ZZ: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    errors: 2,
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    Zz: PropTypes.string,',
      '    a: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});',
      'var Second = createReactClass({',
      '  contextTypes: {',
      '    ZZ: PropTypes.string,',
      '    aAA: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '    yy: PropTypes.any,',
      '    bb: PropTypes.string',
      '};',
      'class Second extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'Second.contextTypes = {',
      '    aAA: PropTypes.any,',
      '    ZZ: PropTypes.string',
      '};'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    errors: 2,
    output: [
      'class First extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'First.contextTypes = {',
      '    bb: PropTypes.string,',
      '    yy: PropTypes.any',
      '};',
      'class Second extends React.Component {',
      '  render() {',
      '    return <div />;',
      '  }',
      '}',
      'Second.contextTypes = {',
      '    ZZ: PropTypes.string,',
      '    aAA: PropTypes.any',
      '};'
    ].join('\n')
  }, {
    code: [
      'class Component extends React.Component {',
      '  static contextTypes = {',
      '    z: PropTypes.any,',
      '    y: PropTypes.any,',
      '    a: PropTypes.any',
      '  };',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT,
    errors: 2,
    output: [
      'class Component extends React.Component {',
      '  static contextTypes = {',
      '    a: PropTypes.any,',
      '    y: PropTypes.any,',
      '    z: PropTypes.any',
      '  };',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'class Component extends React.Component {',
      '  static contextTypes = forbidExtraProps({',
      '    z: PropTypes.any,',
      '    y: PropTypes.any,',
      '    a: PropTypes.any',
      '  });',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT,
    settings: {
      propWrapperFunctions: ['forbidExtraProps']
    },
    errors: 2,
    output: [
      'class Component extends React.Component {',
      '  static contextTypes = forbidExtraProps({',
      '    a: PropTypes.any,',
      '    y: PropTypes.any,',
      '    z: PropTypes.any',
      '  });',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'const First = (props) => <div />;',
      'const contextTypes = {',
      '    z: PropTypes.string,',
      '    a: PropTypes.any,',
      '};',
      'First.contextTypes = forbidExtraProps(contextTypes);'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    settings: {
      propWrapperFunctions: ['forbidExtraProps']
    },
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'const First = (props) => <div />;',
      'const contextTypes = {',
      '    a: PropTypes.any,',
      '    z: PropTypes.string,',
      '};',
      'First.contextTypes = forbidExtraProps(contextTypes);'
    ].join('\n')
  }, {
    code: [
      'const First = (props) => <div />;',
      'const contextTypes = {',
      '    z: PropTypes.string,',
      '    a: PropTypes.any,',
      '};',
      'First.contextTypes = contextTypes;'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    settings: {
      propWrapperFunctions: ['forbidExtraProps']
    },
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'const First = (props) => <div />;',
      'const contextTypes = {',
      '    a: PropTypes.any,',
      '    z: PropTypes.string,',
      '};',
      'First.contextTypes = contextTypes;'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    fooRequired: PropTypes.string.isRequired,',
      '    barRequired: PropTypes.string.isRequired,',
      '    a: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      requiredFirst: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    barRequired: PropTypes.string.isRequired,',
      '    fooRequired: PropTypes.string.isRequired,',
      '    a: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    barRequired: PropTypes.string.isRequired,',
      '    onFoo: PropTypes.func',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      requiredFirst: true,
      sortContextTypes: true
    }],
    errors: [{
      message: REQUIRED_ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    barRequired: PropTypes.string.isRequired,',
      '    a: PropTypes.any,',
      '    onFoo: PropTypes.func',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'export default class ClassWithSpreadInPropTypes extends BaseClass {',
      '  static contextTypes = {',
      '    b: PropTypes.string,',
      '    ...a.propTypes,',
      '    d: PropTypes.string,',
      '    c: PropTypes.string',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      message: ERROR_MESSAGE,
      line: 6,
      column: 5,
      type: 'Property'
    }],
    output: [
      'export default class ClassWithSpreadInPropTypes extends BaseClass {',
      '  static contextTypes = {',
      '    b: PropTypes.string,',
      '    ...a.propTypes,',
      '    c: PropTypes.string,',
      '    d: PropTypes.string',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'export default class ClassWithSpreadInPropTypes extends BaseClass {',
      '  static contextTypes = {',
      '    b: PropTypes.string,',
      '    ...a.propTypes,',
      '    f: PropTypes.string,',
      '    d: PropTypes.string,',
      '    ...e.propTypes,',
      '    c: PropTypes.string',
      '  }',
      '}'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      message: ERROR_MESSAGE,
      line: 6,
      column: 5,
      type: 'Property'
    }],
    output: [
      'export default class ClassWithSpreadInPropTypes extends BaseClass {',
      '  static contextTypes = {',
      '    b: PropTypes.string,',
      '    ...a.propTypes,',
      '    d: PropTypes.string,',
      '    f: PropTypes.string,',
      '    ...e.propTypes,',
      '    c: PropTypes.string',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'const contextTypes = {',
      '  b: PropTypes.string,',
      '  a: PropTypes.string,',
      '};',
      'const TextFieldLabel = (props) => {',
      '  return <div />;',
      '};',
      'TextFieldLabel.contextTypes = contextTypes;'
    ].join('\n'),
    options: [{
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 3,
      column: 3,
      type: 'Property'
    }],
    output: [
      'const contextTypes = {',
      '  a: PropTypes.string,',
      '  b: PropTypes.string,',
      '};',
      'const TextFieldLabel = (props) => {',
      '  return <div />;',
      '};',
      'TextFieldLabel.contextTypes = contextTypes;'
    ].join('\n')
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          c: PropTypes.any,
          a: PropTypes.any,
          b: PropTypes.bool,
        }),
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 12,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 13,
      column: 11,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          a: PropTypes.any,
          b: PropTypes.bool,
          c: PropTypes.any,
        }),
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        z: PropTypes.shape(),
        y: PropTypes.any,
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 10,
      column: 9,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape(),
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        z: PropTypes.shape(someType),
        y: PropTypes.any,
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 10,
      column: 9,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape(someType),
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        z: PropTypes.any,
        y: PropTypes.any,
        a: PropTypes.shape({
          c: PropTypes.any,
          C: PropTypes.string,
          a: PropTypes.any,
          b: PropTypes.bool,
        }),
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 9,
      column: 9,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 10,
      column: 9,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 12,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 13,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 14,
      column: 11,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        a: PropTypes.shape({
          C: PropTypes.string,
          a: PropTypes.any,
          b: PropTypes.bool,
          c: PropTypes.any,
        }),
        y: PropTypes.any,
        z: PropTypes.any,
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          c: PropTypes.any,
          C: PropTypes.string,
          a: PropTypes.any,
          b: PropTypes.bool,
        }),
      };
    `,
    options: [{
      sortShapeProp: true,
      ignoreCase: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 13,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 14,
      column: 11,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          a: PropTypes.any,
          b: PropTypes.bool,
          c: PropTypes.any,
          C: PropTypes.string,
        }),
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          a: PropTypes.string,
          c: PropTypes.number.isRequired,
          b: PropTypes.any,
          d: PropTypes.bool,
        }),
      };
    `,
    options: [{
      sortShapeProp: true,
      requiredFirst: true,
      sortContextTypes: true
    }],
    errors: [{
      message: REQUIRED_ERROR_MESSAGE,
      line: 12,
      column: 11,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          c: PropTypes.number.isRequired,
          a: PropTypes.string,
          b: PropTypes.any,
          d: PropTypes.bool,
        }),
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          a: PropTypes.string,
          c: PropTypes.number.isRequired,
          b: PropTypes.any,
          ...otherPropTypes,
          f: PropTypes.bool,
          d: PropTypes.string,
        }),
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 13,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 16,
      column: 11,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.any,
        y: PropTypes.any,
        z: PropTypes.shape({
          a: PropTypes.string,
          b: PropTypes.any,
          c: PropTypes.number.isRequired,
          ...otherPropTypes,
          d: PropTypes.string,
          f: PropTypes.bool,
        }),
      };
    `
  }, {
    code: `
      class Component extends React.Component {
        static contextTypes = {
          z: PropTypes.any,
          y: PropTypes.any,
          a: PropTypes.shape({
            c: PropTypes.any,
            a: PropTypes.any,
            b: PropTypes.bool,
          }),
        };
        render() {
          return <div />;
        }
      }
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      message: ERROR_MESSAGE,
      line: 5,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 6,
      column: 11,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 8,
      column: 13,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 9,
      column: 13,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        static contextTypes = {
          a: PropTypes.shape({
            a: PropTypes.any,
            b: PropTypes.bool,
            c: PropTypes.any,
          }),
          y: PropTypes.any,
          z: PropTypes.any,
        };
        render() {
          return <div />;
        }
      }
    `
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    z: PropTypes.string,',
      '    a: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      noSortAlphabetically: false,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    z: PropTypes.string',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    \'data-letter\': PropTypes.string,',
      '    a: PropTypes.any,',
      '    e: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      noSortAlphabetically: false,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 5,
      type: 'Property'
    }],
    output: [
      'var First = createReactClass({',
      '  contextTypes: {',
      '    a: PropTypes.any,',
      '    \'data-letter\': PropTypes.string,',
      '    e: PropTypes.any',
      '  },',
      '  render: function() {',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        1: PropTypes.any,
        0: PropTypes.any,
      };
    `,
    options: [{
      ignoreCase: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 9,
      column: 9,
      type: 'Property'
    }],
    output: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        0: PropTypes.any,
        1: PropTypes.any,
      };
    `
  }, {
    code: `
      const shape = {
        c: PropTypes.any,
        a: PropTypes.any,
        b: PropTypes.bool,
      };
      class Component extends React.Component {
        static contextTypes = {
          x: PropTypes.shape(shape),
        };

        render() {
          return <div />;
        }
      }
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 9,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 5,
      column: 9,
      type: 'Property'
    }],
    output: `
      const shape = {
        a: PropTypes.any,
        b: PropTypes.bool,
        c: PropTypes.any,
      };
      class Component extends React.Component {
        static contextTypes = {
          x: PropTypes.shape(shape),
        };

        render() {
          return <div />;
        }
      }
    `
  }, {
    code: `
      const shape = {
        c: PropTypes.any,
        a: PropTypes.any,
        b: PropTypes.bool,
      };
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.shape(shape)
      };
    `,
    options: [{
      sortShapeProp: true,
      sortContextTypes: true
    }],
    errors: [{
      message: ERROR_MESSAGE,
      line: 4,
      column: 9,
      type: 'Property'
    }, {
      message: ERROR_MESSAGE,
      line: 5,
      column: 9,
      type: 'Property'
    }],
    output: `
      const shape = {
        a: PropTypes.any,
        b: PropTypes.bool,
        c: PropTypes.any,
      };
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.contextTypes = {
        x: PropTypes.shape(shape)
      };
    `
  }]
});
