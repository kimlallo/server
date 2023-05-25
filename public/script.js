const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');

// 게시글 작성 이벤트 처리
postForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  // 백엔드로 게시글 생성 요청 보내기
  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // 게시글 생성 성공 시 입력 필드 초기화
      titleInput.value = '';
      contentInput.value = '';
      alert('게시글이 성공적으로 작성되었습니다.');
    } else {
      alert('게시글 생성에 실패했습니다.');
    }
  })
  .catch(error => {
    console.error('게시글 생성 오류:', error);
    alert('게시글 생성 중 오류가 발생했습니다.');
  });
});
