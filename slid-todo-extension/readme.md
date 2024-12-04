# Slid to-do Chrome Extension

YouTube 영상을 보면서 할 일을 쉽게 관리할 수 있는 Chrome 확장프로그램입니다.

## 설치 방법

1. 이 저장소를 클론 또는 다운로드합니다
2. Chrome 브라우저에서 `chrome://extensions`로 이동합니다
3. 우측 상단의 "개발자 모드"를 켭니다
4. "압축해제된 확장 프로그램을 로드합니다" 버튼을 클릭합니다
5. 다운로드 받은 폴더를 선택합니다

## 사용 방법

1. YouTube 영상 페이지에서 확장프로그램 아이콘을 클릭합니다
2. 할 일의 제목을 입력합니다
3. 목표를 선택합니다
4. "생성하기" 버튼을 클릭합니다

## 기능

- YouTube 영상 URL 자동 저장
- 할 일 목록 관리
- 목표별 할 일 분류

## 개발 환경

- HTML/CSS/JavaScript
- Chrome Extension API

## manifest.json

- manifest_version: Chrome 확장 프로그램의 버전을 나타냄
- name: 확장 프로그램의 이름
- version: 확장 프로그램의 버전
- description: 확장 프로그램의 설명
- permissions: 확장 프로그램에서 필요한 권한
- host_permissions: 확장 프로그램이 접근할 수 있는 호스트 범위
- action: 확장 프로그램의 아이콘과 팝업 페이지를 설정
- background: 확장 프로그램의 백그라운드 스크립트를 설정
- content_scripts: 확장 프로그램이 웹페이지에 삽입될 스크립트를 설정 (ts는 컴파일로 인해 js로 변환되어 사용됨)
  - matches: 확장 프로그램이 적용될 웹페이지의 URL 패턴
