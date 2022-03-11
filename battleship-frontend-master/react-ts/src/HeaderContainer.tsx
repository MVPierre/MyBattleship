import Header from './Header';
import {connect} from 'react-redux';

const mapStateToProps=(state: any) => ({ data: state.boats});
export default connect(mapStateToProps)(Header)
