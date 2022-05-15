import React from "react";
import styles from '../styles/login.module.css';
import { starProps, stateTypes } from "./types/propTypes";

export default class Stars extends React.Component<starProps, stateTypes>{
    constructor(props: starProps){
        super(props)
        this.state = {clickedIndex: 0};
    }


    render(){
        let tds = [];
        for (let i = 1; i < this.props.amount; i++){
            const tdElm = (<td key={i} onClick={()=>{this.setState({clickedIndex: i})}}>{this.state.clickedIndex == i ? 'up': 'down'}</td>)
            tds.push(tdElm)
        }
        return (
            <table>
                <tbody>
                    <tr>
                        {tds}
                    </tr>
                </tbody>
            </table>
        )
    }
}