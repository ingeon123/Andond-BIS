# 안동시 버스정보시스템 API를 활용한 BIS시스템 설계

**역할**

back-end(안동시 버스정보시스템 API땡겨오기

정류장 검색 ajax요청

선택한 정류장 ajax요청 및 요청 처리



-----
개발 환경

os : window

front-end : html, css, js

back-end: node.js

DB : mySQL, heidiSQL

server : node.js의 express라이브러리 사용


-----
사용 API

안동시 버스정보시스템 API
https://bus.andong.go.kr/m01/s04.do?c=20400&i=20440&tab=1

카카오맵 API


-----
기능

안동시의 모든 정류장 위치 확인 가능(지도 마크로 표시)

정류장 및 버스 번호를 이용해 검색 가능

검색한 정류장의 도착 버스 정보 확인 가능(버스 번호, 도착 남은 시간)

검색한 버스의 현재 위치 해당 버스의 경로 확인 가능

지도 API를 이용하여 선택된 정류장 위치 확인(지도 마크 표시)
