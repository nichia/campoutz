import React from 'react';
import errorBgImage from '../assets/images/error-bg-image.jpg';
import { Header, Icon, Button } from 'semantic-ui-react';

const NoMatch = ({ history }) => {
  return (
    <div>
      <style>
        {`
          html, body{
            background-image: url(${errorBgImage});
              background-repeat: no-repeat;
              background-size: cover;
              position: relative;
          }
            
          white-text{
            color: white;
          }
        `}
      </style>
      <Header as='h2' icon textAlign='center'>
        {/* semantic-ui-react does not have color WHITE, this is a work around  */}
        <white-text>
          <Icon name='settings' />
          Please Bear With Us
        </white-text>
        <Header.Subheader textAlign='center'>
          <white-text>
            Looks like we got lost on the trail and can't seem to find the site
            you're looking for.
          </white-text>
        </Header.Subheader>
      </Header>

      <Header a='h1' textAlign='center'>
        <Button color='blue' onClick={() => history.goBack()}>
          Go Back
        </Button>
      </Header>
    </div>
  );
};

export default NoMatch;
