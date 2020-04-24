import React , { Component } from 'react';
import { Button , SectionContainer , BtnContainer } from './styles';
import { Controlled as CodeMirror } from 'react-codemirror2'

import AppContext from '../context/AppContext';

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

  handleSelection = (event) => {
    this.context.setSelection(event.target.value);
  };

  render () {
    return (
      <SectionContainer>
        <CodeMirror
          value={this.context.state.value}
          options={{
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            this.setState({value});
            this.context.setValue(this.state.value);
          }}
          onChange={(editor, data, value) => {
          }}
        />
        <BtnContainer>

          <select id="example" onChange={this.handleSelection}>
            <option>-- Examples --</option>
            <option value="prime">Prime Numbers</option>
            <option value="function">Function</option>
            <option value="while">While</option>
            <option value="variable">Variable</option>
            <option value="pumpkin">Pumpkins</option>
          </select>

          <Button onClick={this.context.execute}>Run</Button>

        </BtnContainer>
      </SectionContainer>
    );
  };
};

Editor.contextType = AppContext;

export default Editor;