import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { useStore } from "../stores/store";
import { ChangeEvent } from "react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import InputField from "./common/InputField";
import '../App.css';
import { Button, useMediaQuery } from "@mui/material";
import ValidationError from "./common/ValidationError";
import minimaxAgent from "../assets/StudentAgentMinimax.png"
import minimaxABAgent from "../assets/StudentAgent.png"
import expectimaxAgent from "../assets/StudentAgentExpectimax.png"
import maxNAgent from "../assets/StudentAgentMaxN.png"


function Settings() {
    const { gameStore } = useStore();
    const matchMobile = useMediaQuery("(max-width: 800px)");

    const {
        boardRows,
        boardColumns,
        depth,
        timeToThink,
        numberOfExpectimaxPlayers,
        numberOfMaxNPlayers,
        numberOfMinimaxPlayers,
        numberOfMinimaxABPlayers,
        numberOfUserPlayers,
        numberOfAllPlayers,
        submitSettings,
        setSettingsOpen,
    } = gameStore;

    return (
        <Formik
            initialValues={{
                boardRows: boardRows,
                boardColumns: boardColumns,
                depth: depth,
                timeToThink: timeToThink,
                numberOfExpectimaxPlayers: numberOfExpectimaxPlayers,
                numberOfMaxNPlayers: numberOfMaxNPlayers,
                numberOfMinimaxPlayers: numberOfMinimaxPlayers,
                numberOfMinimaxABPlayers: numberOfMinimaxABPlayers,
                numberOfUserPlayers: numberOfUserPlayers,
                error: null,
            }}
            onSubmit={(values) => {
                let sumOfAllPlayers = +values.numberOfExpectimaxPlayers + +values.numberOfMaxNPlayers + +values.numberOfMinimaxABPlayers + +values.numberOfUserPlayers + +values.numberOfMinimaxPlayers;
                
                console.log(values);
                console.log(sumOfAllPlayers);

                if (sumOfAllPlayers < 2) {
                    toast.error("You must have at least two players");
                    return;
                }

                if (sumOfAllPlayers > 5) {
                    toast.error("Too many players. Getting too crowded here.");
                    return;
                }

                if (sumOfAllPlayers > 2 && values.numberOfMinimaxPlayers > 0) {
                    toast.error("You can have at most 2 players if you have Minimax player");
                    return;
                } 

                if (sumOfAllPlayers > 2 && values.numberOfMinimaxABPlayers > 0) {
                    toast.error("You can have at most 2 players if you have MinimaxAB player");
                    return;
                }

                if (sumOfAllPlayers > 2 && values.numberOfExpectimaxPlayers > 0) {
                    toast.error("You can have at most 2 players if you have Expectimax player");
                    return;
                }

                submitSettings(values);
            }}
            validationSchema={Yup.object({
                boardRows: Yup.number()
                    .required("Required")
                    .min(5, "Must be at least 5")
                    .max(17, "Must be at most 17"),
                boardColumns: Yup.number()
                    .required("Required")
                    .min(5, "Must be at least 5")
                    .max(17, "Must be at most 17"),
                depth: Yup.number()
                    .required("Required")
                    .min(1, "Must be at least 1")
                    .max(10, "Must be at most 10"),
                timeToThink: Yup.number()
                    .required("Required")
                    .min(1, "Must be at least 1"),
                numberOfExpectimaxPlayers: Yup.number()
                    .required("Required")
                    .min(0, "Must be at least 0")
                    .max(2, "Must be at most 2"),
                numberOfMaxNPlayers: Yup.number()
                    .required("Required")
                    .min(0, "Must be at least 0"),
                numberOfMinimaxPlayers: Yup.number()
                    .required("Required")
                    .min(0, "Must be at least 0")
                    .max(2, "Must be at most 2"),
                numberOfMinimaxABPlayers: Yup.number()
                    .required("Required")
                    .min(0, "Must be at least 0")
                    .max(2, "Must be at most 2"),
                numberOfUserPlayers: Yup.number()
                    .min(0, "Must be at least 0")
                    .max(4, "Must be at most 4"),
            })}
        >
            {({ isSubmitting, handleSubmit, isValid, dirty, errors, resetForm }) => (
                <Form onSubmit={handleSubmit}
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "50px 0"
                    }}
                >
                    <div className="row">
                        <InputField name="numberOfUserPlayers" label="Enter the number of human players: " placeholder="Enter a number..." type="number" />
                    </div>

                    <div className="row">
                        <InputField name="numberOfMinimaxPlayers" label="Enter the number of Minimax agents (they cannot play against more than one player): " placeholder="Enter a number..." type="number" />
                        <img src={minimaxAgent} alt="minimax agent" className="settings-agent" />
                        <InputField name="numberOfMinimaxABPlayers" label="Enter the number of MinimaxAlfaBeta agents (they cannot play against more than one player): " placeholder="Enter a number..." type="number" />
                        <img src={minimaxABAgent} alt="minimax alfa beta agent" className="settings-agent" />
                    </div>

                    <div className="row">
                        <InputField name="numberOfExpectimaxPlayers" label="Enter the number of Expectimax agents(they cannot play against more than one player): " placeholder="Enter a number..." type="number" />
                        <img src={expectimaxAgent} alt="minimax agent" className="settings-agent" />
                        <InputField name="numberOfMaxNPlayers" label="Enter the number of MaxN agents: " placeholder="Enter a number..." type="number" />
                        <img src={maxNAgent} alt="minimax agent" className="settings-agent" />
                    </div>

                    <div className="row">
                        <InputField name="depth" label="Enter the depth of the algorithm: " placeholder="Enter depth" type="number" />
                        <InputField name="timeToThink" label="Enter the given time for thinking of the algorithm: " placeholder="Enter time" type="number" />
                    </div>

                    <div className="row">
                        <InputField name="boardRows" label="Enter the number of rows for the map: " placeholder="Enter rows" type="number" />
                        <InputField name="boardColumns" label="Enter the number of columns for the map: " placeholder="Enter columns" type="number" />
                    </div>

                    <ErrorMessage name="error" render={() => <ValidationError errors={errors.error} />} />

                    <div
                        style={{
                            alignSelf: "center",
                            width: "100%",
                            display: "flex",
                            flexDirection: matchMobile ? "column-reverse" : "row",
                            justifyContent: "space-between",
                            alignItems: matchMobile ? "center" : "flex-end",
                            margin: "50px 0",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                color: "white",
                                border: "1px solid white",
                                bgcolor: "transparent",
                                '&:hover': {
                                    bgcolor: "white",
                                    color: "black",
                                },
                                borderRadius: 0,
                                fontSize: { xs: "11px", sm: "13px", md: "15px", lg: "16px", xl: "17px" },
                                padding: "10px 25px",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                resetForm();
                                setSettingsOpen(false);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                color: "black",
                                border: "1px solid white",
                                bgcolor: "white",
                                '&:hover': {
                                    bgcolor: "black",
                                    color: "white",
                                },
                                borderRadius: 0,
                                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "17px", xl: "18px" },
                                padding: "10px 25px",
                                margin: matchMobile ? "30px 0" : "0"
                            }}
                            type="submit"
                        >
                            Apply changes
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default observer(Settings);