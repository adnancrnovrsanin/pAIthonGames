import { makeAutoObservable, runInAction } from "mobx";
import { dimensionsMiddleware, getAgentPosition, getRandomInt } from "../helpers/usefulFunctions";
import axios from "axios";
import { APIBase } from "../constants/hosts";
import { AlgorithmsInUse, CurrentAgents, PlayersLocations } from "../models/dictionaries";
import { toast } from "react-toastify";
import { SettingsFormValues } from "../models/SettingsFormValues";

export default class GameStore {
    board: Array<Array<string>> = [[]];
    allPlayersPositions: PlayersLocations = {};
    userPlayers: Array<string> = [];
    currentAgents: CurrentAgents = {};
    aiPlayers: Array<string> = [];
    loading: boolean = false;
    thinking: boolean = false;
    boardRows: number = 7;
    boardColumns: number = 7;
    gameIsOver: boolean = false;
    loosers: Array<string> = [];
    currentTurn: string = '';
    algorithmsInUse: AlgorithmsInUse = {};
    numberOfMinimaxPlayers: number = 0;
    numberOfMinimaxABPlayers: number = 1;
    numberOfExpectimaxPlayers: number = 0;
    numberOfMaxNPlayers: number = 0;
    numberOfUserPlayers: number = 1;
    depth: number = 7;
    timeToThink: number = 5;
    settingsOpen: boolean = false;


    constructor () {
        makeAutoObservable(this);
    }

    get numberOfAllPlayers() {
        return this.numberOfMinimaxPlayers + this.numberOfExpectimaxPlayers + this.numberOfMaxNPlayers + this.numberOfUserPlayers + this.numberOfMinimaxABPlayers;
    }

    get allPlayersSorted() {
        return this.aiPlayers.concat(this.userPlayers).sort((a, b) => parseInt(a) - parseInt(b));
    }

    isMoveValid = (row: number, col: number) => {
        if (this.gameIsOver) {
            toast.info('Game is over');
            return false;
        }

        if (this.thinking) {
            toast.error('Wait for the computer to finish thinking.');
            return false;
        }

        if (Math.abs(this.allPlayersPositions[+this.currentTurn][0] - row) > 1 || Math.abs(this.allPlayersPositions[+this.currentTurn][1] - col) > 1) {
            toast.error('You can only move one step at a time.');
            return false;
        }

        if (this.board[row][col] === 'h') {
            toast.error('You can\'t step on holes. You will fall down.');
            return false;
        }

        if (!isNaN(+this.board[row][col])) {
            toast.error('You can\'t step on other players.');
            return false;
        }

        return true;
    }

    setCurrentAgent = (agent: number, userPlayer: string) => this.currentAgents[+userPlayer] = agent;

    setSettingsOpen = (open: boolean) => { this.settingsOpen = open; } 

    submitSettings = (values: SettingsFormValues) => {
        this.numberOfMinimaxPlayers = values.numberOfMinimaxPlayers;
        this.numberOfMinimaxABPlayers = values.numberOfMinimaxABPlayers;
        this.numberOfExpectimaxPlayers = values.numberOfExpectimaxPlayers;
        this.numberOfMaxNPlayers = values.numberOfMaxNPlayers;
        this.numberOfUserPlayers = values.numberOfUserPlayers;
        this.depth = values.depth;
        this.timeToThink = values.timeToThink;
        this.setSettingsOpen(false);
    }

    loadMap = async () => {
        this.loading = true;
        this.gameIsOver = false;
        this.loosers = [];
        try {
            const response = await axios.post(`${APIBase}` + 'single/start', {
                ...dimensionsMiddleware(this.boardRows, this.boardColumns),
                numberOfPlayers: this.numberOfAllPlayers,
                numberOfMinimaxPlayers: this.numberOfMinimaxPlayers,
                numberOfMinimaxABPlayers: this.numberOfMinimaxABPlayers,
                numberOfExpectimaxPlayers: this.numberOfExpectimaxPlayers,
                numberOfMaxNPlayers: this.numberOfMaxNPlayers,
                numberOfUserPlayers: this.numberOfUserPlayers,
            });
            runInAction(() => {
                this.board = response.data.board;
                this.boardRows = response.data.board.length;
                this.boardColumns = response.data.board[0].length;
                for (let i = 0; i < response.data.board.length; i++)
                    for (let j = 0; j < response.data.board[0].length; j++){
                        if (!isNaN(+response.data.board[i][j]))
                            this.allPlayersPositions[+response.data.board[i][j]] = [i, j];
                    }
                this.userPlayers = response.data.userPlayers;
                this.aiPlayers = response.data.aiPlayers;
                this.algorithmsInUse = response.data.algorithmsInUse;
                this.currentTurn = this.allPlayersSorted[0];
                this.loading = false;
                if (response.data.aiPlayers.includes(this.currentTurn))
                    this.makeAComputerMove(this.currentTurn);
                response.data.userPlayers.forEach((userPlayer: string) => this.currentAgents[+userPlayer] = getRandomInt(3))
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false);
        }
    }

    nextTurn = () => {
        this.currentTurn = this.allPlayersSorted[(this.allPlayersSorted.indexOf(this.currentTurn) + 1) % this.allPlayersSorted.length];
        if (this.loosers.includes(this.currentTurn)) {
            this.nextTurn();
            return;
        }
        if (this.aiPlayers.includes(this.currentTurn))
            this.makeAComputerMove(this.currentTurn);
    }

    makeAMove = (row: number, col: number) => {
        this.board[this.allPlayersPositions[+this.currentTurn][0]][this.allPlayersPositions[+this.currentTurn][1]] = 'h';
        this.board[row][col] = this.currentTurn;
        this.allPlayersPositions[+this.currentTurn] = [row, col];
        this.checkLoosers();
        this.nextTurn();
    }

    makeAComputerMove = async (aiPlayer: string) => {
        this.thinking = true;
        try {
            const response = await axios.post(`${APIBase}` + 'single/ai', {
                board: this.board,
                aiPlayer: aiPlayer,
                algorithmInUse: this.algorithmsInUse[aiPlayer],
                depth: this.depth,
                time_to_think: this.timeToThink,
            });
            runInAction(() => {
                console.log(response);
                this.board = response.data.board;
                this.loosers = (response.data.loosers.length > 0)? response.data.loosers : this.loosers;
                this.gameIsOver = response.data.gameIsOver;
                this.allPlayersPositions[+aiPlayer] = getAgentPosition(this.board, aiPlayer);
                this.thinking = false;
                if (this.gameIsOver) {
                    toast.info('Game is over');
                    return;
                } else this.nextTurn();
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.thinking = false);
        }
    }

    checkLoosers = async () => {
        this.thinking = true;
        const response = await axios.post(`${APIBase}` + 'loosers', { board: this.board });
        runInAction(() => {
            console.log(response);
            this.loosers = response.data.loosers;
            this.gameIsOver = response.data.gameIsOver;
            this.thinking = false;
        });
    }
}