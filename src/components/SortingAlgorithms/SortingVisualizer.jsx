import React from "react";
import { getMergeSortAnimations } from "./sortingAlgorithms";
import "./SortingVisualizer.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { Button } from "@material-ui/core";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      NUMBER_OF_ARRAY_BARS: 60, // Change this value for the number of bars (value) in the array.
      ANIMATION_SPEED_MS: 15, // Change this value for the speed of the animations.
      disableButtons: false,
    };
  }

  componentDidMount() {
    this.resetArray();
    
  }
  componentWillUnmount() {
    console.log("called")
  }

  resetArray() {
   
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 400));
    }
    this.setState({ array });
  }

  flipDisableButtons(value) { //NOT WORKING
    this.setState( {disableButtons: value })
  }

  mergeSort() {
    //this.flipDisableButtons(true);
    const animations = getMergeSortAnimations(this.state.array);
    
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.ANIMATION_SPEED_MS);
      }
    }
    //this.flipDisableButtons(false);
    
  }
  

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  changeSize = (newValue) => {
    this.setState({ NUMBER_OF_ARRAY_BARS: newValue });
    this.resetArray();
  };

  changeSpeed = (newValue) => {
    this.setState({ ANIMATION_SPEED_MS: newValue });
    //this.resetArray();
  };

  render() {
    const { array } = this.state;
    return (
      <div className="wrapper">
        <div className="row">
            <div style={{ marginLeft: "auto" }}>
            <InputSliderSize changeSize={this.changeSize}></InputSliderSize>
          </div>
          <div style={{ marginRight: "auto" }}>
            <InputSliderSpeed changeSpeed={this.changeSpeed}></InputSliderSpeed>
          </div>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
          <div className="button-wrapper row">
            <div 
              className="button">
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.disableButtons}
              onClick={() => this.resetArray()}
            >
              <span style={{ color: "white" }}>Generate New Array</span>
            </Button></div>
            <div 
              className="button">
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.disableButtons}
              onClick={() => this.mergeSort()}
            >
              <span style={{ color: "white" }}>Merge Sort</span>
            </Button></div>
            <div 
              className="button">
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.disableButtons}
              onClick={() => this.quickSort()}
            >
              <span style={{ color: "white" }}>Quick Sort</span>
            </Button></div>
            <div 
              className="button">
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.disableButtons}
              onClick={() => this.heapSort()}
            >
              <span style={{ color: "white" }}>Heap Sort</span>
            </Button></div>
            <div 
              className="button">
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.disableButtons}
              onClick={() => this.bubbleSort()}
            >
              <span style={{ color: "white" }}>Bubble Sort</span>
            </Button></div>
            
            
            {/* <Button
              variant="contained"
              color="primary"
              disabled={this.state.disableButtons}
              onClick={() => this.testSortingAlgorithms()}
            >
              <span style={{ color: "white" }}>
                {" "}
                Test Sorting Algorithms (BROKEN)
              </span>
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

function InputSliderSize(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(60);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.changeSize(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    props.changeSize(event.target.value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 70) {
      setValue(70);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        <span style={{ color: "white", paddingLeft: "15px" }}>Amount of bars</span>
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item></Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={69}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            style={{ color: "white" }}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 69,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

function InputSliderSpeed(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(15);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.changeSpeed(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    props.changeSpeed(event.target.value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 50) {
      setValue(50);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        <span style={{ color: "white", paddingLeft: "15px" }}>Animation speed</span>
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item></Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={50}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            style={{ color: "white" }}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 50,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
