import styled from 'styled-components';
import { useRecoilState } from "recoil";
import {idState, titleState, bodyState, topicsState, modeState} from './atom/State';

const StyledUpdate = styled.article`
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
    border-radius: 2px;
  }
`;

function Update(){
    const [id, setId] = useRecoilState(idState);
    const [title, setTitle] = useRecoilState(titleState);
    const [body, setBody] = useRecoilState(bodyState);
    const [topics, setTopics] = useRecoilState(topicsState);
    const [mode, setMode] = useRecoilState(modeState);

    return (
    <><StyledUpdate>
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const _title = event.target.title.value;
        const _body = event.target.body.value;

        const idx = topics.findIndex(topic => topic.id === id);
        const newTopics = [...topics.slice(0, idx), { id: id, title: _title, body: _body, isComplete: topics[idx].isComplete}, ...topics.slice(idx + 1)];

        setTopics(newTopics); 
        setMode('READ');
        localStorage.setItem('data', JSON.stringify(newTopics)); //storage에 수정사항 반영
      }}>

        <p><input id="titleInput" type="text" name="title" placeholder="title" value={title} onChange={event=>{
          setTitle(event.target.value);
        }}/></p>
        <p><textarea id="contentInput" name="body" placeholder="body" value={body} onChange={event=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input id="submitButton" type="submit" value="Update"></input></p>
      </form>
    </article>
    </StyledUpdate></>
    )
  }

export default Update;