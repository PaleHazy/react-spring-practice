import React from "react";
import "./App.css";
import { useSpring, animated, interpolate } from "react-spring";
import styled from "styled-components";
import { useDrag } from "react-use-gesture";
import SlideToggle from "./SlideToggle";
export default function App() {
  return (
    <div className="App">
      <SlideToggle />
    </div>
  );
}
