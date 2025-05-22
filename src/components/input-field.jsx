import styles from "../styles/styles.module.css"

export function InputField({ label, error, touched, ...props }) {
    return (
        <div className={styles["InputField"]}>
            <label>{label} </label>
            <input {...props} />
            {touched && error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}