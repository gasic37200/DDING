// ⭐️ 리뷰 작성 버튼 등 요소 초기화
const writeBtn = document.getElementById('writeReviewBtn');       // 리뷰 작성 버튼
const ratingModal = document.getElementById('ratingModal');       // 별점 선택 모달
const reviewModal = document.getElementById('reviewModal');       // 리뷰 내용 작성 모달
const starSelect = document.getElementById('starSelect');         // 별점 선택 UI 영역
const reviewText = document.getElementById('reviewText');         // 리뷰 텍스트 입력
const submitBtn = document.getElementById('submitReviewBtn');     // 리뷰 제출 버튼
const cancelRatingBtn = document.getElementById('cancelRatingBtn'); // 별점 선택 취소 버튼
const cancelReviewBtn = document.getElementById('cancelReviewBtn'); // 리뷰 작성 취소 버튼
const reviewList = document.getElementById('reviewList');         // 리뷰 출력 영역
const averageRatingEl = document.getElementById('averageRating'); // 평균 별점 표시 영역

let selectedRating = null;   // 사용자가 선택한 별점
let reviews = [];            // 전체 리뷰 배열

const reviewsPerPage = 6;    // 한 페이지에 표시할 리뷰 수
let currentPage = 1;         // 현재 페이지 번호

// ⭐ 리뷰 목록 불러오기 (초기 렌더링, POST 이후 갱신에도 사용)
async function fetchReviews() {
  // ✅ 현재는 프론트엔드 테스트용 임시 데이터
  reviews = [
    { rating: 5, text: "맛있네요", timestamp: "2025-05-10 14:22" },
    { rating: 4, text: "괜찮네요", timestamp: "2025-05-11 09:40" },
    { rating: 3, text: "그닥", timestamp: "2025-05-13 17:15" }
  ];

  // ✅ 백엔드 연동 시 사용
  /*
  try {
    const res = await fetch('/api/reviews'); 
    // 목적: 서버에서 모든 리뷰 조회
    // 요청 방식: GET
    // 응답 예시: [{ rating: 5, text: "맛있네요", timestamp: "2025-05-10 14:22" }, ...]

    if (!res.ok) throw new Error('리뷰 불러오기 실패');
    reviews = await res.json();
  } catch (err) {
    console.error('리뷰 가져오는 중 오류:', err);
    return;
  }
  */

  renderReviews();
}

// ⭐ 리뷰 등록
async function submitReview() {
  const text = reviewText.value.trim();
  if (!selectedRating || text === '') {
    alert('평점과 리뷰 내용을 입력해주세요.');
    return;
  }

  const timestamp = getFormattedTime();

  // ✅ 임시 로컬 저장 (테스트용)
  reviews.push({ rating: selectedRating, text, timestamp });

  // ✅ 백엔드 연동 시 사용
  /*
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer <JWT>' ← JWT 인증이 있을 경우
      },
      body: JSON.stringify({
        rating: selectedRating,   // 정수형 별점 (1~5)
        text: text,               // 텍스트 리뷰
        timestamp: timestamp      // 작성 시간 문자열 (YYYY-MM-DD HH:mm)
      })
    });

    if (res.ok) {
      await fetchReviews(); // 등록 후 목록 갱신
    } else {
      alert('리뷰 저장 실패');
    }
  } catch (err) {
    console.error('리뷰 저장 오류:', err);
    alert('리뷰 저장 중 오류 발생');
  }
  */

  reviewModal.classList.add('hidden');
  selectedRating = null;
  reviewText.value = '';
  currentPage = 1;
  renderReviews();
}

// ⭐ 현재 시간 포맷 (YYYY-MM-DD HH:mm)
function getFormattedTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

