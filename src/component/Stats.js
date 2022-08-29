import logo from './logo.svg';
import './App.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { modeState, idState, nextIdState, topicsState, titleState, bodyState, todoListFilterState,
           contentState, todoListStatsState} from './component/atom/boardState';

function Stats() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const content = useRecoilValue(contentState);
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useRecoilValue(todoListStatsState);
  let formattedPercentCompleted = Math.round(percentCompleted * 100);

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
        <select value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
        총 {totalNum}개 중, {totalCompletedNum}개 완료 | {totalUncompletedNum}개 미완료 (완료율 {formattedPercentCompleted}%)
    </>
  );
}

export default App;