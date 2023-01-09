import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import Tile from "./Tile";
import "../App.css";

function TileLayer() {
    const { gameStore: { board } } = useStore();

    return (
        <div className="tileLayer">
            {board.map((row, rowIndex) => (
                <div className="tileRow" key={rowIndex}>
                    {row.map((tile, colIndex) => (
                        <Tile 
                            key={colIndex}
                            tile={tile}
                            row={rowIndex}
                            col={colIndex}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default observer(TileLayer);