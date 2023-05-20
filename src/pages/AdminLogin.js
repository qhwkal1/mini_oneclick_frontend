import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../utils/Modal";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;

  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      margin-right: 40px;
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }

  .enable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: orange;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
  }
  .enable-button:active {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  .disable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
  }

  .signup {
    display: flex;
    justify-content: right;
    align-items: center;
    color: orange;
    font-weight: 700;
    margin-top: 10px;
    margin-right: 40px;
    font-size: 14px;
    .link_style {
      color: orange;
      text-decoration: none;
    }
  }
  .imgUpload {
    display: flex;
    justify-content: right;
    align-items: center;
    color: orange;
    font-weight: 700;
    margin-top: 10px;
    margin-right: 40px;
    font-size: 14px;
    .link_style {
      color: orange;
      text-decoration: none;
    }
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const AdminLogin = () => {
  const navigate = useNavigate();  // 라우터 이동을 하기 위해(로그인 성공 시 홈으로 이동)
  const context = useContext(UserContext);
  const { setUserId, setPassword } = context;

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw ] = useState("");

  // 오류 메세지(실시간으로 확인, onChange)
  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  // 유효성 검사(아이디, 비밀번호 둘 다 충족 시 버튼 활성화)
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");

  // 모달(팝업 처리)
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  } 

  const onChangeId = (e) => {
    const regexId = /^\w{5,20}$/; // 로그인 시엔 정규식 체크할 필요 없음, 어차피 회원가입 때 체크하고 가입하니까
    setInputId(e.target.value);
    if(!regexId.test(e.target.value)) { // 아직 set값이 들어오지 않았으므로 e.target.value로 비교해줘야 한다
      setIdMsg("5자리 이상 20자리 미만 아이디 입력")
      setIsId(false);
    } else {
      setIdMsg("올바른 형식 입니다.");
      setIsId(true);
    }
  }

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
      const passwordCurrent = e.target.value;
      setInputPw(passwordCurrent)
      if (!passwordRegex.test(passwordCurrent)) {
          setPwMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
          setIsPw(false)
      } else {
          setPwMsg('안전한 비밀번호에요 : )');
          setIsPw(true);
      }
  }

  const onClickLogin = async() => {
    // 로그인을 위한 axios 호출
    const response = await AxiosApi.memberLogin(inputId, inputPw);
    console.log(response.data.success);
    console.log(response.data.userId);
    if(response.data.success === true) {
      setUserId(inputId);  // UserStore에 값이 담겨져서 넘어감 전역에서 사용 가능
      setPassword(inputPw);
      navigate("/Mypage");
    } else {
        console.log("로그인 에러!")
        setModalOpen(true);
    }
  }

  const confirmModal = () => {
    console.log("확인 버튼이 눌렸습니다.")
    setModalOpen(false);
  }

    return(
        <Container>
            <div className="item2">
                <Input placeholder="이름" value ={inputId} onChange={onChangeId}/>
            </div>
            <div className="hint">
              {inputId.length > 0 && <span className={`${isId ? 'success' : 'error'}`}>{idMsg}</span>}
            </div>
            <div className="item2">
                <Input type="password" placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
            </div>
            <div className="hint">
                {inputPw.length > 0 && (
                    <span className={`${isPw ? 'success' : 'error'}`}>{pwMsg}</span>)}
            </div>
            <div className="item2">
            {(isId && isPw) ?
              <button className="enable-button" onClick={onClickLogin}>SING IN</button>  :
              <button className="disable-button" >SING IN</button>}
            </div>
            <div className="signup">
              <Link to="/SignUp" className="link_sytle">회원가입</Link>
            </div>
            <div className="imgUpload">
              <Link to="/imgUpload" className="link_sytle">이미지 업로드</Link>
            </div>
            <Modal open={modalOpen} type={true} confirm={confirmModal} close={closeModal} header="오류">
              아이디 및 패스워드를 재확인 해주세요
            </Modal>
        </Container>
    );
};

export default AdminLogin;