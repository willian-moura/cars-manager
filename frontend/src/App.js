import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

function App() {
  return (
    <div className="App">

      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Cars Manager
          </Typography>
        </Box>
      </Container>
      
    </div>
  );
}

export default App;
