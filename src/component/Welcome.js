import styled from "styled-components";

const StyledArticle = styled.article`
article{
  width: 90%;
  margin:auto;
}
#articleTitle {
  line-height: 40px;
  background-color: #f2f2f2;
  border: 3px solid transparent;
  border-radius: 4px;
}

#contentTitle {
  line-height: 150px;
  border: 1.2px solid black;
  border-radius: 2px;
  font-size:18px;
}
`;

function Welcome() {
  return (
    <><StyledArticle>
      <article>
        <h2 id="articleTitle">Welcome</h2>
        <p id="contentTitle">hello, WEB</p>
      </article>
    </StyledArticle>
    </>
  )
}
export default Welcome;