import React from "react";
import './HomePage.css';
import Coord from "./model/CoordInterface";
import Boat from "./model/BoatInterface";
import {connect} from "react-redux";

const createGrid = () => {
    let html = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            html.push(<div key={'r'+i+'col'+j} className="case"></div>);
        }
    }
    return html;
};

const initBoatData = () => {
    return {
            name: '',
            coordonneesFront: {x: -1, y: -1},
            coordonneesBack: {x: -1, y: -1}
    }
}

export class HomePage extends React.Component<any, { grid?: any, coord: Coord, boat: Boat, boats: Boat[], bombs: Coord[] }>  {

    constructor(props: any) {
        super(props);
        this.state = {
            grid: createGrid(),
            coord: {
                x: -1,
                y: -1
            },
            boat: initBoatData(),
            boats: [],
            bombs: []
        };

        // Boat
        this.handleBoatNameChange = this.handleBoatNameChange.bind(this);
        this.handleBoatCoordonneesBackX = this.handleBoatCoordonneesBackX.bind(this);
        this.handleBoatCoordonneesBackY = this.handleBoatCoordonneesBackY.bind(this);
        this.handleBoatCoordonneesFrontX = this.handleBoatCoordonneesFrontX.bind(this);
        this.handleBoatCoordonneesFrontY = this.handleBoatCoordonneesFrontY.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        // Fire
        this.handleCoordXChange = this.handleCoordXChange.bind(this);
        this.handleCoordYChange = this.handleCoordYChange.bind(this);
        this.handleLaunchSubmit = this.handleLaunchSubmit.bind(this);
    }

    handleBoatNameChange(e: any) {
        this.setState({ boat: {
                ...this.state.boat,
                name: e.target.value
            } });
    }
    handleBoatCoordonneesFrontX(e: any) {
        this.setState({ boat: {
                name: this.state.boat.name,
                coordonneesFront: { x: e.target.value, y: this.state.boat.coordonneesFront.y },
                coordonneesBack: this.state.boat.coordonneesBack
            } });
    }
    handleBoatCoordonneesFrontY(e: any) {
        this.setState({ boat: {
                name: this.state.boat.name,
                coordonneesFront: { x: this.state.boat.coordonneesFront.x, y: e.target.value },
                coordonneesBack: this.state.boat.coordonneesBack
            } });
    }
    handleBoatCoordonneesBackX(e: any) {
        this.setState({ boat: {
                name: this.state.boat.name,
                coordonneesFront: this.state.boat.coordonneesFront,
                coordonneesBack: { x: e.target.value, y: this.state.boat.coordonneesBack.y }
            } });
    }
    handleBoatCoordonneesBackY(e: any) {
        this.setState({ boat: {
                name: this.state.boat.name,
                coordonneesFront: this.state.boat.coordonneesFront,
                coordonneesBack: { x: this.state.boat.coordonneesBack.x, y: e.target.value }
            } });
    }

    handleCoordXChange(e: any) {
        this.setState({ coord: { x: e.target.value, y: this.state.coord.y } });
    }

    handleCoordYChange(e: any) {
        this.setState({ coord: { x: this.state.coord.x, y: e.target.value } });
    }

    handleCreateSubmit() {
        alert(`Boat ${this.state.boat.name} from ${this.state.boat.coordonneesFront.x} - ${this.state.boat.coordonneesFront.y} to ${this.state.boat.coordonneesBack.x} - ${this.state.boat.coordonneesBack.y}`);
        this.state.boats.push(this.state.boat);
        this.addBoat(this.state.boat);
    }

    handleLaunchSubmit() {
        const touched = this.isBoatTouched(this.state.coord);
        this.addBomb(this.state.coord, touched);
    }

