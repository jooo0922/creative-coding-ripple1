const PI2 = Math.PI * 2; // 360도를 라디안값으로 작성. 원을 만들겠군
const BOUNCE = 0.82 // radius가 진동하기 위한 인수

export class Dot {
  constructor(x, y, radius, pixelSize, red, green, blue) {
    this.x = x;
    this.y = y;
    this.targetRadius = radius; // app.js로부터 이 radius 값은 항상 10이 전달됨. 따라서 this.targetRadius = 10
    this.radius = 0; // 얘는 this.radius로 파라미터로 전달받는 radius랑 다름.
    this.radiusV = 0; // radius가 증가하는 속도
    this.pixelSize = pixelSize;
    this.pixelSizeHalf = pixelSize / 2;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(
      this.x - this.pixelSizeHalf,
      this.y - this.pixelSizeHalf,
      this.pixelSize, this.pixelSize
    );
    // 이렇게 하면 x, y좌표점을 중심점으로 하는 this.pixelSize * this.pixelSize 크기의 검은색 정사각형이 만들어지겠지?
    // 이 검은 정사각형이 뭐냐면 dot 하나가 들어갈 일종의 자리? 프레임? 경계선 박스? 를 마련해놓은 거라고 보면 됨.

    /**
     * 이 부분은 매 프레임마다 radius값에 변화를 줌으로써 dot이 마치 진동을 하는것처럼 움직이게 하려고 작성한 부분.
     * 
     * test-variation에서 dot하나의 움직임에 따라서 radius, accel, radiusV값이 어떻게 변하는지 코드로 구현해놓음.
     * 일단 이걸 보면서 참고하면 될 것 같고, 여기서 radius값이 어떻게 변화하는지 그래프를 확인해볼 것.
     * 
     * 지금 targetRadius = 10인데, (test-variation에서는 잘 보이도록 하려고 50으로 잡아 줌.)
     * 10을 가운데로 두고 그거보다 크게, 작게 왔다갔다 하다가 시간이 지날수록 점점 r값이 10에 정착이 됨.
     * 이런 걸 '감쇠 진동자, 감쇠 진동 그래프'라고 함. (구글 검색해볼 것)
     * 
     * BOUNCE 값은 radiusV가 너무 큰 값으로 +,-를 왔다갔다 하지 못하도록 함. 이걸 안곱해주면 radius가 -가 되는 순간이 옴.
     * 반지름이 -일 수는 없으니까 오류가 발생하겠지.
     * 
     * 또 accel에서 2를 나눠주는 이유도 2보다 작은 값으로 나눠줘버리면 그만큼 accel의 값은 커질 것이고
     * radiusV의 값도 커지기 때문에 radius의 감쇠 진동 그래프 상에서 targetRadius값만큼 이동하는 시간이 너무 빨라짐.
     * 또는 너무 작게 나눠버리면 BOUNCE를 곱하지 않았을 때와 마찬가지로 radiusV값이 너무 커져버려서 반지름이 음수가 되어버림.
     * 
     * 한 편, 2보다 큰 값으로 바꿔주게 되면 그만큼 accel, radiusV값도 작아지기 때문에, targetRadius에 도달하는 시간이
     * 오래걸리겠지. 그래서 진동하는 느낌이 잘 안들게 됨.
     * 
     * 어쨋든 이 정도까지만 이해를 하고 나중에 감쇠 진동 효과를 줘야 할 일이 있다면 이 공식을 활용할 것.
     * 더 깊게 파는것은 비효율적. 그냥 감쇠 진동자를 이해하고, 그걸 코드로 구현하려면 아래처럼 작성하면 된다고 생각할 것.
     */
    const accel = (this.targetRadius - this.radius) / 2;
    this.radiusV += accel;
    this.radiusV *= BOUNCE;
    this.radius += this.radiusV;

    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`
    ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    ctx.fill();
    // 이렇게 하면 위에 정사각형 안에 위치하는 원이 만들어지겠지
  }

  // 매번 클릭때마다 radius와 radiusV값을 다시 0으로 초기화해서 
  // 클릭할 때마다 항상 동일하게 감쇠 진동 변화값을 주려고 한 것.
  reset() {
    this.radius = 0;
    this.radiusV = 0;
  }
}