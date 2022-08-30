import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { topicsState, idState, modeState, nextIdState, filteredTodoListState } from './atom/boardState';
import { useEffect } from "react";

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

  const filteredTopics = useRecoilValue(filteredTodoListState);
  const [topics, setTopics] = useRecoilState(topicsState);
  const [id, setId] = useRecoilState(idState);
  const [nextId, setNextId] = useRecoilState(nextIdState);
  const [mode, setMode] = useRecoilState(modeState);
  let data;

  useEffect(() => {
    //localStorage에서 값 읽어오기
    if (topics.length === 0 && localStorage.getItem('data') == null) {
        data = [{id:1, title:'Todo1', body:'Todo1 ...', isComplete: false}, 
        {id:2, title:'Todo2', body:'Todo2 ...', isComplete: false}, 
        {id:3, title:'Todo3', body:'Todo3 ...', isComplete: false}];
        localStorage.setItem('data', JSON.stringify(data));
      }else{
        data = JSON.parse(localStorage.getItem('data'));
      }

      setTopics(data);
      setNextId(5);
  }, [])
  
  const checkHandler = ({ target }) => {
    const idx = topics.findIndex(topic => topic.id === Number(target.id));
    let newTopics = [...topics];
    newTopics[idx] = {...newTopics[idx], isComplete: target.checked};
    
    setTopics(newTopics);
    localStorage.setItem('data', JSON.stringify(newTopics));
    console.log(topics);
    console.log("newTopics ", newTopics);
  }
  
  return <>
    <StyledNav>
      <nav>
        <table className="table">
          <thead></thead>
          <tbody>
            {
              filteredTopics.map((topic) => (
                  <tr key={topic.id} onClick={event => {
                    // event.preventDefault();
                    setMode('READ');
                    setId(Number(event.target.id))
                  }}>
                    <th id={topic.id}>{topic.id}</th>
                    <td id={topic.id}>{topic.title}</td>
                    <td> <input type="checkbox" id={topic.id} name="nav" value={topic.id} checked={topic.isComplete} onChange={(e)=> {checkHandler(e); }}/> </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </nav>
    </StyledNav>
  </>
}

export default Nav;