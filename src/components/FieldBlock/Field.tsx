import styles from './FieldBlock.module.css'
import IFieldBlockProps from './IFieldBlockProps'

const FieldBlock: React.FunctionComponent<IFieldBlockProps> = (props): React.ReactElement => {

    return(
        <div onClick={props.fillBlock} className={styles.FieldBlock}>
            <p>{props.textContent}</p>
        </div>
    )
}

export default FieldBlock