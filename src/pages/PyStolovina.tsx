import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import '../App.css'
import { observer } from 'mobx-react-lite'
import { CircularProgress, Typography, useTheme } from '@mui/material';
import aki from '../assets/Aki.png';
import jocke from '../assets/Jocke.png';
import draza from '../assets/Draza.png';
import bole from '../assets/Bole.png';
import { useStore } from '../stores/store.js';
import TileLayer from '../PyStolovinaComponents/TileLayer.js';
import Grid2 from '@mui/material/Unstable_Grid2';
import logo from '../assets/LogoGameLauncherBlack.png';
import { Link } from 'react-router-dom';


function PyStolovina() {
  const { gameStore: { 
    loadMap,
    loading,
    currentAgent,
    setCurrentAgent,
    boardColumns,
    boardRows,
    changeBoardColumns,
    changeBoardRows,
    gameIsOver,
  } } = useStore();

  const theme = useTheme();

  useEffect(() => {
    loadMap();
  }, []);

  if (loading) return <CircularProgress />

  function handleAgentChange(e: MouseEvent<HTMLImageElement>) {
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

  function handleDimensionsInputChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.name === 'rows')
      changeBoardRows(+e.target.value);
    else if (e.target.name === 'columns')
      changeBoardColumns(+e.target.value);
  }

  return (
    <div className="App">

      <Grid2
          lg={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
              margin: "50px 0 100px 0",
              textDecoration: "none",
              [theme.breakpoints.down("sm")]: {
                  margin: "30px 0 50px 30px"
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
          margin: "10px 0",
        }}
      >
        {"Pick your agent:"}
      </Typography>

      <div className="agenti">
        <img src={aki} alt="Aki" className={"agent " + (currentAgent === 0 && "current")} onClick={handleAgentChange} />
        <img src={jocke} alt="Jocke" className={"agent " + (currentAgent === 1 && "current")} onClick={handleAgentChange} />
        <img src={draza} alt="Draza" className={"agent " + (currentAgent === 2 && "current")} onClick={handleAgentChange} />
        <img src={bole} alt="Bole" className={"agent " + (currentAgent === 3 && "current")} onClick={handleAgentChange} />
      </div>

      <div className='inputDiv'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="rows"
            style={{
              color: "white",
              marginLeft: "5px",
              marginBottom: "5px",
            }}
          >
            {"Number of rows for the board:"}
          </label>
          <input 
            name="rows"
            type="text" 
            placeholder="Number of rows" 
            className='inputField'
            value={boardRows}
            onChange={(e) => handleDimensionsInputChange(e)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="rows"
            style={{
              color: "white",
              marginLeft: "5px",
              marginBottom: "5px",
            }}
          >
            {"Number of columns for the board:"}
          </label>
          <input 
            name="columns"
            type="text" 
            placeholder="Number of columns" 
            className='inputField'
            value={boardColumns}
            onChange={(e) => handleDimensionsInputChange(e)}
          />
        </div>
      </div>

      <button
        className="generateMapButton"
        onClick={() => loadMap()}
      >
        {"New Game"}
      </button>

      <TileLayer />
    </div>
  )
}

export default observer(PyStolovina);
