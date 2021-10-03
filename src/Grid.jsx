import styled from "styled-components";
import useMatrix from "./useMatrix.js";
import useAnimation from "./useAnimation.js";

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(50, 1fr);

  border-top: 1px solid #888;
  border-left: 1px solid #888;

  overflow: hidden;
  cursor: pointer;
  user-select: none;
`;

const Cell = styled.div`
  height: 17px;
  width: 30px;

  border-bottom: 1px solid #888;
  border-right: 1px solid #888;

  text-align: center;
  font-size: 0.8em;
  font-family: sans-serif;
  
  transition: ${p => p.shouldTransition};
  background: ${p => p.color};
`;

function Grid() {
  const {
    resetAnimation,
    shouldTransition,
    colorReset,
  } = useAnimation();

  const {
    matrix,
    lastClick,
    incrementColAndRow,
    lastFound
  } = useMatrix({ onUpdate: resetAnimation });

  return (
    <Container lastClick={lastClick}>
      {matrix
        .map((arr, i) => arr
          .map((value, j) => {
            let color = "transparent";

            if (!colorReset) {
              if (lastClick[0] === i || lastClick[1] === j) color = "#ffff9e";
              if (lastFound.find(([a, b]) => a === i && b === j)) color = "#6df57f";
            }

            return (
              <Cell
                shouldTransition={shouldTransition ? "background 1s" : ""}
                color={color}
                style={{}}
                key={`${i}:${j}`}
                data-column={j}
                data-row={i}
                onClick={incrementColAndRow}>
                {value || ""}
              </Cell>);
          }))
      }
    </Container>
  );
}

export default Grid;
