import React from 'react';
import { Container, Grid, List, ListItem, ListItemText, Paper } from '@mui/material';
import players from teams.json;

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: '20px', height: '100vh' }}>
            <h2>Main Content Area</h2>
            <p>This is the left column, where your main content will go.</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px', height: '100vh' }}>
            <h2>Clickable Elements</h2>
            <List>
              {players.map((item, index) => (
                <ListItem button key={index} onClick={() => alert(`${item.name} from ${item.team}`)}>
                  <ListItemText primary={item.name} secondary={item.team} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
