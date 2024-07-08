import React from 'react';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            My Material UI App
          </Typography>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <Button variant="contained" color="primary">
          Hello Material UI
        </Button>
      </header>
    </div>
  );
}

export default App;
