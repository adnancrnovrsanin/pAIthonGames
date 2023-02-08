import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import minimaxABAgent from "../assets/StudentAgent.png";
import minimaxAgent from "../assets/StudentAgentMinimax.png";
import expectimaxAgent from "../assets/StudentAgentExpectimax.png";
import maxNAgent from "../assets/StudentAgentMaxN.png";
import road from '../assets/road.png';
import hole0 from '../assets/hole0.png';
import hole1 from '../assets/hole1.png';
import hole2 from '../assets/hole2.png';
import hole3 from '../assets/hole3.png';
import hole4 from '../assets/hole4.png';
import hole5 from '../assets/hole5.png';
import hole6 from '../assets/hole6.png';
import hole7 from '../assets/hole7.png';
import hole8 from '../assets/hole8.png';
import hole9 from '../assets/hole9.png';
import aki from '../assets/Aki.png';
import jocke from '../assets/Jocke.png';
import draza from '../assets/Draza.png';
import bole from '../assets/Bole.png';
import crossImage from '../assets/x.png';
import '../App.css';
import { getRandomInt } from "../helpers/usefulFunctions";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Props {
    tile: string;
    row: number;
    col: number;
}

var images = [hole0, hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9];

function Tile({ tile, row, col }: Props) {
    const { gameStore: {
        makeAMove,
        isMoveValid,
        board,
        userPlayers,
        aiPlayers,
        loosers,
        currentAgents,
        currentTurn,
        gameIsOver,
        algorithmsInUse,
    }} = useStore();

    function handleTileClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (userPlayers.includes(currentTurn))
            if (isMoveValid(row, col))
                makeAMove(row, col);
    }

    const convertNumberToAgent = (number: number) => {
        switch(number) {
            case 0:
                return aki;
            case 1:
                return jocke;
            case 2:
                return draza;
            case 3:
                return bole;
        }
    }

    const isHole = () => tile === 'h';

    const isLooser = () => loosers.some(l => l === tile);

    const isAiAgentHere = () => aiPlayers.some(a => a === tile);

    const isUserAgentHere = () => userPlayers.some(u => u === tile);

    const isHisTurn = () => currentTurn === tile;

    const getMyAgent = () => {
        if (isUserAgentHere())
            return currentAgents[+tile];
        else
            return -1;
    }

    const getCompAgent = () => {
        if (isAiAgentHere())
            switch(algorithmsInUse[tile]) {
                case "minimax":
                    return minimaxAgent;
                case "minimaxAB":
                    return minimaxABAgent;
                case "expectimax":
                    return expectimaxAgent;
                case "maxN":
                    return maxNAgent;
            }
        else
            return "";
    }

    return (
        <div className={"tile "} onClick={handleTileClick}
            style={{
                backgroundImage: !isHole() ? `url(${road})` : `url(${images[getRandomInt(9)]})`,
            }}
        >
            {isUserAgentHere() && !isHole() &&
                <img src={convertNumberToAgent(getMyAgent())} alt="user agent" className="tileAgent" />
            }

            {isAiAgentHere() && !isHole() &&
                <img src={getCompAgent()} alt="comp agent" className="tileAgent" />
            }

            {isLooser() &&
                <img src={crossImage} alt="cross" className="cross"/>
            }

            {isHisTurn() && !isLooser() && !gameIsOver &&
                <div className="hisTurn"></div>
            }
        </div>
    );
}

export default observer(Tile);