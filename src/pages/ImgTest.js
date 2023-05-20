import React, { useState } from 'react';
import { storage } from '../api/firebase';
import cancel from "../images/cancel.png"
import styled from 'styled-components';
import Modal from '../utils/Modal';
import AxiosApi from '../api/AxiosApi';

const Container = styled.div`


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

const ImageUploader = ({imageUploadUrl}) => {
  // 모달
  const [successModal, setSuccessModal] = useState(false);
  // 첨부 이미지 미리보기
  const [attachment, setAttachment] = useState(); 
  // 첨부 파일
  const [file, setFile] = useState(null);
  // 첨부 파일 url
  const [url, setUrl] = useState('');

  const handleFileInputChange = (e) => {
    const {target:{files, value}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    setFile(theFile);

    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result}} = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  };

  const handleUploadClick = async() => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    console.log('File uploaded successfully!');
    const url = await fileRef.getDownloadURL();
    console.log("저장경로 확인 : " + url);
    
    setUrl(url);
    setSuccessModal(true);
    setAttachment("");

    const response = await AxiosApi.updateImg(url);
    console.log(response.data);  
  };

  const onClearAttachment = () => { // 사진 제거
    setAttachment(null);
    setFile('');
    setUrl('');
  }

  const closeModal = () => {
    setSuccessModal(false);
  }

  const confirm = () => {
    setSuccessModal(false);
  }

  return (
    <>
    <Container>
    <div>
      <label htmlFor='file'>
        <div className='btn-upload'>사진 첨부</div>
     </label>
      <input type='file' id='file' onChange={handleFileInputChange} />
      <button className='upload' onClick={handleUploadClick}>Upload</button>
      {/* {url && <img src={url} alt="uploaded" />} */}
      <Attachment>
      {attachment && (
          <div>
            <img src={attachment} width="100px" height="100px" alt="attachment"/>
            <img src={cancel} alt="취소버튼" width="15px" height="15px" onClick={onClearAttachment} />
          </div>
        )}
      </Attachment>
    </div>
    </Container>
    <Modal open={successModal} type={true} close={closeModal} confirm={confirm} header="이미지 업로드">
      업로드 완료
    </Modal>
    </>
  );
}

export default ImageUploader;