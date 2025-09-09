<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</p>
<br>
<p align="center">
   <h1><strong>React-board 프로젝트</strong>📋🗂️📌📝</h1>
    <span>해당 서비스는 glitch의 호스팅이 종료되어 vercel로 옮기는 작업 진행중(2025-09-09)</span><br><br><br>
    <ul>
      <li><span>목표: 중앙상태관리의 완벽한 필요성을 느끼게해준 게시판</span></li>
      <li><span>기술스택: react, scss, axios, firebaseHosting, json-server를 Glitch에서 호스팅하여 API 엔드포인트 변경</li>
      <li><span>배포링크: https://react-board-new.web.app/lists?_page=1#</span></li>
      <li>
        <span>주요기능</span>
        <ol>
          <li>CRUD를 통한 게시글 작성과 운영</li>
          <li>날것 그대로의 상태관리</li>
          <li>페이지네이션</li>        
          <li>re-rendering이 쓸데없이 일어나지 않도록</li>
        </ol>
      </li>
    </ul>

  <h2>ISSUE</h2>
  <ul>
    <li>
      <span>2025-09-09(화)</span>
      <ol>
        <li>
          <span>json-server로  glitch에 올리니까, 페이징처리가 안됨</span>
          <p>원인:  json-sever의 버전이슈로, json-server를 npm install하면 ‘1.0.0-beta.3’ 이라는 버전이 최신버전으로 나오는데, 이게  glitch에서는 beta버전은 페이징처리가 상용화가 되어 있질않아서 릴리즈 된 0.17.4로 다운그레이드를 진행함</p>
          <p>해결방법:  json-server에서 제공하는 _page, _perpage와 같은 키들에 대한 내용들(first, last, next, prev와 같은 내용들)이 있는 위치가 json-server에서는 data라는 곳에 존재했는데,
            glitch에서는 response.data속성에 값이 없고 headers에 들어가있음을 확인함. <br> 따라서 통신한 결과를 get할때 response.data를 하지 않고 headers의 정보를 갖고와서 이걸 갖고 페이징처리를 진행함<br>
            <img width="1534" height="381" alt="image" src="https://github.com/user-attachments/assets/f2f5d2c4-476f-46b9-9426-f5ba4cd5db71" />
            <img width="985" height="171" alt="image" src="https://github.com/user-attachments/assets/3134b7b2-746c-4d51-b589-32cb1e097e56" />
          </p>
        </li>
      </ol>
    </li>
  </ul>
</p>
