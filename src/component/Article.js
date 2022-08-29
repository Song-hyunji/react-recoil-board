import styled from "styled-components";
import { useEffect } from 'react';
import { useRecoilState } from "recoil";
import { modeState, titleState, bodyState, idState, topicsState } from './atom/boardState';

const StyledArticle = styled.article`
article{
  width: 90%;
  margin:auto;
}
#articleTitle {
  padding: 8px;
  background-color: #f2f2f2;
  border: 3px solid transparent;
  border-radius: 4px;
}

#contentTitle {
  height: 150px;
  border: 1.2px solid black;
  border-radius: 2px;
  font-size:18px;
}
`;

function Article() {
  const [mode, setMode] =useRecoilState(modeState);
  const [id, setId] = useRecoilState(idState);
  const [title, setTitle] = useRecoilState(titleState);
  const [body, setBody] = useRecoilState(bodyState);
  const [topics, setTopics] =useRecoilState(topicsState);

  useEffect(() => {
    //현재 선택된 id에 맞는 topic으로 보여주기
    if (id != null && mode != 'UPDATE') {
      topics.forEach(topic => {
        if (topic.id === id) {
          setTitle(topic.title);
          setBody(topic.body);
        }
      });
    }
  }, [id]);


  return (
    <><StyledArticle>
      <article>
        <h2 id="articleTitle">{title}</h2>
        <p id="contentTitle">{body}</p>
      
        <button href={'/update/' + id} onClick={event => {
          event.preventDefault();
          setMode('UPDATE');
          
        }}>Update</button>

        {/* DELETE 버튼. 삭제 누른 것 제외하고 배열에 담아서 배열state 갱신 */}
        <button value="Delete" onClick={() => {
          const newTopics = topics.filter(topic => topic.id !== id)
          setTopics(newTopics);
          setMode('WELCOME');
          localStorage.setItem('data', JSON.stringify(newTopics));
        }} >Delete</button>

      </article>
    </StyledArticle>
    </>
  )
}
export default Article;