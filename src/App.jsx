import styled from "styled-components";
import Grid from "./Grid.jsx";

const Container = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: center;
`;


function App() {
  return (
    <Container>
      <Grid/>
    </Container>
  );
}

export default App;
