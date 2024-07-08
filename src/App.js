import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, List, ListItem, ListItemText, Paper, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import players from './teams.json';

const StyledContainer = styled(Container)({
  backgroundColor: '#555555',
});

const StyledListItem = styled(ListItem)(({ team }) => ({
  backgroundColor: team === 'Tim1' ? '#9900ff' :
                   team === 'Boxxy' ? '#cccccc' :
                   team === 'Hawk' ? '#a47e6c' :
                   team === 'Tom' ? '#ea9999' :
                   team === 'Cheez' ? '#38761d' :
                   team === 'Marc' ? '#6d9eeb' :
                   team === 'Jason' ? '#fff9be' :
                   team === 'David' ? '#a93259' : '#FFFFFF',
  margin: 0,
  padding: 0,
}));

const SmallTypography = styled(Typography)({
  fontSize: '0.7rem', // Set font size to smaller value
});

const FlexListItemText = styled(ListItemText)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 5,
  paddingRight: 5,
});

const ScrollablePaper = styled(Paper)(({height}) => ({
  // padding: '20px',
  padding: height * 0.01,
  height: height * 0.94,
  overflowY: 'auto',
  marginTop: height * 0.02
}));

const ItemsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
});

const TeamColumnsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
  height: '100%',
});

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [items, setItems] = useState(players);
  const [removedCount, setRemovedCount] = useState({
    'Tim1': 0,
    'Boxxy': 0,
    'Hawk': 0,
    'Tom': 0,
    'Cheez': 0,
    'Marc': 0,
    'Jason': 0,
    'David': 0,
  });
  const [filterText, setFilterText] = useState('');
  const [teamColumn1, setTeamColumn1] = useState([]);
  const [teamColumn2, setTeamColumn2] = useState([]);
  const [draftCounter, setDraftCounter] = useState(1);
  const [teamToggle, setTeamToggle] = useState('TIM');
  const [alternateTeam, setAlternateTeam] = useState('RYAN');

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  
  const handleOrderToggle = () => {
    if (draftCounter != 1) {
      return;
    }
    if (teamToggle === 'TIM') {
      setTeamToggle('RYAN');
      setAlternateTeam('TIM');
    } else {
      setTeamToggle('TIM');
      setAlternateTeam('RYAN');
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (index, team) => {
    const newCounts = { ...removedCount };

    if (newCounts[team] > 6) {
      return;
    }
    newCounts[team] += 1;
    setRemovedCount(newCounts);

    var newItems = [...items];
    const clickedItem = newItems.splice(index, 1)[0];
    if (newCounts[team] == 6) {
      // Delete all items from this team
      newItems = items.filter(item => item.team !== team);
      // const clickedItem = newItems.splice(index, 1)[0];
    } else {
      // newItems = [...items];
      // const clickedItem = newItems.splice(index, 1)[0];
    }
    setItems(newItems);

    if (draftCounter % 4 < 2) {
      setTeamColumn1([...teamColumn1, clickedItem]);
    } else {
      setTeamColumn2([...teamColumn2, clickedItem]);
    }
    setDraftCounter(draftCounter + 1);
  };

  // const handleUndoClick = () => {
  //   if (draftCounter % 4 < 2) {
  //     const newColumn = [...teamColumn1].splice(teamColumn1.length - 1, 1);
  //     setTeamColumn1(newColumn);
  //   } else {
  //     const newColumn = [...teamColumn2].splice(teamColumn2.length - 1, 1);
  //     setTeamColumn2(newColumn);
  //   }
  //   setDraftCounter(draftCounter - 1);
  // }

  const handleResetClick = () => {
    setItems(players);
    setRemovedCount({
      'Tim1': 0,
      'Boxxy': 0,
      'Hawk': 0,
      'Tom': 0,
      'Cheez': 0,
      'Marc': 0,
      'Jason': 0,
      'David': 0,
    });
    setTeamColumn1([]);
    setTeamColumn2([]);
    setDraftCounter(1);
  }



  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ScrollablePaper elevation={3} height={windowHeight}>
          
            <Button variant="contained" color="primary" onClick={() => handleResetClick()}>
              RESET
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleOrderToggle()}>
              SWITCH ORDER
            </Button>
            <TeamColumnsGrid>
              <Box>
              <Typography variant="h6" align="center">{teamToggle}</Typography>
                {teamColumn1.map((item, index) => (
                  <StyledListItem key={index} team={item.team}>
                    <FlexListItemText
                      primary={<SmallTypography>{item.name}</SmallTypography>}
                      secondary={<SmallTypography>{item.team}</SmallTypography>}
                    />
                  </StyledListItem>
                ))}
              </Box>
              <Box>
              <Typography variant="h6" align="center">{alternateTeam}</Typography>
                {teamColumn2.map((item, index) => (
                  <StyledListItem key={index} team={item.team}>
                    <FlexListItemText
                      primary={<SmallTypography>{item.name}</SmallTypography>}
                      secondary={<SmallTypography>{item.team}</SmallTypography>}
                    />
                  </StyledListItem>
                ))}
              </Box>
            </TeamColumnsGrid>
            
          </ScrollablePaper>
        </Grid>
        <Grid item xs={5}>
          <ScrollablePaper elevation={3} height={windowHeight}>
            <TextField
              label="Filter by Name"
              variant="outlined"
              fullWidth
              value={filterText}
              onChange={handleFilterChange}
              margin="normal"
            />
            <ItemsGrid>
              {filteredItems.map((item, index) => (
                <StyledListItem 
                button 
                key={index} 
                team={item.team}
                onClick={() => handleItemClick(index, item.team)}>
                  <FlexListItemText 
                    primary={<SmallTypography>{item.name}</SmallTypography>} 
                    secondary={<SmallTypography>{item.team}</SmallTypography>} 
                  />
                </StyledListItem>
              ))}
            </ItemsGrid>
          </ScrollablePaper>
        </Grid>
        <Grid item xs={2}>
        <ScrollablePaper elevation={3} height={windowHeight}>
          <Box mb={2}>
              {Object.entries(removedCount).map(([team, count]) => (
                <Typography key={team} variant="body2">
                  {team}: {count}
                </Typography>
              ))}
            </Box>
            </ScrollablePaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default App;
