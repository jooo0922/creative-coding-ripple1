'use strict';

export function distance(x1, y1, x2, y2) {
  // x, y는 (x2, y2)좌표와 (x1, y1) 좌표 사이의 거리인 것 같음.
  const x = x2 - x1;
  const y = y2 - y1;

  // Math.sqrt() 함수는 숫자의 제곱근을 반환함. (Square Root의 약자)
  // 좌표들 사이의 x, y거리값의 제곱을 더한 값의 제곱근을 구해서 return? 뭔가 수학공식 같은데?

  // 맞아. 직각삼각형의 빗변의 길이를 구하는 공식을 적용한거임. 여기서 좌표들 사이의 x, y거리값은 각각
  // 직각삼각형으로 치면 각각 '밑변'과 '높이'에 해당함.
  // 직각삼각형에서 (밑변² + 높이²)의 제곱근 = 빗변의 길이임. 

  // 여기서 직각삼각형의 빗변의 길이는 갑자기 왜 구하는걸까?
  // ripple.js의 getMax() 메소드에서 c1, c2, c3, c4에서 호출하는 distance의 파라미터들은
  // x, y라는 캔버스 상의 임의의 좌표지점. 그리고 브라우저의 네 개의 끝에 있는 꼭지점 좌표를 가리킴.
  // 이 네 개의 꼭지점과 좌표지점 사이의 거리를 구하려는 거임!
  // 이 거리가 직각삼각형으로 치면 빗변의 길이와 같기 때문에 빗변의 길이를 구하려고 했던거임. 
  return Math.sqrt(x * x + y * y);
}

/**
 * app.js 의 animate() 메소드에서 
 * collide(dot.x, dot.y, this.ripple.x, this.ripple.y, this.ripple.radius) 이렇게 전달해줄거임.
 * 
 * 그럼 어떻게 되겠어? 
 * 내가 클릭한 ripple의 중심점 좌표와 app.js에 있는 dots 배열안에 담긴 각각의 dot들 사이의
 * 거리값을 가져와서, 그게 현재 프레임의 this.ripple.radius값보다 작다면, true를 return하고 아니면 false를 return하겠지
 * 
 * 즉, 현재 프레임에 그려진 ripple의 범위 안에 중심좌표값이 위치한 dot들에 대해서만 true를 return하라는 뜻!
 */
export function collide(x1, y1, x2, y2, radius) {
  if (distance(x1, y1, x2, y2) <= radius) {
    return true;
  } else {
    return false;
  }
}