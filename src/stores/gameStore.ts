import { makeAutoObservable, runInAction } from "mobx";
import { dimensionsMiddleware, getAgentPosition, getRandomInt } from "../helpers/usefulFunctions";
import axios from "axios";
import { APIBase } from "../constants/hosts";

export default class GameStore {
    board: Array<Array<string>> = [[]];
    userAgentPosition: Array<number> = [0, 0];
    compAgentPosition: Array<number> = [0, 0];
    loading: boolean = false;
    thinking: boolean = false;
    boardRows: number = 0;
    boardColumns: number = 0;
    currentAgent: number = 0;
    gameIsOver: boolean = false;
    winner: string = '';


    constructor () {
        makeAutoObservable(this);
    }

    changeBoardRows = (rows: number) => {
        this.boardRows = rows;
    }

    changeBoardColumns = (columns: number) => {
        this.boardColumns = columns;
    }

    setCurrentAgent = (agent: number) => {
        this.currentAgent = agent;
    }

    setPlayerAgentPosition = (newPosition: Array<number>) => {
        this.board[this.userAgentPosition[0]][this.userAgentPosition[1]] = 'h';
        this.userAgentPosition = newPosition;
    }

    loadMap = async () => {
        this.loading = true;
        this.gameIsOver = false;
        this.winner = '';
        try {
            const response = await axios.post(`${APIBase}` + 'single/start', dimensionsMiddleware(this.boardRows, this.boardColumns));
            runInAction(() => {
                this.board = response.data.board;
                this.boardRows = response.data.board.length;
                this.boardColumns = response.data.board[0].length;
                this.userAgentPosition = getAgentPosition(this.board, '1');
                this.compAgentPosition = getAgentPosition(this.board, '0');
                this.loading = false;
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false);
        }
    }

    makeAMove = (currRow: number, currCol: number, row: number, col: number) => {
        this.board[currRow][currCol] = 'h';
        this.board[row][col] = '1';
    }

    makeAComputerMove = async () => {
        this.thinking = true;
        try {
            const response = await axios.post(`${APIBase}` + 'single/ai', {
                board: this.board,
            });
            runInAction(() => {
                if (response.data.winner) {
                    this.board = response.data.board;
                    this.compAgentPosition = getAgentPosition(this.board, '0');
                    this.thinking = false;
                    this.gameIsOver = true;
                    this.winner = (response.data.winner === 'Computer') ? '0' : '1';
                } else {
                    this.board = response.data.board;
                    this.compAgentPosition = getAgentPosition(this.board, '0');
                    this.thinking = false;
                }
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.thinking = false);
        }
    }
}