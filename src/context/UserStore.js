import { createContext, useState } from "react";
export const UserContext = createContext(null);

// 설정한 값을 전역에서 사용할 수 있도록 만들어줌
const UserStore = (props) => {
  const [userId, setUserId] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [memberNum, setMemberNum] = useState("");
  const [lectureNum, setLectureNum] = useState("");
  const [categoryNum, setCategoryNum] = useState("");

  return(
  <> 
  <UserContext.Provider value={{isLogin, setIsLogin, userName, setUserName, phone, setPhone, mail, setMail, memberNum, setMemberNum, lectureNum, setLectureNum, userId, setUserId, categoryNum, setCategoryNum}}>
    {props.children}
  </UserContext.Provider>
  </>
  );
};

export default UserStore;