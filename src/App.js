import './App.css';
import Header from './component/Header';
import Stats from './component/Stats';
import List from './component/List';
import { useRecoilValue } from "recoil";
import { contentState } from './component/atom/State';

function App() {
  const content = useRecoilValue(contentState);

  return (
    <>
      <Header />
      <Stats/>
      <List />
      {content}
    </>
  );
}

export default App;