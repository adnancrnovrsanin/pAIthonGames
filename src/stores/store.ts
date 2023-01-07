import { createContext, useContext } from "react";
import GameStore from "./gameStore";

interface Store {
    gameStore: GameStore;
}

export const store: Store = {
    gameStore: new GameStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}