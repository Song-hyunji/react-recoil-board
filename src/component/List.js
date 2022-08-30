import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { topicsState, idState, modeState, nextIdState, filteredTodoListState } from './atom/State';
import { useEffect } from "react";

const StyledList = styled.nav`
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
function List() {

  const filteredTopics = useRecoilValue(filteredTodoListState);
  const [topics, setTopics] = useRecoilState(topicsState);
  const [id, setId] = useRecoilState(idState);
  const [nextId, setNextId] = useRecoilState(nextIdState);
  const [mode, setMode] = useRecoilState(modeState);
  let data;

  useEffect(() => {
    //첫 렌더링 시, localStorage에서 값 읽어오기
    if (topics.length === 0 && localStorage.getItem('data') == null) {
        data = [{id:1, title:'Todo1', body:'Todo1 ...', isComplete: false}, 
        {id:2, title:'Todo2', body:'Todo2 ...', isComplete: false}, 
        {id:3, title:'Todo3', body:'Todo3 ...', isComplete: false}];
        localStorage.setItem('data', JSON.stringify(data));
      }else{
        data = JSON.parse(localStorage.getItem('data'));
      }

      setTopics(data);
      setNextId(data.length);
  }, [])
  
  //체크박스 선택 시 상태 변경해주기
  const checkHandler = ({ target }) => {
    const idx = topics.findIndex(topic => topic.id === Number(target.id));
    let newTopics = [...topics];
    newTopics[idx] = {...newTopics[idx], isComplete: target.checked};
    
    setTopics(newTopics);
    localStorage.setItem('data', JSON.stringify(newTopics));
  }
  
  return <>
    <StyledList>
      <nav>
        <table className="table">
          <thead></thead>
          <tbody>
            {
              filteredTopics.map((topic) => (
                  <tr key={topic.id} onClick={event => {
                    setMode('READ');
                    setId(Number(event.target.id))
                  }}>
                    <th id={topic.id}>{topic.id}</th>
                    <td id={topic.id}>{topic.title}</td>
                    <td> <input type="checkbox" id={topic.id} name="list" value={topic.id} checked={topic.isComplete} onChange={(e)=> {checkHandler(e); }}/> </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </nav>
    </StyledList>
  </>
}

export default List;