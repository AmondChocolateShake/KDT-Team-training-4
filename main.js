const http = require('http');
const formTag = `
<form method="GET" action="/login">
<input type="text" name="id">
<input type="submit">
</form>
`;
function greet(fromSubmitString) {
return `<h1>${fromSubmitString}</h1>`;
} 
function firstPage(data) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
${data}
</body>
</html>
`;
}

const server = http.createServer(function(request, response){
// http.createServer() -> 컴퓨터를 http 서버로 전환 , http 서버 객체를 생성
// http server 객체는 요청이 있을 때마다 컴퓨터의 포트를 수신하고 함수를 실행

//http 요청메소드 === get 은 지정된 리소스의 표현을 요청
if(request.method === 'GET' && request.url === '/')// '/' path 경로 
{
response.writeHead(200, {'Content-Type': 'text/html'});
//writeHead(상태코드, 헤더정보) ->응답 헤더에 대한 정보를 기록
//200 = 상태코드, text/html 응답의 콘텐츠 형식이 html
let page = firstPage(formTag);
response.write(page); // page 를 보여준다.
response.end(); //끝냄
}

if(request.method === 'GET' && request.url.startsWith('/login'))
//startsWith() 문자열이 특정 문자로 시작하는지 확인하여 결과를 true, false로 반환
//  const 5조  = "지은이와 친구들" console.log(5조.startsWith('지은')); -> true
{
console.log(request.url);
const name = request.url.split('=')[1];
//split('=') =기준으로 [0],[1]
console.log(name);
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(greet(name))
response.write(page);

response.end();
}
});
// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});