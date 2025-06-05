// ⭐️ 리뷰 페이지 스크립트

import { getToken } from "../../common/auth-util.js";

const writeBtn = document.getElementById('writeReviewBtn');
const ratingModal = document.getElementById('ratingModal');
const reviewModal = document.getElementById('reviewModal');
const starSelect = document.getElementById('starSelect');
const reviewText = document.getElementById('reviewText');
const submitBtn = document.getElementById('submitReviewBtn');
const cancelRatingBtn = document.getElementById('cancelRatingBtn');
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
const pagination = document.getElementById('pagination');
const ratingDistribution = document.getElementById('ratingDistribution');

let currentPage = 1; // 현재 페이지
const reviewsPerPage = 6; // 한 페이지에 보여주는 리뷰 수
let selectedRating = null;
let reviews = [];
let menuName = null;

window.addEventListener('DOMContentLoaded', async () => {
    generateRatingBars();
    renderReviews();
});

function generateRatingBars() {
    for (let i = 5; i >= 1; i--) {
        const div = document.createElement('div');
        div.className = 'bar';
        div.dataset.rate = i;
        div.innerHTML = `
            <span>${i}점</span>
            <div class="bar-outer">
                <div class="bar-inner" id="bar-${i}"></div>
            </div>
            <span class="count" id="count-${i}">0</span>
        `;
        ratingDistribution.appendChild(div);
    }
}

async function renderReviews() {
    // 리뷰 가져오기
    try {
        menuName = document.getElementById("menuName").dataset.menu;
        const res = await fetch(`/menu-review/listUp?menuName=${encodeURIComponent(menuName)}`);
        if (!res.ok) throw new Error('리뷰 불러오기 실패');
        reviews = await res.json();
    } catch (err) {
        console.error('리뷰 가져오는 중 오류:', err);
    }

    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';

    // 등록된 리뷰가 없을 때
    if (reviews.length === 0) {
        reviewList.innerHTML = '<div style="text-align:center; padding:20px">등록된 리뷰가 없습니다.</div>';
        updateAverageRating();
        pagination.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(reviews.length / reviewsPerPage); // 총 페이지 수
    const start = (currentPage - 1) * reviewsPerPage; // 시작 번호
    // 리뷰 리스트를 배열로 가져와서 순서를 뒤집고 1페이지면 0~5, 2페이지면 6~11
    const current = reviews.slice().slice(start, start + reviewsPerPage);

    // review data를 기준으로 리뷰를 생성
    current.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="review-meta">
                <strong>⭐️ ${r.reviewRate}</strong>
                <span class="review-time">${r.createdAt}</span>
            </div>
            <p>${r.reviewContent}</p>
        `;
        reviewList.appendChild(div);
    });

    updateAverageRating();
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.disabled = (i === currentPage);
        if (i === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => {
            currentPage = i;
            renderReviews();
        });
        pagination.appendChild(btn);
    }
}

// 총합 평점 업데이트
function updateAverageRating() {
    const averageRatingEl = document.getElementById('averageRating');

    if (reviews.length === 0) {
        averageRatingEl.textContent = '0.0';
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`bar-${i}`).style.width = '0%';
            document.getElementById(`count-${i}`).textContent = '0';
        }
        return;
    }

    const total = reviews.reduce((sum, r) => sum + r.reviewRate, 0);
    const avg = (total / reviews.length).toFixed(1);
    averageRatingEl.textContent = avg;

    const counts = [0, 0, 0, 0, 0, 0];
    reviews.forEach(r => counts[r.reviewRate]++);
    const max = Math.max(...counts.slice(1));

    for (let i = 1; i <= 5; i++) {
        const percent = max ? (counts[i] / max) * 100 : 0;
        document.getElementById(`bar-${i}`).style.width = `${percent}%`;
        document.getElementById(`count-${i}`).textContent = counts[i];
    }
}

function getFormattedTime() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

submitBtn.addEventListener('click', async () => {
    const text = reviewText.value.trim();
    if (!selectedRating || text === '') {
        alert('평점과 리뷰 내용을 입력해주세요.');
        return;
    }

    try {
        await fetch("/menu-review/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                menuName,
                reviewContent: text,
                reviewRate: selectedRating
            })
        });

        reviewModal.classList.add('hidden');
        selectedRating = null;
        reviewText.value = '';
        currentPage = 1;
        await renderReviews();
    } catch (e) {
        console.log("리뷰 등록 실패")
    }
});

writeBtn.addEventListener('click', () => {
    selectedRating = null;
    reviewText.value = '';
    document.querySelectorAll('#starSelect i').forEach(star => {
        star.classList.remove('selected', 'fa-solid');
        star.classList.add('fa-regular');
    });
    ratingModal.classList.remove('hidden');
});

cancelRatingBtn.addEventListener('click', () => ratingModal.classList.add('hidden'));
cancelReviewBtn.addEventListener('click', () => {
    selectedRating = null;
    reviewText.value = '';
    reviewModal.classList.add('hidden');
});

document.querySelectorAll('.star-rating i').forEach((star) => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        document.querySelectorAll('.star-rating i').forEach((s, idx) => {
            s.classList.toggle('fa-solid', idx < selectedRating);
            s.classList.toggle('fa-regular', idx >= selectedRating);
            s.classList.toggle('selected', idx < selectedRating);
        });
        setTimeout(() => {
            ratingModal.classList.add('hidden');
            reviewModal.classList.remove('hidden');
        }, 300);
    });
});

const stars = document.querySelectorAll('#starSelect i');
stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
            s.classList.toggle('fa-solid', i <= index);
            s.classList.toggle('fa-regular', i > index);
        });
    });
    star.addEventListener('mouseleave', () => {
        stars.forEach((s, i) => {
            s.classList.toggle('fa-solid', i < selectedRating);
            s.classList.toggle('fa-regular', i >= selectedRating);
        });
    });
});
