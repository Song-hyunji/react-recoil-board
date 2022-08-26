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