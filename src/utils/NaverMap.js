import React, {useEffect, useState} from 'react';
 //123
const { naver } = window;
const NaverMap = ({children}) => {
  // 주소 불러오기 전엔 Default 값으로 에버랜드 주소 불러옴
  const [xVal, setXVal] = useState(37.5112);
  const [yVal, setYVal] = useState(127.0981);
  console.log(children);
  useEffect(() => {
    // 제대로 불러오는지 확인
    console.log("useEffect Call : " + xVal + " " + yVal);

    //  지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정
    // * 밑에서 const map = new naver.maps.Map(document.getElementById("map"), mapOptions); 로
    // * 구현했지만, 변수로 사용해도 상관없음!
    // * const container = document.getElementById("map");

    // 지도 생성 시 옵션
    const position = new naver.maps.LatLng(xVal, yVal); // 지도 중심위치 설정
    const mapOptions = {
        center: position, // 맵 렌더링시 지도의 초기 중심 좌표, position 대신 new naver.maps.LatLng(위경도값);
        zoom: 17, // 지도의 초기 줌 레벨
        minZoom: 6, // 지도의 최소 줌 레벨
        zoomControl: true, // 줌 컨트롤의 표시 여부
        zoomControlOptions: { // 줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT,
        },
    };

    // 지도 구현하는 변수 생성
    const map = new naver.maps.Map(document.getElementById("map"), mapOptions);

    // 지도에서 마커 구현
    const marker = new naver.maps.Marker({
      // 지도 초기 중심 좌표와 일치하게 하기 위해서 같은 위치 지정하는 position 변수 재사용
      position: position, 
      map: map
    });
    
    // 위도, 경도 찾으려는 주소를 query 안에 지정하면 status에 상태와 response 에 검색 결과 컨테이너를 가져온다.
    naver.maps.Service.geocode({ query: children }, function(status, response) {
      // 올바른 상태값이 리턴되지 않으면 오류발생 알림
      console.log(children);
      if (status !== naver.maps.Service.Status.OK) {
          return alert('지도 로딩 실패!');
      };

      // response.v2 에 담겨오는 객체 정보는
      // * https://navermaps.github.io/maps.js/docs/naver.maps.Service.html#~GeocodeResponse 확인!!

      // 성공적으로 response 값을 가져오면 위도, 경도값을 바꾼다.
      console.log(response.v2);

      setXVal(response.v2.addresses[0].y);
      setYVal(response.v2.addresses[0].x);
    });
  },[xVal, yVal]);


  return (
      <div>
          <div id="map" style={{width:'100%', height:'250px' }}></div>
      </div>
  );
};
 
export default NaverMap;

        // do Something
        // result 객체에는 아래와 같은 json 객체가 전달된다.
        // {
        //   "result": {
        //     "total": 1,
        //     "userquery": "불정로 6",
        //     "items": [
        //       {
        //         "address": "경기도 성남시 분당구 불정로 6 그린팩토리",
        //         "addrdetail": {
        //           "country": "대한민국",
        //           "sido": "경기도",
        //           "sigugun": "성남시 분당구",
        //           "dongmyun": "불정로",
        //           "rest": " 6 그린팩토리"
        //         },
        //         "isRoadAddress": true,
        //         "point": {
        //           "x": 127.1052133,
        //           "y": 37.3595316
        //         }
        //       }
        //     ]
        //   }
        // }