    isBoatTouched(coord: Coord) {
        for (let boat of this.state.boats) {
            if(boat.coordonneesBack.x === boat.coordonneesFront.x) {
                if (coord.x === boat.coordonneesBack.x) {
                    if ((boat.coordonneesBack.y > coord.y && coord.y > boat.coordonneesFront.y) ||
                        (boat.coordonneesFront.y > coord.y && coord.y > boat.coordonneesBack.y)) {
                        boat.touched = true;
                        return true;
                    }
                }
            } else if(boat.coordonneesBack.y === boat.coordonneesFront.y) {
                if (coord.y === boat.coordonneesBack.y) {
                    if ((boat.coordonneesBack.x > coord.x && coord.x > boat.coordonneesFront.x) ||
                        (boat.coordonneesFront.x > coord.x && coord.x > boat.coordonneesBack.x)) {
                        boat.touched = true;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    addBoat(boat: Boat) {
        let newGrid = this.state.grid;
        if(boat.coordonneesBack.x === boat.coordonneesFront.x) {
            let minY = -1;
            let maxY = -1;
            if (boat.coordonneesBack.y < boat.coordonneesFront.y) {
                minY = boat.coordonneesBack.y;
                maxY = boat.coordonneesFront.y;
            } else {
                minY = boat.coordonneesFront.y;
                maxY = boat.coordonneesBack.y;
            }
            for (let i = minY; i<= maxY; i++) {
                newGrid[Number(boat.coordonneesFront.x)*10 + Number(i)] = <div key={'r'+boat.coordonneesFront.x+'col'+i} className="boat"></div>;
            }
            this.setState({grid: newGrid});
        } else if(boat.coordonneesBack.y === boat.coordonneesFront.y) {
            let minX = -1;
            let maxX = -1;
            if (boat.coordonneesBack.x < boat.coordonneesFront.x) {
                minX = boat.coordonneesBack.x;
                maxX = boat.coordonneesFront.x;
            } else {
                minX = boat.coordonneesFront.x;
                maxX = boat.coordonneesBack.x;
            }
            for (let i = minX; i<= maxX; i++) {
                newGrid[Number(i)*10 + Number(boat.coordonneesFront.y)] = <div key={'r'+boat.coordonneesFront.x+'col'+i} className="boat"></div>;
            }
            this.setState({grid: newGrid});
        } else {
            // Todo cas d'erreur à gérer en controle de surface
        }
    }

    addBomb(coord: Coord, touched: boolean) {
        let newGrid = this.state.grid;
        let newBombs = this.state.bombs;
        newBombs.push(coord);
        newGrid[Number(coord.x)*10 + Number(coord.y)] = <div key={'r'+coord.x+'col'+coord.y} className={touched ? "touched" : "empty"}></div>;
        this.setState({grid: newGrid});
        this.setState({ bombs: newBombs });
    }

    render() {
        return (
            <div className='body'>
                <div className='upLane'>
                    <div className='leftColumn'>
                        <h2>Création de bateau</h2>
                        <label>Nom du bateau&nbsp;:&nbsp;
                            <input
                                type='text'
                                placeholder='ex: My Fav Boat'
                                aria-label='Boat Name'
                                onChange={this.handleBoatNameChange}
                            />
                        </label>
                        <h3>Avant du bateau&nbsp;:</h3>
                        <label>
                            Coordonnées X&nbsp;:&nbsp;
                            <input
                                type='number'
                                placeholder='Valeur entre 0 et 9'
                                aria-label='Coord X'
                                onChange={this.handleBoatCoordonneesFrontX}
                            />
                        </label>
                        <br/>
                        <label>
                            Coordonnées Y&nbsp;:&nbsp;
                            <input
                                type='number'
                                placeholder='Valeur entre 0 et 9'
                                aria-label='Coord Y'
                                onChange={this.handleBoatCoordonneesFrontY}
                            />
                        </label>
                        <h3>Arrière du bateau&nbsp;:</h3>
                        <label>
                            Coordonnées X&nbsp;:&nbsp;
                            <input
                                type='number'
                                placeholder='Valeur entre 0 et 9'
                                aria-label='Coord X'
                                onChange={this.handleBoatCoordonneesBackX}
                            />
                        </label>
                        <br/>
                        <label>
                            Coordonnées Y&nbsp;:&nbsp;
                            <input
                                type='number'
                                placeholder='Valeur entre 0 et 9'
                                aria-label='Coord Y'
                                onChange={this.handleBoatCoordonneesBackY}
                            />
                        </label>
                        <br/>
                        <button
                            className='create_button'
                            type='button'
                            id='button-addon1'
                            data-ripple-color='dark'
                            onClick={this.handleCreateSubmit}
                        >
                            Créer le bateau
                        </button>
                    </div>
                    <div className='rightColumn'>
                        <div className='board'>
                            {this.state.grid}
                        </div>
                    </div>
                </div>
                <div className='bottomLane'>
                    <h2>Zone de tir&nbsp;:</h2>
                    <div className='action'>
                        <label>
                            Coordonnées X&nbsp;:&nbsp;
                            <input
                                type='number'
                                placeholder='Valeur entre 0 et 9'
                                aria-label='Coord X'
                                onChange={this.handleCoordXChange}
                            />
                        </label>
                        <label>
                            Coordonnées Y&nbsp;:&nbsp;
                            <input
                                type='number'
                                placeholder='Valeur entre 0 et 9'
                                aria-label='Coord Y'
                                onChange={this.handleCoordYChange}
                            />
                        </label>
                        <button
                            className='fire_button'
                            type='button'
                            id='button-addon1'
                            data-ripple-color='dark'
                            onClick={this.handleLaunchSubmit}
                        >
                            FIRE !
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: any){
    return{
        boats: state.boats,
        bombs: state.bombs
    };
}

export default connect(mapStateToProps)(HomePage);
