import './App.css';
import { useEffect } from 'react';
import Nav from './component/Nav';
import Header from './component/Header';
import Stats from './component/Stats';
import { useRecoilValue } from "recoil";
import { contentState } from './component/atom/boardState';

function App() {
  const content = useRecoilValue(contentState);

  return (
    <>
      <Header />
      <Stats/>
      <Nav />
      {content}
    </>
  );
}

export default App;