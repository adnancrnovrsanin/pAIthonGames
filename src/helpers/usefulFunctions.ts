// Generate a random number between 0 and some integer including 0 and the integer
export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const getAgentPosition = (board: Array<Array<string>>, agent: string): number[] => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === agent) return [i, j];
        }
    }
    return [0, 0];
}

export const dimensionsMiddleware = (rows: number, columns: number) => {
    if (rows === 0 && columns === 0) 
        return { rows: 4 + getRandomInt(4), columns: 4 + getRandomInt(4) };
    if (rows > 17 && columns > 17) return { rows: 17, columns: 17 };
    if (rows > 17) return { rows: 17, columns };
    if (columns > 17) return { rows, columns: 17 };
    return { rows, columns };
}