import styled from 'styled-components';
import { useSetRecoilState } from "recoil";
import { modeState } from './atom/State';

const StyledHeader = styled.header`
  a { 
    text-decoration: none;
    color : black;
  }
  header {
    display: flex;
    width:100%;
    justify-content: space-between;
    
  }
  #createButton {
    margin: 20px 0px 0px;
    height: 50px;
    line-height: 0px;
    border-radius: 60%;
    background-color: rgb(136, 136, 136);
    color: white;
    font-size: 30px;
  }
`;

const Header = () => {
  const setMode = useSetRecoilState(modeState);

  return <>
    <StyledHeader>
      <header>
        <h1>
          <a href="/" onClick={(event) => {
            event.preventDefault();
            setMode('WELCOME');}}>
              {"TO DO LIST"}
          </a>
        </h1>
        <button id="createButton" href="/create" onClick={event => {
          event.preventDefault();
          setMode('CREATE');}}>
            +
        </button>
      </header>
    </StyledHeader>
  </>
}
export default Header;