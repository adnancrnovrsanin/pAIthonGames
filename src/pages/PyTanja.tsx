import { FormControl, FormHelperText, InputBase, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, styled, useTheme } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import '../App.css';
import aki from '../assets/Aki.png';
import bole from '../assets/Bole.png';
import draza from '../assets/Draza.png';
import jocke from '../assets/Jocke.png';
import axios from 'axios';
import Igra from '../PyTanjaComponents/Igra';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link } from "react-router-dom";
import logo from '../assets/LogoGameLauncherBlack.png';
import { APIBase } from '../constants/hosts';

//road 2; grass 3; mud 5; sand 7; water 500; wall 1000;

const mapa1 = [
  [1000, 1000, 1000, 1000, 3, 5, 5, 5, 5, 1000],
  [1000, 3, 2, 2, 2, 5, 5, 5, 5, 1000],
  [3, 3, 2, 3, 5, 5, 5, 5, 2, 3],
  [500, 500, 2, 3, 3, 3, 3, 3, 2, 3],
  [500, 500, 500, 500, 3, 3, 3, 2, 2, 500],
  [500, 500, 500, 500, 500, 3, 3, 500, 500, 500]
];

const mapa2 = [
  [2, 7, 500, 500, 500, 500, 500, 7, 7, 7],
  [2, 2, 7, 7, 500, 500, 500, 7, 7, 7],
  [1000, 2, 3, 3, 7, 7, 7, 3, 3, 3],
  [1000, 2, 3, 3, 3, 3, 3, 3, 5, 5],
  [500, 2, 2, 2, 2, 2, 2, 2, 3, 3],
  [500, 500, 1000, 1000, 1000, 3, 3, 5, 5, 5]
];

const mapa3 = [
  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
  [1000, 2, 2, 2, 2, 2, 2, 2, 2, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 2, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 2, 1000],
  [1000, 2, 2, 2, 2, 2, 2, 2, 2, 1000],
  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
];

