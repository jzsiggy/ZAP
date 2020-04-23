import React , { Component } from 'react';
import { TextField , Title , Description } from './styles';

class Doc extends Component {
  constructor(props) {
    super(props);
  }

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