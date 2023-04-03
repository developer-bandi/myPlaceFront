<h1 align=center > 키워드를 바탕으로 장소 검색하기 - MyPlace 🗺️ </h1>
<img src="https://user-images.githubusercontent.com/102564722/226252636-aa441dab-4a9d-471a-a60d-29a64eb280a0.png"/>
<br></br>
<div align=center>
    <img src="https://img.shields.io/badge/4.6.4-Typescript-3178C6?style=flat&logo=Typescript&logoColor=3178C6"/>
    <img src="https://img.shields.io/badge/12.1.6-next.js-white?style=flat&logo=next.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/1.51.0-Sass-DB7093?style=flat&logo=sass&logoColor=DB7093"/>
    <img src="https://img.shields.io/badge/4.2.0-Redux-764ABC?style=flat&logo=redux&logoColor=764ABC"/>
    <img src="https://img.shields.io/badge/1.1.3-redux saga-FF9E0F?style=flat&logo=redux-saga&logoColor=FF9E0F"/>
    <img src="https://img.shields.io/badge/27.0.0-jest-FF4154?style=flat&logo=jest&logoColor=FF4154"/>
        <img src="https://img.shields.io/badge/13.3.0-react testing library-FF4154?style=flat&logo=testing-library&logoColor=FF4154"/>
</div>
<p align=center> 🏠 <a href=https://my-place-front-eosin.vercel.app/>홈페이지 바로가기</a></p>

## 🔥 서비스 소개

**키워드 기반의 장소 검색 서비스**

- 여러개의 키워드를 기반으로 원하는 성격의 장소를 찾을수 있습니다.
- 유저가 직접 장소를 등록하고 리뷰를 남길수 있습니다.
- 커뮤니티를 통해 다양한 의견을 주고받을수 있습니다.

<hr/>

## ⭐️ 주요 기능

### 유저/마이페이지

- 네이버/카카오 소셜로그인과 로컬로그인이 가능하며 로컬로그인의 경우 초기에 입력한 이메일로 비밀번호를 변경할수 있습니다
- 커뮤니티에 작성한 게시글 혹은 댓글을 단 게시글에 댓글이 작성되거나 좋아요를 받은경우 알림을 받을수 있습니다.
- 마이페이지를 통해서 좋아하는 장소, 작성한게시글, 댓글등의 정보를 확인할수 있고 정보를 수정할수 있습니다.

### 장소 검색

- 기준위치를 결정하고 태그 혹은 키워드를 이용해 검색할수 있습니다.
- 지도에 나온 검색결과를 선택하면 장소에 대한 정보를 얻을수 있고 후기를 남길수도 있습니다.
- 지도 레벨을 높일경우 겹치는 마커에 대해서는 대표마커만 나타나며 대표마커를 클릭하면 나타나는 리스트를 통해 나머지 마커를 확인할수 있습니다.

### 기여하기

- 기여하기 탭을 통해 자신이 아는 장소를 등록할수 있습니다.
- 장소검색을 통해 나온 장소에서 장소정보를 수정할수 있습니다.
- 장소 검색을 통해 나온 장소에서 키워드를 포함한 리뷰를 등록할수 있습니다.

### 커뮤니티

- 포스트를 정렬 조건에 맞추어 정렬할수 있고, 키워드를 입력하여 검색할수 있습니다.
- 댓글, 좋아요 기능이 있고, 해당 기능사용시 관련된 사람에게 알람이 가도록 되어있습니다.
- 게시글에는 텍스트와 사진을 업로드 할수 있도록 되어있습니다.

<hr/>

## ⚙ 배포 아키텍쳐

<img src="https://user-images.githubusercontent.com/102564722/229433186-1fc1b085-c8d5-4f2e-be60-2127a86d315f.jpeg"/>

- front서버는 vercel에, back서버는 heroku에 배포하였습니다.
- 각각 github 저장소가 연동되어 있어 main브랜치가 변경되면 자동으로 배포됩니다.
<hr/>

## 📜 관련 블로그 포스트

- [Next.js 의 SSG, SSR, ISR를 적절하게 이용하여 UX 개선하기](https://puki4416blog.netlify.app/nextjs-ssg-isr-ssr-appropriate/)
- [탭 전환시 화면이 깜빡거리는 문제 해결하기](https://puki4416blog.netlify.app/tab-switch-window-flicker/)
- [optimistic update를 활용하여 좋아요 기능 개선하기](https://puki4416blog.netlify.app/improve-like-function/)
- [무한스크롤 만들어보기](https://puki4416blog.netlify.app/make-infinity-scroll/)
- [무한캐러셀 만들어보기](https://puki4416blog.netlify.app/make-infinity-carousel/)
- [클러스터링을 활용하여 지도 렌더링 최적화하기(feat. 오픈소스 배포하기)](https://puki4416blog.netlify.app/marker-clustering/)
