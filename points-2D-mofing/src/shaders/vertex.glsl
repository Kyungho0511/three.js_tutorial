attribute vec3 position;
attribute float radius;
attribute vec3 starPosition;
attribute float starRadius;
attribute vec3 squarePosition;
attribute float squareRadius;
attribute vec3 hexagonPosition;
attribute float hexagonRadius;
uniform float u_switch_01;
uniform float u_switch_02;
uniform float u_switch_03;
uniform float u_switch_04;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  vec3 toStarPosition = mix(position, starPosition, u_switch_01);
  vec3 toSquarePosition = mix(toStarPosition, squarePosition, u_switch_02);
  vec3 toHexagonPosition = mix(toSquarePosition, hexagonPosition, u_switch_03);
  vec3 loopInitPosition = mix(toHexagonPosition, position, u_switch_04);

  float toStarRadius = mix(radius, starRadius, u_switch_01);
  float toSquareRadius = mix(toStarRadius, squareRadius, u_switch_02);
  float toHexagonRadius = mix(toSquareRadius, hexagonRadius, u_switch_03);
  float loopInitRadius = mix(toHexagonRadius, radius, u_switch_04);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(loopInitPosition, 1.0);
  gl_PointSize = loopInitRadius;
}