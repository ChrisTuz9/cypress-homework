import styles from "../styles/styles.module.css"

export function InputField({ label, ...props }) {
    return (
        <div className={styles["InputField"]}>
            <label>{label} </label>
            <input {...props} />
        </div>
    );
}