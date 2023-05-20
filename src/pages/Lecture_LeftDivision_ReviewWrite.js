import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Modal from "../utils/ModalIMG"
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import { storage } from '../api/firebase';


const Container = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 100%;
`
const ReviewList = styled.div`
  width: 100%;
  display:flex;
  flex-wrap:nowrap;
`
const ReviewPhoto = styled.div`
  display:flex;
  justify-content:center;
  width: 41.5%;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    overflow:hidden;
  }
  .noimg {
    display:flex;
    justify-content:center;
    align-items:center;
  }
`
const WriteContain = styled.div`
  width: 60%;
  display: flex;
  flex-direction:column;
  textarea {
    border-radius: 5px;
    padding: 10px;
    word-break: break-all;
    word-wrap: break-word;
    resize: none;
    
    margin: 5px auto;
    width:90%;

  }
  .title {
    height: 30px;
  }
  .desc {
    display:flex;
    flex-grow: 1;
    height: 45%;
    min-height: 20%;
  }
`
const ReviewButton = styled.div`

  // 스타일 때문에 딴 곳에 숨겨뒀음
  .filebox input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
  }

  .filebox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  input[type="submit"],
  .uploadBtn,
  button {
    display:inline-flex;
    border: .5px solid black;
    border-radius: 5px;
    width: 15%;
    height: 21px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: darkgray;
    font-size: 0.7em;
    margin-right: 1%;
    &:hover {
      background-color: lightgray;
      color: white;
      cursor: pointer;
    }
  }
`
const ReviewWrite = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadIMG, setUploadIMG] = useState(null);
  const [modalImg, setModalImg] = useState(null);

  // 파일 찾기 버튼 이벤트
  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    // 파이어베이스에 업로드하기
    firebaseUpload(file);
    // 이미지 파일 외 확장자 업로드 할 경우 알림창 실행
    if (file.type.startsWith('image/')) {
      setUploadIMG(file);
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  }
  // 사진 삭제하기 버튼 이벤트
  const deletePhoto = () => {
    setUploadIMG(null);
    setModalImg(null);
  }

  // Modal 열기 이벤트
  const openModal = () => {
    if(modalImg) setModalOpen(true);
  }
  // Modal 닫기 이벤트
  const closeModal = () => {
    setModalOpen(false);
  } 

  // 사진을 업로드 했을 경우 Modal 창에 이미지 같이 띄우기
  useEffect(() => {
  if(uploadIMG) {
    setModalImg(<img src={URL.createObjectURL(uploadIMG)} alt="첨부이미지" />)
  }
  },[uploadIMG]);


  // 리뷰 작성할 때 텍스트 값 받아오기
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const onChangeTitle = (e) => { setTitle(e.target.value); }
  const onChangeDesc = (e) => { setDesc(e.target.value); }
  
  const num = 5; // 댓글 시퀀스 번호
  const lecNum = 3; // 카테고리 내에 있는 강의 번호
  // const memNum = 3; // 로그인 한 경우 사용자 값
  const context = useContext(UserContext);
  const {memberNum} = context;

  // 리뷰 작성하기 버튼 이벤트
  const PostReview = async() => {
    console.log("postReview 메소드 실행");
    console.log("memberNum 값 : " + memberNum);

    // 로그인이 되어있지 않으면 알림 출력
    if(memberNum === "") alert("로그인을 해주세요");
    
    // 나중에 num 값 삭제하고 java에서 sql문에 nextval로 바꾸기
    const reviewWrite = await AxiosApi.reviewWrite(lecNum, memberNum, title, desc, url);
    if(reviewWrite.data === true) {
      alert("리뷰 작성 완료!");
      // URL.create 는 garbage collect 를 자동 실행하지 않기 떄문에 
      // 메모리 누수 방지를 위해 revokeObjectURL 로 삭제 시켜준다.
      window.URL.revokeObjectURL(uploadIMG);
    };
  }
  // 리뷰 작성 시 사진 파일을 firebase에 추가
  const [url, setUrl] = useState('');
  const firebaseUpload = (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child('reviewUploadIMG/' + file.name);
    fileRef.put(file).then(() => {
      console.log('File uploaded successfully!');
      // 파일이 업로드 성공하면 storage에 저장된 경로를 url 에 저장
      fileRef.getDownloadURL().then((url) => {
        console.log("저장경로 확인 : " + url);
        setUrl(url);
      });
    });
  };
  
  
  return (
    <Container>
    <form action="" method="post" onSubmit={(e)=>{e.preventDefault()}}>
      <div>
      <ReviewList>
        <ReviewPhoto onClick={openModal}>
          {uploadIMG 
          ? <img src={URL.createObjectURL(uploadIMG)} alt="첨부이미지"/> 
          : <div className="noimg">사진을 선택해 주세요</div>
          }
        </ReviewPhoto>
        <WriteContain>
          <textarea className="title" placeholder="제목을 입력하세요." value={title} onChange={onChangeTitle}></textarea>
          <textarea className="desc" placeholder="내용을 입력하세요." value={desc} onChange={onChangeDesc}></textarea>
        </WriteContain>
      </ReviewList>
      <ReviewButton>
        <div class="filebox">
          <button onClick={deletePhoto}>파일삭제</button>
          <label className="uploadBtn" for="file" htmlFor="file-input">파일찾기</label> 
          <input type="file" id="file-input" accept="image/*" onChange={uploadPhoto}/>
          <input type="submit" value="작성하기" onClick={PostReview} />
        </div>
      </ReviewButton>
      </div>
    </form>
    <Modal open={modalOpen} type={false} close={closeModal} header="이미지 크게보기" children={uploadIMG}
       alt="첨부이미지"/>
  </Container>
  )
}

export default ReviewWrite;