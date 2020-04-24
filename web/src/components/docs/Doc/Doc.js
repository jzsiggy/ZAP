import React , { Component } from 'react';
import { TextField , Title , Description } from './styles';

class Doc extends Component {
  render() {
    return(
      <TextField>
        <Title>{this.props.title}</Title>
        <Description>{this.props.description}</Description>
      </TextField>
    )
  };
};

export default Doc;