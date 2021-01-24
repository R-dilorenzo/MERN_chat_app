import styled from "styled-components";
import { Button } from "@material-ui/core";

const NavButton = styled(Button)`
  && {
    background-color: #284b6e;
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    margin: 5px 2vw;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #284b6e;
      color: white;
    }
  }
`;

export default NavButton;
