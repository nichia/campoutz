import React, { Fragment } from 'react';
import errorBgImage from '../assets/images/error-bg-image.jpg';
import { Header, Icon } from 'semantic-ui-react';

const NoMatch = () => (
  <div>
    <style>
      {`
        html, body{
          background-image:     linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),url(${errorBgImage});
          width: 100vw;
          height: 100vh; 
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
      <white-text>
        <Icon name='settings' />
        Please Bear With Us
      </white-text>
      <Header.Subheader textAlign='center'>
        <white-text>
          Looks like we got lost on the trail and can't seem to find the path
          you're looking for.
        </white-text>
      </Header.Subheader>
    </Header>
  </div>
);

export default NoMatch;
