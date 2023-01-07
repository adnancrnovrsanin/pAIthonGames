import { Button, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import PyTanjaScreen from "../assets/PyTanjaScreen.png";
import PyStolovinaScreen from "../assets/PyStolovinaScreen.png";
import { Link } from "react-router-dom";
import logo from '../assets/LogoGameLauncherBlack.png';

function Home() {
    const theme = useTheme();
    return (
        <Grid2 lg={12} container height="100vh">
            <Grid2
                lg={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    margin: "20px 0",
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

            <Grid2
                lg={12}
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                }}
            >
                <Card sx={{ 
                    maxWidth: 345,
                    height: "fit-content",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    color: "white",
                    textDecoration: "none",
                    transition: "transform 1s ease-in-out",
                    '&:hover': {
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.1)",
                    },
                    [theme.breakpoints.down("sm")]: {
                        marginBottom: "30px",
                    },
                }}
                    component={Link}
                    to='/pytanja'
                >
                    <CardMedia
                        sx={{ height: "250px" }}
                        image={PyTanjaScreen}
                        title="pytanja game"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            PyTanja
                        </Typography>
                        <Typography variant="body1">
                            PyTanja is a pathfinding game where ai has to find the shortest path from the start to the end.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ 
                    maxWidth: 345,
                    height: "fit-content",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    color: "white",
                    transition: "transform 1s ease-in-out",
                    textDecoration: "none",
                    '&:hover': {
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.1)",
                    },
                    [theme.breakpoints.down("sm")]: {
                        marginBottom: "30px",
                    },
                }}
                    component={Link}
                    to='/pystolovina'
                >
                    <CardMedia
                        sx={{ height: "250px" }}
                        image={PyStolovinaScreen}
                        title="pystolovina game"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            PyStolovina
                        </Typography>
                        <Typography variant="body1">
                            PyStolovina is a fun game that is played on a board with agents. The goal is to make others unable to move.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}

export default Home;