import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import MypageFooter from "./MypageFooter";
import MypageHeader from "./MypageHeader";
import { storage } from "../api/firebase";
import cancel from "../images/cancel.png"

const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  background-color: #FEFDFD;
  width: 40%;
  margin: 3px auto;
  border: 1px solid lightgray;
  padding: 30px;
`;

const SectionBox1 = styled.div`
  width: 100%;
  height: 230px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Thumbnail = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 150px;
  object-fit: cover;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Category = styled.p`
  text-align: center;
  font-size: 0.7rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Title = styled.h3`
  text-align: center;
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Section2 = styled.div`
  position: relative;
  width: 80%;
  height: 150px;
  margin: 0 auto;

  textarea {
    resize: none;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 100%;
    height: 150px;
  }
  .count {
    color: darkgray;
    font-size: 0.7em;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
`;

const Write = styled.div`
  width: 80%;
  margin: 0 auto;

  button {
    width: 100%;
    height: 35px;
    font-size: .8em;
    font-weight: bold;
    background-color: #FC7373;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: lightgray;
    }
  }

  .disable-button {
    background-color: darkgray;
    cursor: none;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
`;

const UploadSection = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;

  .upload {
    display: none;
  }
`;

const ImgContainer = styled.div`


  .btn-upload, button {
  width: 55px;
  height: 20px;
  background: #fff;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-weight: bold;
  font-size: 0.7em;
  color: darkgray;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

    &:hover {
      background: lightgray;
      color: white;
      border: none;
    }
  }

  #file {
  display: none;
 }

`;

const Attachment = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5px;
  img {
    &:nth-child(1) {
      
    }
    &:nth-child(2) {
      position: absolute;
      top: 0;
      left: 90px;
      cursor: pointer;
    }
  }

`;


const MyWriteReview = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userId } = context;
  const { lectureId } = useParams();

  // 글자 수 표시
  const [inputCount, setInputCount] = useState(0);
  const MAX_LENGTH = 100;
  // 후기 작성, 수정
  const [inputContext, setInputContext] = useState("");
  // 강의 정보
  const [lectureInfo, setlectureInfo] = useState("");
  // 회원 정보
  const [memberInfo, setMemberInfo] = useState("");
  // 첨부 이미지 미리보기
  const [attachment, setAttachment] = useState(); 
  // 첨부 파일
  const [file, setFile] = useState(null);
  // 첨부 파일 url
  const [url, setUrl] = useState('');

  useEffect(() => {
    const lectureInfo = async() => {
      const response = await AxiosApi.classDetailGet(lectureId);
      if(response.status === 200) setlectureInfo(response.data);
    };
    lectureInfo();
  }, [lectureId]);

  const textInput = (e) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
    setInputContext(e.target.value);
  };

  const changeReview = async() => {
    const rsp = await AxiosApi.memberGet(userId);
    if(rsp.status === 200) setMemberInfo(rsp.data);
    const memNum = rsp.data.length > 0 ? rsp.data[0].num.toString() : "";
  
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    console.log('File uploaded successfully!');
    const url = await fileRef.getDownloadURL();
    console.log("저장경로 확인 : " + url);
    
    setUrl(url);
    setAttachment("");

    const response = await AxiosApi.writeReview(memNum, lectureId, inputContext, url);
    console.log(response.data);
    navigate('/MyPage', { state: { selected: "후기" } });
  };

  const handleFileInputChange = (e) => {
    const {target:{files}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    setFile(theFile);

    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result}} = finishedEvent
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => { // 사진 제거
    setAttachment(null);
    setFile('');
    setUrl('');
  }

  return( 
    <>
    <BodyContainer>
      <Container>
      <MypageHeader />
      {lectureInfo && lectureInfo.map(lecture => (
        <SectionBox1 key={lecture.num}>
        <Thumbnail imageUrl={lecture.thum}></Thumbnail>
        <Category>{lecture.categoryName}</Category>
        <Title>{lecture.name}</Title>
        </SectionBox1>
      ))}
      <Section2>
        <textarea cols="30" rows="10" maxLength={MAX_LENGTH} onChange={textInput}></textarea>
        <div id="nowByte" class="count"><span>{inputCount.toLocaleString()}</span>/{MAX_LENGTH.toLocaleString()}자</div>
      </Section2>
      <UploadSection>
      <ImgContainer>
      <div>
        <label htmlFor='file'>
          <div className='btn-upload'>사진 첨부</div>
      </label>
        <input type='file' id='file' accept='image/*' onChange={handleFileInputChange} />
        <Attachment>
        {attachment && (
            <div>
              <img src={attachment} width="100px" height="100px" alt="attachment"/>
              <img src={cancel} alt="취소버튼" width="15px" height="15px" onClick={onClearAttachment} />
            </div>
          )}
        </Attachment>
      </div>
    </ImgContainer>
      </UploadSection>
      <Write>
      {(attachment && inputContext) ?
      <button onClick={changeReview}>작성하기</button> :
      <button className="disable-button">작성하기</button>}
      <hr />
      </Write>
      <div className="emptyBox"></div>
      <MypageFooter />
      </Container>
    </BodyContainer>
    </>
  )
}

export default MyWriteReview;