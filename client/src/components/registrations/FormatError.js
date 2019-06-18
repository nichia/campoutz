import React from 'react';

export const formatError = error => {
  // if error is null (not true), propsError = null
  // Else, if error is an array, join the error messages by 'unordered list'
  if (error) {
    if (Array.isArray(error)) {
      const listErrors = error.map((err, index) => <li key={index}>{err}</li>);
      return <ul>{listErrors}</ul>;
    } else {
      return error;
    }
  } else {
    return null;
  }
};
