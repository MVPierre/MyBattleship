import Coord from "./CoordInterface";

export default interface Boat {
    name: string;
    coordonneesFront: Coord;
    coordonneesBack: Coord;
    touched?: boolean;
    sunk?: boolean;
}
