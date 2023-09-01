import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { numberList } from '../Counter/actions';
export interface Props {
    children?: React.ReactNode;
    counterActions:Function
}
export interface State {}

const mapStateToProps = (state: any) => {
    return {
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
      {
        // numberList
      },
      dispatch
    );
};
class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        // this.props.numberList({});
    }
    render() {
      return (
        <p>3333</p>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)

// const Home =  (Props:Props) => {
//     return (
//         <p>1111111111</p>
//     )
// }
// export default Home