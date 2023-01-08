import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store.js";
import compAgent from "../assets/StudentAgent.png";
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
import { getRandomInt } from "../helpers/usefulFunctions.js";

interface Props {
    tile: string;
    row: number;
    col: number;
}

var images = [hole0, hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9];

function Tile({ tile, row, col }: Props) {
    const { gameStore: { 
        userAgentPosition,
        compAgentPosition,
        setPlayerAgentPosition,
        makeAMove,
        makeAComputerMove,
        thinking,
        currentAgent,
        winner,
        gameIsOver,
    }} = useStore();

    const isUserAgent = () => userAgentPosition[0] === row && userAgentPosition[1] === col;

    const isCompAgent = () => compAgentPosition[0] === row && compAgentPosition[1] === col;

    const isRoad = () => tile === "r" || tile === "1" || tile === "0";

    function handleTileClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (
            isRoad() && !isUserAgent() && !isCompAgent() && !thinking && !gameIsOver &&
            Math.abs(userAgentPosition[0] - row) <= 1 && Math.abs(userAgentPosition[1] - col) <= 1
        ) {
            makeAMove(userAgentPosition[0], userAgentPosition[1], row, col);
            setPlayerAgentPosition([row, col]);
            makeAComputerMove();
        } else {
            console.log("Wrong move!");
        }
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

    return (
        <div className={"tile "} onClick={handleTileClick}
            style={{
                backgroundImage: isRoad() ? `url(${road})` : `url(${images[getRandomInt(9)]})`,
            }}
        >
            {isUserAgent() && !isCompAgent() && isRoad() &&
                <img src={convertNumberToAgent(currentAgent)} alt="user agent" className="tileAgent" />
            }

            {!isUserAgent() && isCompAgent() && isRoad() &&
                <img src={compAgent} alt="comp agent" className="tileAgent" />
            }

            {isUserAgent() && winner === '0' &&
                <img src={crossImage} alt="cross" className="cross"/>
            }

            {isCompAgent() && winner === '1' &&
                <img src={crossImage} alt="cross" className="cross"/>
            }
        </div>
    );
}

export default observer(Tile);