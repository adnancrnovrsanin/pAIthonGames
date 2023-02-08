import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import '../App.css'
import { observer } from 'mobx-react-lite'
import { Button, CircularProgress, Typography, useTheme } from '@mui/material';
import aki from '../assets/Aki.png';
import jocke from '../assets/Jocke.png';
import draza from '../assets/Draza.png';
import bole from '../assets/Bole.png';
import { useStore } from '../stores/store';
import TileLayer from '../PyStolovinaComponents/TileLayer';
import Grid2 from '@mui/material/Unstable_Grid2';
import logo from '../assets/LogoGameLauncherBlack.png';
import { Link } from 'react-router-dom';
import { reaction } from 'mobx';
import { toast } from 'react-toastify';
import Settings from '../PyStolovinaComponents/Settings';
import SettingsIcon from '@mui/icons-material/Settings';


function PyStolovina() {
  const { gameStore: { 
    loadMap,
    loading,
    currentAgents,
    currentTurn,
    setCurrentAgent,
    settingsOpen,
    setSettingsOpen,
    userPlayers,
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
        setCurrentAgent(0, currentTurn);
        break;
      case 'Jocke':
        setCurrentAgent(1, currentTurn);
        break;
      case 'Draza':
        setCurrentAgent(2, currentTurn);
        break;
      case 'Bole':
        setCurrentAgent(3, currentTurn);
        break;
    }
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
      {userPlayers.includes(currentTurn) && !gameIsOver ? (
        <>
          <Typography
            sx={{
              color: "white",
              margin: "10px 0",
            }}
          >
            {"Change your agent:"}
          </Typography>

          <div className="agenti">
            <img src={aki} alt="Aki" className={"agent " + (currentAgents[+currentTurn] === 0 && "current")} onClick={handleAgentChange} />
            <img src={jocke} alt="Jocke" className={"agent " + (currentAgents[+currentTurn] === 1 && "current")} onClick={handleAgentChange} />
            <img src={draza} alt="Draza" className={"agent " + (currentAgents[+currentTurn] === 2 && "current")} onClick={handleAgentChange} />
            <img src={bole} alt="Bole" className={"agent " + (currentAgents[+currentTurn] === 3 && "current")} onClick={handleAgentChange} />
          </div>
        </>
      ) : (
        <Typography
          sx={{
            fontFamily: "Roboto",
            color: "white",
            margin: { xs: "10px 0", sm: "10px 0", md: "20px 0", lg: "30px 0", xl: "50px 0" },
            fontSize: { xs: "20px", sm: "22px", md: "24px", lg: "26px", xl: "28px" },
          }}
        >
          {gameIsOver ? "Game is over!" : "Computer is playing..."}
        </Typography>
      )}

      {settingsOpen ? (
        <Settings />
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
                color: "white",
                border: "1px solid white",
                bgcolor: "transparent",
                '&:hover': {
                    bgcolor: "white",
                    color: "black",
                },
                borderRadius: 0,
                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "17px", xl: "18px" },
                padding: "10px 25px",
                margin: "50px 0",
            }}
            onClick={() => setSettingsOpen(true)}
          >
              Settings <SettingsIcon sx={{ marginLeft: "10px" }} />
          </Button>

          <button
            className="generateMapButton"
            onClick={() => loadMap()}
          >
            {"New Game"}
          </button>
        </>
      )}

      <TileLayer />
    </div>
  )
}

export default observer(PyStolovina);
