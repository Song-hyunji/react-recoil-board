import styled from 'styled-components';
import { useRecoilState } from "recoil";
import {idState, nextIdState, topicsState, modeState} from './atom/State';

const StyledCreate = styled.article`
  #titleInput {
    width: 90%;
    line-height: 40px;
    background-color: #f2f2f2;
    border: 3px solid transparent;
    border-radius: 4px;
  }
  
  #contentInput {
    width: 90%;
    line-height: 150px;
    border: 1.2px solid black;
    border-radius: 2px;s
  }
`;

function Create() {
  const [id, setId] = useRecoilState(idState);
  const [nextId, setNextId] = useRecoilState(nextIdState);
  const [topics, setTopics] = useRecoilState(topicsState);
  const [mode, setMode] = useRecoilState(modeState);

  return (
    <><StyledCreate>
      <article>
        <h2>Create</h2>
        <form onSubmit={event => {
          event.preventDefault();
          const _title = event.target.title.value;
          const _body = event.target.body.value;

          const newTopics = [...topics, { id: nextId, title: _title, body: _body, isComplete: false }];
          setTopics(newTopics);
          localStorage.setItem('data', JSON.stringify(newTopics)); //데이터 만든 후 storage에 반영

          setMode('READ');
          setId(nextId);
          setNextId(nextId + 1)
        }}>

          <p><input id="titleInput" type="text" name="title" placeholder="WRITE TITLE" /></p>
          <p><textarea id="contentInput" name="body" placeholder="WRITE CONTENT"></textarea></p>
          <p><input id="submitButton" type="submit" value="Create"></input></p>
        </form>
      </article>
    </StyledCreate></>
  )
}

export default Create;