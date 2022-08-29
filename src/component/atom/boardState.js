import { atom, selector } from "recoil";
import Article from "../Article";
import Create from "../Create";
import Update from "../Update";
import Welcome from "../Welcome";

export const modeState = atom({
    key: "mode",
    default: "WELCOME",
});

export const idState = atom({
    key: "id",
    default: null,
});

export const nextIdState = atom({
    key: "nextId",
    default: 0,
});

export const topicsState = atom({
    key: "topics",
    default: [],
});

export const titleState = atom({
    key: "title",
    default: null,
});

export const bodyState = atom({
    key: "body",
    default: null,
});

//완료 & 미완료 보여주기위한 필터 state 설정
export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
}); 

//모드에 따라 content를 다르게 반환
export const contentState = selector({
  key: "contentState",
  get: ({ get }) => {
    const mode = get(modeState);
    switch(mode) {
      case "WELCOME": 
        return <><Welcome/></>
      case "READ":
        return <><Article/></>
      case "CREATE":
        return <><Create/></>
      case "UPDATE":
        return <><Update/></>
    }
  }
})

// 필터 된 todoList를 반환해주는 selector
export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(topicsState);
    switch (filter) {
      case "Show Completed": //완료된 항목만 리턴
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted": //미완료된 항목만 리턴
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
}); 

//전체할일, 완료된 일, 미완료된 일, 완료 퍼센트 
export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(topicsState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
}); 