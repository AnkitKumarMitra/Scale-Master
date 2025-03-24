import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const noteOrder = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const majorPattern = [2, 2, 1, 2, 2, 2, 1];
const minorPattern = [2, 1, 2, 2, 1, 2, 2];

const chordPattern = [2, 2];

const getChord = (scale) => {
  let chords = [];

  for (let i = 0; i < scale.length; i++) {
    let chord = [scale[i]];
    let index = i;

    for (let step of chordPattern) {
      index = (index + step) % scale.length;
      chord.push(scale[index]);
    }

    chords.push(chord);
  }
  return chords;
};

const getScale = (root, scaleType) => {
  let index = noteOrder.indexOf(root);
  let scale = [root];
  const pattern = scaleType === "m" ? minorPattern : majorPattern;

  for (let step of pattern) {
    index = (index + step) % noteOrder.length;
    scale.push(noteOrder[index]);
  }
  return scale;
};

const ScaleViewer = () => {
  const [root, setRoot] = useState("C");
  const [scaleType, setScaleType] = useState("M");
  const [scale, setScale] = useState([]);
  const [chords, setChords] = useState([]);
  const [showScale, setShowScale] = useState(false);

  const handleGenerateScale = () => {
    setShowScale(false); // Temporarily hide previous scale to force re-render

    setTimeout(() => {
      const newScale = getScale(root, scaleType);
      const newChords = getChord(newScale.slice(0, -1));

      setScale(newScale); // Completely replace scale
      setChords(newChords); // Completely replace chords
      setShowScale(true); // Show the updated scale
    }, 0); // Delay ensures state updates properly
  };

  const highlightChordIndices = scaleType === "M" ? [0, 3, 4, 5] : [0, 4, 5, 6];
  const dimChordIndex = scaleType === "M" ? 6 : 1;

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Scale & Chord Explorer</h1>

      <h5>Select Key:</h5>
      <Row className="justify-content-center my-3">
        {noteOrder.map((key) => (
          <Button
            key={key}
            className="m-1"
            variant={key === root ? "primary" : "outline-primary"}
            onClick={() => setRoot(key)}
            style={{ height: "60px", width: "58px", textAlign: "center" }}
          >
            {key}
          </Button>
        ))}
      </Row>

      <Row className="justify-content-center my-3">
  <ToggleButtonGroup
    type="radio"
    name="scaleType"
    value={scaleType}
    onChange={setScaleType}
    className="d-flex gap-2"
  >
    <ToggleButton
      id="major"
      variant="primary"
      value="M"
      style={{ width: "58px", minWidth: "58px", textAlign: "center", padding: "5px" }}
    >
      Major
    </ToggleButton>
    <ToggleButton
      id="minor"
      variant="secondary"
      value="m"
      style={{ width: "58px", minWidth: "58px", textAlign: "center", padding: "5px" }}
    >
      Minor
    </ToggleButton>
  </ToggleButtonGroup>
</Row>




      <Button className="mb-3" variant="primary" onClick={handleGenerateScale}>
        Get Scale
      </Button>

      {showScale && (
        <>
          <h3 className="mt-4">
            Generated Scale: {root}
            {scaleType === "m" ? "m" : ""}
          </h3>
          <Row className="justify-content-center">
            {scale.map((note) => (
              <Card
                key={note}
                className="m-2 p-3 bg-primary text-white"
                style={{ width: "60px", textAlign: "center" }}
              >
                {note}
              </Card>
            ))}
          </Row>

          <h3 className="mt-4">Generated Chords:</h3>
          <Row className="justify-content-center">
            {chords.map((chord, index) => (
              <Col
                xs={6}
                md={6}
                key={index}
                className="mb-2 d-flex align-items-center justify-content-center"
              >
                <h5 className="me-2 text-end" style={{ minWidth: "120px" }}>
                  Chord for {chord[0]}
                  {index === dimChordIndex ? " (DIM)" : ""}:
                </h5>
                <div className="d-flex">
                  {chord.map((note, idx) => (
                    <Card
                      key={idx}
                      className={`m-1 p-2 text-white d-flex align-items-center justify-content-center ${
                        highlightChordIndices.includes(index)
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                      style={{
                        height: "58px",
                        width: "60px",
                        textAlign: "center",
                      }}
                    >
                      {note}
                    </Card>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ScaleViewer;