const mapa4 = [
  [1000, 2, 2, 2, 5, 5, 5, 2, 2, 1000],
  [2, 3, 3, 3, 5, 5, 5, 3, 3, 2],
  [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
  [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
  [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

const mapa5 = [
  [1000, 1000, 1000, 2, 2, 2, 2, 1000, 1000, 1000],
  [1000, 1000, 2, 3, 3, 3, 3, 2, 1000, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 2, 1000],
  [2, 3, 3, 7, 7, 7, 7, 3, 3, 2],
  [2, 3, 3, 7, 7, 7, 7, 3, 3, 2],
  [1000, 2, 3, 3, 3, 3, 3, 3, 2, 1000]
];

const mapa6 = [
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 3, 3, 3, 3, 7, 7, 7],
  [7, 7, 3, 3, 3, 3, 3, 3, 7, 7],
  [7, 3, 3, 2, 2, 2, 2, 3, 3, 7],
  [7, 7, 3, 3, 3, 3, 3, 3, 7, 7]
];

const mapa7 = [
  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 2, 1000, 1000, 3, 3, 3, 1000, 3, 1000],
  [1000, 2, 1000, 1000, 3, 1000, 3, 3, 3, 1000],
  [1000, 2, 1000, 1000, 3, 1000, 3, 1000, 3, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
];

const mapa8 = [
  [2, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
  [2, 2, 2, 2, 3, 3, 3, 3, 3, 1000],
  [1000, 7, 7, 3, 3, 3, 3, 3, 2, 1000],
  [1000, 7, 500, 1000, 3, 1000, 3, 3, 2, 1000],
  [1000, 7, 1000, 1000, 3, 1000, 3, 1000, 2, 1000],
  [1000, 7, 3, 1000, 3, 2, 3, 1000, 3, 1000],
  [1000, 7, 3, 1000, 500, 2, 500, 1000, 3, 1000],
  [1000, 7, 3, 3, 3, 2, 3, 3, 3, 1000],
  [1000, 7, 3, 1000, 1000, 1000, 3, 1000, 3, 1000],
  [1000, 1000, 1000, 1000, 1000, 1000, 3, 1000, 1000, 1000]
];

const mapa9 = [
  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 2, 2, 1000, 3, 1000, 3, 3, 3, 3, 3, 3, 1000, 3, 1000],
  [1000, 2, 2, 1000, 3, 1000, 3, 3, 3, 3, 3, 3, 1000, 3, 1000],
  [1000, 2, 1000, 1000, 3, 1000, 3, 1000, 3, 3, 1000, 1000, 1000, 3, 1000],
  [1000, 2, 3, 1000, 3, 3, 3, 1000, 3, 3, 1000, 3, 3, 3, 1000],
  [1000, 2, 3, 1000, 1000, 1000, 1000, 1000, 3, 3, 1000, 3, 3, 3, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 2, 3, 1000, 1000, 1000, 3, 1000, 3, 3, 3, 1000, 3, 3, 1000],
  [1000, 2, 3, 1000, 3, 3, 3, 3, 1000, 3, 3, 1000, 3, 3, 1000],
  [1000, 2, 3, 1000, 1000, 1000, 3, 1000, 3, 3, 1000, 1000, 3, 3, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 2, 3, 1000, 1000, 1000, 3, 1000, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1000],
  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 3, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
];

// const arr = [2, 3, 5, 7, 500, 1000];

interface Response {
  path: Array<Array<number>>,
}

function PyTanja() {
  const [mapa, setMapa] = useState<Array<Array<number>>>(mapa1);
  const [pozicija, setPozicija] = useState<Array<number>>([0, 0]);
  const [currentAgent, setCurrentAgent] = useState<number>(0);
  const [currentMap, setCurrentMap] = useState<string>('0');
  const [markedTile, setMarkedTile] = useState<number[]>([-1, -1]);
  const [pathToGoal, setPathToGoal] = useState<Array<Array<number>>>([]);
  const [markChanged, setMarkChanged] = useState<Boolean>(false);
  const [isMoving, setIsMoving] = useState<Boolean>(false);
  const theme = useTheme();

  useEffect(() => {

    if (pozicija[0] === markedTile[0] && pozicija[1] === markedTile[1]) 
      setIsMoving(false); 

    const interval = setInterval(() => {
      for (let i = 0; i< pathToGoal.length; i++) {
        if ( pathToGoal[i][0] === pozicija[0] && pathToGoal[i][1] === pozicija[1] && i + 1 < pathToGoal.length ) {
          setPozicija([pathToGoal[i + 1][0], pathToGoal[i + 1][1]])
        }
      }
    }, 400);

    if (markChanged) {
      pathAPI();
    }

    return () => {
      clearInterval(interval);
    }
  }, [markedTile, pathToGoal, markChanged, pozicija, isMoving]);

  const fetchData = async (url: string) => {
    try {
      const response = await axios.post<Response>(url, {
        "start": pozicija,
        "goal": markedTile,
        "grid": mapa
      })
      setMarkChanged(false);
      setPathToGoal(response.data.path);
      setIsMoving(true);
    } catch (e) {
      console.log(e)
    }
  }

  const handleAgentChange = (e: MouseEvent) => {
    if (!isMoving) {
      switch((e.target as HTMLImageElement).alt) {
        case 'Aki':
          setCurrentAgent(0);
          break;
        case 'Jocke':
          setCurrentAgent(1);
          break;
        case 'Draza':
          setCurrentAgent(2);
          break;
        case 'Bole':
          setCurrentAgent(3);
          break;
      }
    }
  }
  
  const handleMapChange = (e: SelectChangeEvent) => {
    if (!isMoving) {
      setCurrentMap(e.target.value);
      switch(+e.target.value) {
        case 0:
          setMapa(mapa1);
          break;
        case 1:
          setMapa(mapa2);
          break;
        case 2:
          setMapa(mapa3);
          break;
        case 3:
          setMapa(mapa4);
          break;
        case 4:
          setMapa(mapa5);
          break;
        case 5:
          setMapa(mapa6);
          break;
        case 6:
          setMapa(mapa7);
          break;
        case 7:
          setMapa(mapa8);
          break;
        case 8:
          setMapa(mapa9);
          break;
      }
    }
  }

  const pathAPI = () => {
    switch (currentAgent) {
      case 0:
        fetchData(APIBase + 'aki');
        break;
      case 1:
        fetchData(APIBase + 'jocke');
        break;
      case 2:
        fetchData(APIBase + 'draza');
        break;
      case 3:
        fetchData(APIBase + 'bole');
        break;
    }
  }

  const CustomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
      color: "white",
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: 'transparent',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: 'white',
        boxShadow: '0 0 0 0.2rem white',
      },
    },
  }))

  return (
    <>

      <Grid2
          lg={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
              margin: "50px 0 100px 0",
              textDecoration: "none",
              [theme.breakpoints.down("sm")]: {
                  margin: "30px 0 50px 30px",
              }
          }}
          component={Link}
          to="/"
      >
          <img src={logo} alt="logo" 
              style={{
                  width: "100px",
                  marginRight: "30px",
              }}
          />
          <Typography
              sx={{
                  color: "white",
                  fontSize: "2.5rem",
              }}
          >
              p<span style={{ color: "red", fontWeight: "bold" }}>AI</span>thon Games Launcher
          </Typography>
      </Grid2>

      <Typography
        sx={{
          color: "white",
          fontSize: "1.125rem",
          margin: "10px 0 10px 0",
        }}
      >
        {"Pick your agent: "}
      </Typography>

      <div className="agenti">
        <img src={aki} alt="Aki" className={"agent " + (currentAgent === 0 && "current")} onClick={(e) => {handleAgentChange(e)}} />
        <img src={jocke} alt="Jocke" className={"agent " + (currentAgent === 1 && "current")} onClick={(e) => {handleAgentChange(e)}} />
        <img src={draza} alt="Draza" className={"agent " + (currentAgent === 2 && "current")} onClick={(e) => {handleAgentChange(e)}} />
        <img src={bole} alt="Bole" className={"agent " + (currentAgent === 3 && "current")} onClick={(e) => {handleAgentChange(e)}} />
      </div>

      <FormControl sx={{ m: 2, width: '100%' }}>
        <InputLabel id="demo-simple-select-helper-label">Pick a map</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Izaberi mapu"
          sx={{ width: '100%', color: "white", mt: 3, mb: 2 }}
          onChange={handleMapChange}
          value={currentMap}
          className="selectMUI"
          //@ts-ignore
          disabled={isMoving}
          input={<CustomInput />}
        >
          <MenuItem value={0}>Tutorial</MenuItem>
          <MenuItem value={1}>Walk in the park</MenuItem>
          <MenuItem value={2}>Dungeon</MenuItem>
          <MenuItem value={3}>Castle garden</MenuItem>
          <MenuItem value={4}>Temple</MenuItem>
          <MenuItem value={5}>Beach</MenuItem>
          <MenuItem value={6}>Tutorial Maze</MenuItem>
          <MenuItem value={7}>Harder Maze</MenuItem>
          <MenuItem value={8}>The Maze</MenuItem>
        </Select>
        <FormHelperText sx={{ color: "white", fontSize: "0.85rem" }}>Please pick one of the maps given above</FormHelperText>
      </FormControl>

      <Igra 
        mapa={mapa} 
        pozicija={pozicija} 
        currentAgent={currentAgent} 
        markedTile={markedTile} 
        setMarkedTile={setMarkedTile} 
        setPozicija={setPozicija}
        setMarkChanged={setMarkChanged}
        pathToGoal={pathToGoal}
        isMoving={isMoving}
      />
    </>
  );
}

export default PyTanja;

