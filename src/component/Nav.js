import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { topicsState, idState, modeState } from './atom/boardState';

const StyledNav = styled.nav`
table {
  width: 100%;
  border-top: 1px solid #444444;
  border-collapse: collapse;
}
th, td {
  border-bottom: 1px solid #444444;
  padding: 10px;
  cursor: pointer;
}
tr:hover {
  background-color: #d8d8d8;
}
`;
//목차 보여주기
function Nav() {

  const topics = useRecoilValue(topicsState);
  const [id, setId] = useRecoilState(idState);
  const [mode, setMode] = useRecoilState(modeState);

  const lis = []
  topics.forEach(topic => {
    lis.push(
      <tr key={topic.id} onClick={event => {
        event.preventDefault();
        setMode('READ');
        setId(Number(event.target.id))
      }}>
        <th id={topic.id}>{topic.id}</th>
        <td id={topic.id}>{topic.title}</td>
      </tr>
    )
  });

  return <>
    <StyledNav>
      <nav>
        <table className="table">
          <thead></thead>
          <tbody>{lis}</tbody>
        </table>
      </nav>
    </StyledNav>
  </>
}

export default Nav;