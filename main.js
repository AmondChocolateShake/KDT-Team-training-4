//객체 모듈 요청
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
//불변수 서버를 선언, 객체 http의 createServer(function(매개변수 request[아마도 요청], 매개변수 response[아마도 응답]))
const server = http.createServer(function(request, response){
  // 최초접속
  //요청 타입이 GET이고, url이 /, 이 페이지 일 경우.(폴더의 C:, html의 body 등, 여기서는 ./ 을 말한다.).)
  if(request.method === 'GET' && request.url === '/') {
    //응답에 writeHead에 http의 상태 200(status가 ok, 성공적으로 연결되어있을 경우. 대표적으로 page not found 404가 있다.), 그리고 객체로 요청받을 해당 컨텐츠의 타입을 text/html로 배정.
    response.writeHead(200, {'Content-Type': 'text/html'});
    //url이 빈칸이었을때 호출후 작성. formTag를 포함한 첫페이지를 page라는 변수로 선언
    let page = firstPage(formTag);
    //page라는 변수에 위의 html 형식 문자열을 작성하며 그 안에 formTag를 작성.
    response.write(page);
    //종료시킴
    response.end();
  }
  // 무언가
  //
  if(request.method === 'GET' && request.url.startsWith('/login')) {
    //startsWith('/login'), 주어진 문자열이 해당 문자열로 시작할 경우 true, 그이외 false
    console.log(request.url);
    //url에서 =을 구분선의 기준으로 쓰고, 해당 문자열에서 두번째를 name에 넣는다.
    const name = request.url.split('=')[1];
    console.log(name);
    //Head 작성 및 바로 네트워크 채널에 바로 설정. 설정값으로 status가 200, ok 일 경우, 응답 할 데이터 타입을 text/html로 설정한다.
    response.writeHead(200, {'Content-Type': 'text/html'});
    //first page 내 body에 name의 텍스트컨텐츠를 가진 h1태그를 삽입한 문자열을 변수 page에 저장.
    let page = firstPage(greet(name))
    //page를 해당 응답 객체의 컨텐츠부분으로 기입.
    response.write(page);
    //응답을 종료한다. 
    response.end();
  }
});
// 서버 포트 설정
//localhost의 경우, 포트가 2080으로 설정되어 있다
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});