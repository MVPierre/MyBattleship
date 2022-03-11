import React from "react";
import './App.css';
import BoatComponent from "./component/BoatComponent";
import Boat from "./model/BoatInterface";

export class AnalysePage extends React.Component<any, {boats: Boat[]}>  {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className='body'>
                <div className='row'>
                    <div className='column'>
                        <BoatComponent name="test" coordonneesBack={{x:1, y:1}} coordonneesFront={{x:1, y:2}}/>
                    </div>
                </div>
            </div>
        );
    }
}