// ⭐ 평균 별점 및 개별 막대바 렌더링
function updateAverageRating() {
  if (reviews.length === 0) {
    averageRatingEl.textContent = '0.0';
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`bar-${i}`).style.width = '0%';
      document.getElementById(`count-${i}`).textContent = '0';
    }
    return;
  }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = (total / reviews.length).toFixed(1);
  averageRatingEl.textContent = avg;

  const counts = [0, 0, 0, 0, 0, 0];
  reviews.forEach(r => counts[r.rating]++);
  const max = Math.max(...counts.slice(1));

  for (let i = 1; i <= 5; i++) {
    const percent = max ? (counts[i] / max) * 100 : 0;
    document.getElementById(`bar-${i}`).style.width = `${percent}%`;
    document.getElementById(`count-${i}`).textContent = counts[i];
  }
}

// ⭐ 리뷰 목록 렌더링
function renderReviews() {
  reviewList.innerHTML = '';

  if (reviews.length === 0) {
    const noReviewDiv = document.createElement('div');
    noReviewDiv.textContent = '등록된 리뷰가 없습니다.';
    noReviewDiv.style.textAlign = 'center';
    noReviewDiv.style.padding = '20px';
    reviewList.appendChild(noReviewDiv);
    return;
  }

  const totalPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage));
  const startIdx = (currentPage - 1) * reviewsPerPage;
  const endIdx = startIdx + reviewsPerPage;
  const currentReviews = reviews.slice().reverse().slice(startIdx, endIdx);

  currentReviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <div class="review-meta">
        <strong>⭐️ ${r.rating}</strong>
        <span class="review-time">${r.timestamp}</span>
      </div>
      <p>${r.text}</p>
    `;
    reviewList.appendChild(div);
  });

  updateAverageRating();
  renderPagination(totalPages);
}

// ⭐ 페이지네이션 렌더링
function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = (i === currentPage);
    btn.addEventListener('click', () => {
      currentPage = i;
      renderReviews();
    });
    if (i === currentPage) btn.classList.add('active');
    pagination.appendChild(btn);
  }
}

// ⭐ 별점 클릭 처리
document.querySelectorAll('.star-rating i').forEach((star) => {
  star.addEventListener('click', () => {
    const value = parseInt(star.dataset.value);
    selectedRating = value;
    document.querySelectorAll('.star-rating i').forEach((s, idx) => {
      if (idx < value) {
        s.classList.add('fa-solid', 'selected');
        s.classList.remove('fa-regular');
      } else {
        s.classList.remove('fa-solid', 'selected');
        s.classList.add('fa-regular');
      }
    });
    setTimeout(() => {
      ratingModal.classList.add('hidden');
      reviewModal.classList.remove('hidden');
    }, 300);
  });
});

// ⭐ 별점 hover 효과 처리
const stars = document.querySelectorAll('#starSelect i');
stars.forEach((star, index) => {
  star.addEventListener('mouseenter', () => {
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.add('fa-solid', 'hovered');
        s.classList.remove('fa-regular');
      } else {
        s.classList.remove('fa-solid', 'hovered');
        s.classList.add('fa-regular');
      }
    });
  });

  star.addEventListener('mouseleave', () => {
    stars.forEach((s, i) => {
      s.classList.remove('hovered');
      if (i < selectedRating) {
        s.classList.add('fa-solid');
        s.classList.remove('fa-regular');
      } else {
        s.classList.remove('fa-solid');
        s.classList.add('fa-regular');
      }
    });
  });
});

// ⭐ 모달 열기/닫기 처리
writeBtn.addEventListener('click', () => {
  selectedRating = null;
  reviewText.value = '';
  document.querySelectorAll('#starSelect i').forEach(star => {
    star.classList.remove('selected', 'fa-solid');
    star.classList.add('fa-regular');
  });
  ratingModal.classList.remove('hidden');
});
cancelRatingBtn.addEventListener('click', () => {
  selectedRating = null;
  ratingModal.classList.add('hidden');
});
cancelReviewBtn.addEventListener('click', () => {
  selectedRating = null;
  reviewText.value = '';
  reviewModal.classList.add('hidden');
});

// ⭐ 리뷰 등록 버튼 이벤트 바인딩
submitBtn.addEventListener('click', submitReview);

// ⭐ 페이지 로딩 시 리뷰 목록 가져오기
window.addEventListener('DOMContentLoaded', fetchReviews);
