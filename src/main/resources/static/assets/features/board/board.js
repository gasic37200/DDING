let userPosts = [];
let currentPostIndex = null;

// 게시판 탭 전환
function showBoard(boardId) {
  document.querySelectorAll('.board-section').forEach(section => section.classList.remove('active'));
  document.getElementById(boardId).classList.add('active');
}

// 글쓰기 모달 열기
function openWriteModal() {
  document.getElementById('writeModal').style.display = 'flex';
}

// 글쓰기 모달 닫기
function closeWriteModal() {
  document.getElementById('writeModal').style.display = 'none';
}

// 글 작성 완료 시 실행
function submitPost() {
  const title = document.getElementById('newTitle').value.trim();
  const content = document.getElementById('newContent').value.trim();

  if (!title || !content) {
    alert("제목과 내용을 입력해주세요!");
    return;
  }

  const today = new Date();
  const dateStr = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, '0') + "." + String(today.getDate()).padStart(2, '0');

  const postData = {
    title,
    author: "익명",
    date: dateStr,
    content,
    comments: []
  };

  userPosts.push(postData);

  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.innerHTML = `
    <div class="post-title">${title}</div>
    <div class="post-meta">작성자: 익명 | ${dateStr}</div>
    <div class="post-content">${content}</div>
  `;
  postDiv.onclick = () => openDetailModal(title, "익명", dateStr, content, postData.comments, true);

  const board = document.getElementById("free");
  board.insertBefore(postDiv, board.lastElementChild);

  closeWriteModal();
  document.getElementById('newTitle').value = "";
  document.getElementById('newContent').value = "";
}