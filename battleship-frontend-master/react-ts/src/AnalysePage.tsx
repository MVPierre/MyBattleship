import React from "react";
import './App.css';
import BoatComponent from "./component/BoatComponent";
import Boat from "./model/BoatInterface";
import store from "./store";

export class AnalysePage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            boats: store.getState().boats,
            bombs: store.getState().bombs,
            boatsToRender: this.renderBoats()
        }
    }
    renderBoats() {
        return this.state.boats.forEach((boat: Boat) => {
            return (
                <BoatComponent name={boat.name} coordonneesBack={{x:boat.coordonneesBack.x, y:boat.coordonneesBack.y}} coordonneesFront={{x:boat.coordonneesFront.x, y:boat.coordonneesFront.y}}/>
            );
        })
    }
    render() {
        return (
            <div className='body'>
                <div className='row'>
                    <div className='column'>
                        {this.state.boatsToRender}
                    </div>
                </div>
            </div>
        );
    }
}
