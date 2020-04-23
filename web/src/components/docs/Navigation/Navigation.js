import React , { Component } from 'react';
import { Container , Dot } from './styles';
import DocContext from '../context/DocContext';

class Navigation extends Component {
  render() {
    return(
      <Container>
        <Dot
          size={'10px'}
          current={this.context.state.step}
          step={'expressions'}
          onClick={() => this.context.setStep('expressions')}
        />
        <Dot
          size={'13px'}
          current={this.context.state.step}
          step={'declarations'}
          onClick={() => this.context.setStep('declarations')}
        />
        <Dot
          size={'18px'}
          current={this.context.state.step}
          step={'conditionals'}
          onClick={() => this.context.setStep('conditionals')}
        />
        <Dot
          size={'13px'}
          current={this.context.state.step}
          step={'loops'}
          onClick={() => this.context.setStep('loops')}
        />
        <Dot
          size={'10px'}
          current={this.context.state.step}
          step={'functions'}
          onClick={() => this.context.setStep('functions')}
        />
      </Container>
    )
  };
};

Navigation.contextType = DocContext;

export default Navigation;