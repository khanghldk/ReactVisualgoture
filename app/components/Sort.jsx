import React from 'react';
import { connect } from 'react-redux';

import { Col, Row } from 'react-bootstrap';

// var Sorting = require('../drawers/Sorting');

import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@material-ui/icons';

import BarChart from './BarChart';

import { Button } from 'react-bootstrap';

import {apiConstants} from '../constants'

class Sort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statelist: [],
            currentStep: 0,
            totalSteps: 0,
            isPlaying: false
        }
    }

    componentWillMount = () => {
        var {type} = this.props;
        var data = [49, 10, 25, 49, 35, 11, 19, 13, 15, 23];
        var source = {
            type: type,
            data: data
        };
        var statelist = this.getStateList(source);
        this.setState({ statelist: statelist, totalSteps: statelist.length });
    }

    getStateList(source) {
        var statelist = []
        $.ajax({
            url: apiConstants.URL + "sort",
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

    }

    handleCreate = () => {
        this.stopPlaying();
        var {type} = this.props;
        var data = [];

        const length = Math.floor(Math.random() * (20)) + 1;
        for (var i = 0; i < length; i++) {
            data[i] = Math.floor(Math.random() * 30) + 1;
        }

        var source = {
            type: type,
            data: data
        };
        var statelist = this.getStateList(source);
        this.setState({
            statelist: statelist,
            totalSteps: statelist.length,
            currentStep: 0,
            isPlaying: false
        });
    }

    handleNext = () => {
        var { currentStep, totalSteps, isPlaying } = this.state;
        if (isPlaying) {
            this.stopPlaying();
            this.setState({
                isPlaying: false
            })
        }
        if (currentStep + 1 < totalSteps) {
            currentStep++;
            this.setState({
                currentStep: currentStep
            })
        } else {
            this.stopPlaying();
            this.setState({
                isPlaying: false
            })
        }
    }

    handlePrevious = () => {
        var { currentStep, isPlaying } = this.state;
        if (isPlaying) {
            this.stopPlaying();
            this.setState({
                isPlaying: false
            })
        }
        if (currentStep > 0) {
            currentStep--;
            this.setState({
                currentStep: currentStep
            })
        } else {
            this.stopPlaying();
            this.setState({
                isPlaying: false
            })
        }
    }

    handlePlay = () => {
        this.setState({
            isPlaying: true
        });
        this.startPlaying();
    }

    handlePause = () => {
        this.setState({
            isPlaying: false
        });
        this.stopPlaying();
    }

    startPlaying = () => {
        var { currentStep, totalSteps, isPlaying } = this.state;
        this.timer = setInterval(() => {
            if (currentStep + 1 === totalSteps) {
                currentStep = -1;
            }
            if (currentStep + 1 < totalSteps) {
                currentStep++;
                this.setState({
                    currentStep: currentStep
                })
            } else {
                this.stopPlaying();
                this.setState({
                    isPlaying: false
                })
            }
        }, 1000);
    }

    stopPlaying = () => {
        clearInterval(this.timer)
        this.timer = undefined;
    }


    render() {
        var { statelist, currentStep, isPlaying } = this.state;

        var statusStyle = {
            'height': 100
        }

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <div className="gridGraph">
                            <BarChart entry={statelist[currentStep].entries} size={[700, 400]} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Row className="text-center">
                            <SkipPrevious onClick={this.handlePrevious} />
                            {isPlaying ?
                                <Pause onClick={this.handlePause} /> :
                                <PlayArrow onClick={this.handlePlay} />
                            }
                            <SkipNext onClick={this.handleNext} />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div id="control">
                            <Button onClick={this.handleCreate}>Create Random</Button>
                            <Button>Sort</Button>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div id="log">
                            {statelist[currentStep].log}
                        </div>
                    </Col>
                    <Col md={4}>
                    <Row id="status" style={statusStyle}>
                            <div dangerouslySetInnerHTML={{ __html: statelist[currentStep].status }}>

                            </div>
                        </Row>
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
}))(Sort));