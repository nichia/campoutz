import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const LoadSpinner = ({ children }) => {
  return (
    <div>
      {children ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      ) : null}
    </div>
  );
};

export default LoadSpinner;
