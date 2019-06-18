import React, { Component } from 'react';
import { searchStateOptions } from '../data/searchStateOptions';
import { Dropdown } from 'semantic-ui-react';

class SearchQuery extends Component {
  state = { value: '' };

  handleChange = (e, { value }) => {
    console.log(
      '%c FetchCapgrounds handleChange: ',
      'color: green',
      e,
      ' value:',
      value
    );
    this.props.onSearchQuery(value);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Dropdown
        fluid
        options={searchStateOptions}
        placeholder='Select the State'
        search
        selection
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
export default SearchQuery;
