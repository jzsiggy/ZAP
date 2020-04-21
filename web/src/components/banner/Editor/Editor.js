import React , { Component } from 'react';
import { Button , SectionContainer } from './styles';
import { Controlled as CodeMirror } from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/dracula.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');


class Editor extends Component {
  constructor (props) {
    super (props);
    this.state = {
      value: '',
    };
  };

  render () {
    return (
      <SectionContainer>
        <CodeMirror
          value={this.state.value}
          options={{
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            this.setState({value});
          }}
          onChange={(editor, data, value) => {
          }}
        />
        <Button>Run</Button>
      </SectionContainer>
    );
  };
};

export default Editor;