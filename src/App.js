import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Nav from './component/Nav';
import Header from './component/Header';
import { useRecoilState, useRecoilValue } from "recoil";
import { modeState, idState, nextIdState, topicsState, titleState, bodyState,
           contentState} from './component/atom/boardState';

function App() {
  const [mode, setMode] = useRecoilState(modeState);
  const [id, setId] = useRecoilState(idState);
  const [nextId, setNextId] = useRecoilState(nextIdState);
  const [topics, setTopics] = useRecoilState(topicsState);

  const [title, setTitle] = useRecoilState(titleState);
  const [body, setBody] = useRecoilState(bodyState);

  const content = useRecoilValue(contentState);

  useEffect(() => {
    //localStorage에서 값 읽어오기
    if (topics.length === 0) {
      const data = JSON.parse(localStorage.getItem('data'));
      setTopics(data);
      setNextId(data.length + 1);
    }
  })

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
    <>
      <Header />
      <Nav />
      {content}
      <div>
        <button href="/create" onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</button>
      </div>

    </>
  );
}

export default App;