import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import bobbins from './bobbins.JPG';
import skeins from './skeins.JPG';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <Typography component='p'>
    <div style={{width: '100%'}}>
      <Box display='flex' p={1}>
      <Box m={1}>
      {<img src={skeins} alt='skeins of thread' height='400px'/>}
      </Box>
      <Box m={4}>
        So you love to stitch but can never find all those half used skeins of thread when you need them?
        Cross Stitch Buddy can help! It can keep track of where all your skeins are, and even show you which
        thread you need to go buy and which you can take from another project!
     
    </Box>
      <Box m={1}>
      {<img src={bobbins} alt='bobbins of thread' width='400px' m={1} />}
      </Box>


      </Box>
      <Box>
    This project was made with: react, redux, redux-sagas, material-ui 
    </Box>
    </div>
 


  </Typography>
);

export default InfoPage;
