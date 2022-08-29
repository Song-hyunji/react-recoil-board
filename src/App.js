import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Nav from './component/Nav';
import Header from './component/Header';
import { useRecoilState, useRecoilValue } from "recoil";
import { modeState, idState, nextIdState, topicsState, titleState, bodyState, todoListFilterState,
           contentState, todoListStatsState} from './component/atom/boardState';

function App() {
  const [mode, setMode] = useRecoilState(modeState);
  const [id, setId] = useRecoilState(idState);
  const [nextId, setNextId] = useRecoilState(nextIdState);
  const [topics, setTopics] = useRecoilState(topicsState);

  const [title, setTitle] = useRecoilState(titleState);
  const [body, setBody] = useRecoilState(bodyState);
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const content = useRecoilValue(contentState);
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useRecoilValue(todoListStatsState);
  let formattedPercentCompleted = Math.round(percentCompleted * 100);

  useEffect(() => {
    //localStorage에서 값 읽어오기
    if (topics.length === 0) {
      const data = JSON.parse(localStorage.getItem('data'));
      if(data == null){
        data = [{id:1, title:'html', body:'html is ...', isComplete: false}, 
        {id:2, title:'css', body:'css is ...', isComplete: false}, 
        {id:3, title:'javascript', body:'javascript is ...', isComplete: false}];
      }

      setTopics(data);
      setNextId(5);
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

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const TodoListStats = () => {
    const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
      useRecoilValue(todoListStatsState);
    let formattedPercentCompleted = Math.round(percentCompleted * 100);
  }

  return (
    <>
      <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'space-between'}}>
      <Header />
      <>
        

        <button href="/create" style={{margin: '17px 0px'}} onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</button>
      </>
      </div>
      <div>
        <select value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
        총 {totalNum}개 중, {totalCompletedNum}개 완료 | {totalUncompletedNum}개 미완료 (완료율 {formattedPercentCompleted}%)
      </div>
      <Nav />
      {content}

    </>
  );
}

export default App;