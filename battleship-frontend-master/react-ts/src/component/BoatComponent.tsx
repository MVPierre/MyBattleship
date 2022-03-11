import React from "react";
import boat from '../assets/boat.jpg';
import './BoatComponent.css';
import Boat from "../model/BoatInterface";

export default class BoatComponent extends React.Component<Boat, {}> {
    render() {
        return (
            <div className='boatInformation'>
                <img alt='boat' src={boat}/>
                <strong>{this.props.name}</strong>{' '}
                {this.props.sunk ? 'SUNK' : (this.props.touched ? 'TOUCHED' : 'UNTOUCHED') }
            </div>
        );
    }
}
