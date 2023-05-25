const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;
const path = require('path');

app.use(express.json());

// MariaDB 연결
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0614',
    database: 'test_db'
  });

let posts = [];

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// 게시글 목록 조회
app.get('/posts', (req, res) => {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('게시글 조회 오류:', err);
        return res.status(500).json({ success: false, error: '게시글 조회 오류' });
      }
  
      res.json({ success: true, posts: results });
    });
  });
  
  // index.html 파일 라우팅
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
  });

// 게시글 생성
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
  
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    connection.query(query, [title, content], (err, result) => {
      if (err) {
        console.error('게시글 생성 오류:', err);
        return res.json({ success: false, error: '게시글 생성 오류' });
      }
  
      res.json({ success: true });
    });
  });
  

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
