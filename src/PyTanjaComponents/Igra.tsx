import { Dispatch, SetStateAction } from "react";
import Tile from "./Tile";

interface Props {
    mapa: number[][],
    pozicija: number[],
    currentAgent: number,
    markedTile: number[],
    setMarkedTile: Dispatch<SetStateAction<number[]>>,
    setPozicija: Dispatch<SetStateAction<number[]>>,
    setMarkChanged: Dispatch<SetStateAction<Boolean>>,
    pathToGoal: Array<Array<number>>,
    isMoving: Boolean,
}

function Igra({ mapa, pozicija, currentAgent, markedTile, setMarkedTile, setPozicija, setMarkChanged, pathToGoal, isMoving }: Props) {
    return (
        <div className="igra">
            {mapa.map((x: number[], i: number) => (
                <div key={i} className="red">
                    {x.map((y: number, j: number)=> (
                        <Tile 
                            key={j} 
                            tileType={y} 
                            red={i} 
                            kolona={j} 
                            pozicija={pozicija} 
                            currentAgent={currentAgent} 
                            markedTile={markedTile} 
                            setMarkedTile={setMarkedTile} 
                            setPozicija={setPozicija}
                            setMarkChanged={setMarkChanged}
                            pathToGoal={pathToGoal}
                            isMoving={isMoving}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Igra;