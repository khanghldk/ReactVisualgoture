import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

class VerticalLinearStepper extends React.Component {

    componentWillMount = () => {
        var { activeStep } = this.props;
        this.setState({
            activeStep: activeStep
        });
    }

    componentWillReceiveProps = (newProps) => {
        var { activeStep } = this.props;        
        this.setState({
            activeStep: activeStep
        });
    }

    getSteps = () => {
        const {contents} = this.props;
        var result = [];
    
        for (var item in contents) {
            result.push(contents[item].name);
        }
    
        return result;
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        var { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
