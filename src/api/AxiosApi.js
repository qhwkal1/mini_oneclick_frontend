import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  memberLogin: async(id, pw) => {
    const login = {
      id : id,
      pwd : pw
    };
    return await axios.post(KH_DOMAIN + "/login", login);
  },
  // 회원 조회
  memberGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/member?id=${id}`); // 리퀘스트 파라미터 키와 밸류
  },
   // 회원 조회
   myInfoGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myInfo?id=${id}`); // 리퀘스트 파라미터 키와 밸류
  },
  // 회원 가입 여부 확인
  memberRegCheck : async(id) => {
    return await axios.get(KH_DOMAIN + `/check?id=${id}`);
  },
  // 회원 가입
  memberReg: async(name, email, tel, id, pwd, isTeacher) => {
  const member = {
      name: name,
      mail: email,
      tel : tel,
      id : id,
      pwd: pwd,
      isTeacher : isTeacher
  };
  return await axios.post(KH_DOMAIN + "/new", member);
  },
  // 전화번호 수정
  updateTel: async(id, tel) => {
    const updateT = {
      id : id,
      tel : tel
    };
    return await axios.post(KH_DOMAIN + "/updateTel", updateT);
  },
  // 전화번호 수정 중복값 체크
  telRegCheck : async(tel) => {
    return await axios.get(KH_DOMAIN + `/telCheck?tel=${tel}`)
  },
  // 이메일 수정
  updateMail: async(id, mail) => {
    const updateM = {
      id : id,
      mail : mail
    };
    return await axios.post(KH_DOMAIN + "/updateMail", updateM);
  },
  // 이메일 수정 중복값 체크
  mailRegCheck : async(mail) => {
    return await axios.get(KH_DOMAIN + `/mailCheck?mail=${mail}`);
  },
  // 회원 탈퇴
  deleteMem: async(userId) => {
    const del = {
      id : userId
    }
    return await axios.post(KH_DOMAIN + "/del", del);
  },
  // 내 구독권 조회
  mySubsGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/mySubs?id=${id}`);
  },
  // 내 수강 중 클래스 조회
  myClassGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myClass?id=${id}`);
  },
  // 내 위시리스트 조회
  myWishGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myWish?id=${id}`);
  },
  // 위시리스트 삭제
  deleteWish: async(num, wishNum) => {
    const del = {
      num : num,
      wishNum : wishNum
    }
    return await axios.post(KH_DOMAIN + "/delWish", del);
  },
  // 작성 후기 조회
  myReviewGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myReview?id=${id}`);
  },
  // 작성 가능한 후기 조회
  myWriteGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myWritable?id=${id}`);
  },
  // 강의 정보 조회
  classDetailGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/classDetail?id=${id}`);
  },
  // 후기 작성
  writeReview: async(memNum, lecNum, content) => {
    const write = {
      memNum: memNum,
      lecNum: lecNum,
      content: content
    }
    return await axios.post(KH_DOMAIN + "/writeReview", write);
  },
  // 후기 수정
  updateReview: async(num, content) => {
    const write = {
      num: num,
      content : content
    }
    return await axios.post(KH_DOMAIN + "/updateReview", write);
  },
  // 이미지 업로드(강의 썸네일 업데이트)
  updateImg: async(url) => {
    const update = {
      img: url
    }
    return await axios.post(KH_DOMAIN + "/updateImg", update);
  },
  // 내 결제 내역 조회
  paymentGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myPayment?id=${id}`);
  },
  // 내 장바구니 내역 조회
  myCartGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myCart?id=${id}`);
  },
  // 장바구니 삭제
  deleteCart: async(items) => {
    const del = {
      items: items
    }
    return await axios.post(KH_DOMAIN + "/delCart", del);
  },
   // 검색 : 전체 강의 조회
   lectureGet : async(num) => {
    return await axios.get(KH_DOMAIN + `/lecture?num=${num}`);
  },
  // 베이킹 강의 조회
  bakingGet : async(num) => {
    return await axios.get(KH_DOMAIN + `/baking?num=${num}`);
  },
  // 좋아요 순으로 강의 조회
  likeCountGet : async(num) => {
      return await axios.get(KH_DOMAIN + `/sidebar?num=${num}`);
  },
  // 좋아요 낮은 순 3개
  downCountGet : async(num) => {
      return await axios.get(KH_DOMAIN + `/down?num=${num}`);
  },
  // 아이디 찾기
  lostIdGet : async(name, mail) => {
    const findId = {
        name : name,
        mail : mail
    }
    return await axios.post(KH_DOMAIN + `/lostId`, findId);
  },
  // 비밀번호 찾기
  lostPwGet : async(name, id, mail) => {
      const findPw = {
          name : name,
          id : id,
          mail : mail
          
      }
      return await axios.post(KH_DOMAIN + `/lostPw`, findPw);
  },

  // 카테고리 별 강의 리스트 불러오기
  loadList: async(categoryNum) => {
    return await axios.get(KH_DOMAIN + `/category/details?categoryNum=${categoryNum}`);
  },

  // 강의 상세 설명 페이지
  viewLecture: async(lectureNum, category) => {
    console.log("viewLecture 메소드 호출" + category + lectureNum);
    return await axios.get(KH_DOMAIN + `/class?category=${category}&lectureNum=${lectureNum}`);
  },

  // 리뷰 불러오기
  viewList: async(review) => {
    console.log("loadReviewList 호출 : " + review);
    return await axios.get(KH_DOMAIN + `/class/loadReview?num=${review}`)
  },

  // 리뷰 작성
  reviewWrite: async(num, lecNum, memNum, title, content, img) => {
    const reviewData = {
      num : num,
      lecNum : lecNum,
      memNum : memNum,
      title : title,
      content : content,
      img : img
    }
    return await axios.post(KH_DOMAIN + "/class/reviewWrite", reviewData);
  },
  // 구독 정보 생성
  subRegister: async(paymentNum, type) => {
    const subscription = {
      paymentNum: paymentNum,
      type_: type
    };
    return await axios.post(KH_DOMAIN + "/subscription", subscription)
  },
  // 구독 정보 조회
  // getSubscription: async(num) => {
  //   return await axios.get(KH_DOMAIN + `subscription?id=${num}`);
  // },
  // 내 구독권 조회
  mySubsGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/mySubs?id=${id}`);
  },

  // 구독권 결제
  paymentInsert: async(lectureNum, memberNum, merchant_uid, amount, type) => {
    const payment = {
      lectureNum: lectureNum,
      memberNum: memberNum,
      created: merchant_uid,
      amount: amount,
      type: type 
    };
    return await axios.post(KH_DOMAIN + "/payment", payment);
  },
  // 구독권 환불
  payBack: async(num, amount) => {
    const payback = {
      num: num,
      amount: amount,
    }
    return await axios.post(KH_DOMAIN + "/payback", payback);
  },

  // 일반 강의 결제
  paymentIn: async(lectureNum, memberNum, merchant_uid, amount) => {
    const payment = {
      lectureNum: lectureNum,
      memberNum: memberNum,
      created: merchant_uid,
      amount: amount
    };
    return await axios.post(KH_DOMAIN + "/ordinaryPay", payment);
  },
};


export default AxiosApi;