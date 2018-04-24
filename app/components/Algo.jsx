import React from 'react';
import { connect } from 'react-redux';

import { Col, Row } from 'react-bootstrap';

// import { AvPlayArrow, AvPause, AvSkipPrevious, AvSkipNext } from 'material-ui/svg-icons';

// import {SvgIcon} from 'material-ui/SvgIcon';

// global.__MUI_SvgIcon__ = SvgIcon;

var Sorting = require('../drawers/Sorting');

import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@material-ui/icons';

import BarChart from './BarChart';

import { Button } from 'react-bootstrap';

class Algo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataX: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataY: [5, 10, 15, 20, 25, 30, 35, 40, 45],
            statelist: []
        }
    }

    componentWillMount = () => {
        var type = "bubbleSort";
        var data = [1, 10, 25, 49, 35, 11, 19];
        var source = {
            type: type,
            data: data
        };
        var statelist = this.getStateList(source);
        this.setState({ statelist: statelist});
    }

    getStateList(source) {
        var statelist = []
        $.ajax({
            url: "http://localhost:6969/sort",
            type: "POST",
            async: false,
            data: JSON.stringify(source),
            cache: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                statelist = data;
            },
            error: function (error) {
                console.log("error" + error.responseText);
            }
        });
        return statelist;
    }

    handleClick = () => {


        var dataX = this.state.dataX;
        var dataY = this.state.dataY;

        var temp = dataX[7];
        dataX[7] = dataX[8];
        dataX[8] = temp;

        this.setState({
            dataX: dataX,
            dataY: dataY
        })

        console.log(dataX);
        console.log(dataY);

    }

    handleCreate = () => {
        let count = Math.floor(Math.random() * (10) + 10);

        let dataX = [], dataY = [];
        for (let i = 0; i < count; i++) {
            dataY[i] = Math.floor(Math.random() * (50) + 1);
            dataX[i] = i + 1;
        }

        this.setState({
            dataY: dataY,
            dataX: dataX
        })

    }

    render() {
        var { dataX, dataY, statelist } = this.state;
        console.log(statelist);
        return (
            <div>
                <Row className="container">
                    <Col md={12}>
                        <div className="gridGraph">
                            <BarChart dataX={dataX} dataY={dataY} size={[1000, 500]} />
                        </div>
                        <Button id="change" onClick={this.handleClick}>Change data</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <PlayArrow />
                        <Pause />
                        <SkipNext />
                        <SkipPrevious />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div id="control">
                            <Button onClick={this.handleCreate}>Create</Button>
                            <Button>Sort</Button>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div id="log">
                            Log
                        </div>
                    </Col>
                    <Col md={4}>
                        <Row id="status">Status</Row>
                        <Row id="codetrace">Code trace</Row>
                    </Col>
                </Row>

            </div>
        )
    }
}



export default (connect(state => ({
    app: state.app,
    googleAuth: state.googleAuth,
}))(Algo));