import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListFilterState, contentState, todoListStatsState} from './atom/boardState';

const StyledStats = styled.div`
div{
  display: inline-flex;
  align-items: center;
  height: 60px;
}

select{
  margin-left: 10px;
}

`;

const Stats = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useRecoilValue(todoListStatsState);
  let formattedPercentCompleted = Math.round(percentCompleted * 100);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
    <StyledStats>
      <div>
        <div>
          (완료율 {formattedPercentCompleted}%) {totalCompletedNum}개 완료 + {totalUncompletedNum}개 미완료 / 총 {totalNum}개
        </div>
        <select value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
      </div>
    </StyledStats>
    </>
  )
}

export default Stats;