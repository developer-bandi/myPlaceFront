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
<p align=center> 🏠 <a href=https://movieinfoservice.netlify.app/>홈페이지 바로가기</a></p>

## 1.프로젝트 소개

일반적으로 여러 키워드가 포함된 장소를 찾기 위해서는 구글에 대표 키워드로 검색한후 검색 결과를 보고 나머지 키워드가 포함되었는지 확인합니다. 가령 연인끼리 가기 좋은 카페인데, 당근케이크와 딸기 케이크가 맛있으며, 오션뷰가 있는 곳을 찾는경우 연인끼리 가기 좋은 카페라고 검색한뒤, 당근케이크와 딸기케이크가 맛있는지, 오션뷰가 있는지 확인하는것입니다. 이러한 과정은 정보를 찾는데 너무 오랜시간이 걸리기에, 이를 해결하고자 여러개의 키워드를 포함해서 한번에 한번에 검색할수 있는 프로젝트를 만들게되었습니다.

## 2.주요 기능 소개

### 로그인

- 네이버/카카오 소셜로그인과 로컬로그인이 가능합니다
- 로컬로그인의 경우 초기 입력한 이메일 인증으로 비밀번호를 변경할수 있습니다

### 장소 검색

- 기준위치를 결정하고 태그 혹은 키워드를 이용해 검색할수 있습니다.
- 지도에 나온 검색결과를 선택하면 장소에 대한 정보를 얻을수 있고 후기를 남길수도 있습니다.

### 장소 등록/수정하기

- 기여하기 탭을 통해 장소를 등록하거나 장소 검색에서 장소를 수정할수 있습니다.

### 커뮤니티

- 포스트를 정렬 조건에 맞추어 정렬할수 있고, 키워드를 입력하여 검색할수 있습니다.
- 댓글, 좋아요 기능이 있고, 해당 기능사용시 관련된 사람에게 알람이 가도록 되어있습니다.
- 게시글에는 텍스트와 사진을 업로드 할수 있도록 되어있습니다.

### 마이페이지

- 북마크,자신이 작성한 후기,포스트,댓글 을 볼수 있으며 개인정보를 수정하거나 회원탈퇴를 진행할수 있습니다.

## 3.관련 블로그 포스트

- [커뮤니티 좋아요 기능 개선하기](!https://velog.io/@dujk68/%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B2%BD%ED%97%98%EC%9D%84-%EA%B3%A0%EB%A0%A4%ED%95%9C-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-%EC%A2%8B%EC%95%84%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [탭 전환시 화면이 깜빡거리는 문제 해결하기](https://velog.io/@dujk68/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)
- [next.js 의 ssg, ssr, isg 적절하게 적용하기](https://velog.io/@dujk68/next-js%EB%A1%9C-pre-render-%ED%95%98%EA%B8%B0)
- [react 컴포넌트 분리하기](https://velog.io/@dujk68/react-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%B6%84%EB%A6%AC%ED%95%98%EA%B8%B0)
- [무한 스크롤 만들어보기(with.react)](https://velog.io/@dujk68/react%EC%99%80-%ED%95%A8%EA%BB%98-Infinity-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [무한 캐러셀 만들어보기(with. react)](https://velog.io/@dujk68/%EB%AC%B4%ED%95%9C-%EC%BA%90%EB%9F%AC%EC%85%80-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0with-react)
- [클러스터링을 활용하여 지도 렌더링 최적화하기(feat. 오픈소스 배포하기)](https://velog.io/@dujk68/%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0%EB%A7%81%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EC%A7%80%EB%8F%84-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0feat.-%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)
