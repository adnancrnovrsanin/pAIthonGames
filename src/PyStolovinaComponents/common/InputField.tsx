import { useField } from "formik";
import '../../App.css';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default function InputField(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <div className="textField">
            <label htmlFor={props.name}
                style={{
                    color: "white",
                    marginLeft: "5px",
                    marginBottom: "5px",
                    maxWidth: "300px",
                }}
            >
                {props.label}
            </label>

            <input 
                {...field}
                {...props}
                className="inputField"
                style={{
                    borderColor: meta.touched && meta.error ? "red" : "white",
                }}
            />

            {meta.touched && meta.error ? (
                <label htmlFor={props.name}
                    style={{
                        color: "red",
                        fontSize: "0.8rem",
                        maxWidth: "300px",
                    }}
                >{meta.error}</label>
            ) : null}
        </div>
    );
}