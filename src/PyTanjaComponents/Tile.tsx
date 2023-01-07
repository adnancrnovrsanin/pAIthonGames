import aki from '../assets/Aki.png';
import jocke from '../assets/Jocke.png';
import draza from '../assets/Draza.png';
import bole from '../assets/Bole.png';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import mark from '../assets/x.png';

interface Props {
    tileType: number,
    red: number,
    kolona: number,
    pozicija: number[],
    currentAgent: number,
    markedTile: number[],
    setMarkedTile: Dispatch<SetStateAction<number[]>>,
    setPozicija: Dispatch<SetStateAction<number[]>>,
    setMarkChanged: Dispatch<SetStateAction<Boolean>>,
    pathToGoal: Array<Array<number>>,
    isMoving: Boolean,
}

function Tile({ tileType, red, kolona, pozicija, currentAgent, markedTile, setMarkedTile, setMarkChanged, pathToGoal, isMoving }: Props) {

    const TilePicker = () => {
        if (tileType === 2)
            return "put";
        if (tileType === 3)
            return "trava";
        if (tileType === 5)
            return "zemlja";
        if (tileType === 7)
            return "pesak";
        if (tileType === 500)
            return "voda";
        if (tileType === 1000)
            return "zid";
    }

    const AgentPicker = () => {
        if (currentAgent === 0)
            return aki;
        if (currentAgent === 1)
            return jocke;
        if (currentAgent === 2)
            return draza;
        if (currentAgent === 3)
            return bole;
    } 

    const agentPresence = () => pozicija[0] === red && pozicija[1] === kolona;

    const markHere = () => red === markedTile[0] && kolona === markedTile[1];

    const isThisPath = () => {
        let point = [red, kolona];
        let pointAsString = JSON.stringify(point);

        let contains = pathToGoal.some(e => JSON.stringify(e) === pointAsString );

        return contains;
    }

    const getNum = () => {
        let point = [red, kolona];
        let pointAsString = JSON.stringify(point);

        for (let i = 0; i < pathToGoal.length; i++) {
            if (JSON.stringify(pathToGoal[i]) === pointAsString)
                return i
        }
    }

    const handleTileClick = async () => {
        if (!(kolona === pozicija[0] && red === pozicija[1])){
            setMarkedTile([red, kolona]);
            setMarkChanged(true);
        }
    }

    return (
        <div className={ "polje " + TilePicker() } onClick={handleTileClick}>
            {agentPresence() && 
                <img src={AgentPicker()} alt="agent" className="tileAgent"/>
            }

            {markHere() && !agentPresence() &&
                <img src={mark} alt="mark" className='mark' />
            }

            {!agentPresence() && !markHere() && isThisPath() && isMoving  &&
                <div className="dot">
                    {getNum()}
                </div>
            }
        </div>
    );
}

export default Tile;