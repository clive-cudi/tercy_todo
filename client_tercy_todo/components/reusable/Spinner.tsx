import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import styles from '../../styles/components/reusable/spinner.module.scss';

export const Spinner = (): JSX.Element =>{
    return (
        <div className={styles.spin_wrapper}>
            <span>
                <ImSpinner2 />
            </span>
        </div>
    )
}