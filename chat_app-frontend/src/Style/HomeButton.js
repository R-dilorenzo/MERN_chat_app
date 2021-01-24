import styled from "styled-components";
import { Button } from "@material-ui/core";

const HomeButton = styled(Button)`
  && {
    background-color: ${(props) => (props.login ? "#284b6e" : "white")};
    color: ${(props) => (props.login ? "white" : "black")};
    border: ${(props) => (props.login ? "0px" : "1px solid black")};
    font-weight: bold;
    padding: 10px 20px;
    margin-top: 10px;
    width: 250px;

    &:hover {
      background-color: dodgerblue;
      color: white;
    }
  }
`;

export default HomeButton;
