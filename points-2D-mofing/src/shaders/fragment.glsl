precision mediump float;

uniform vec3 u_color;

void main() {
  vec2 temp = gl_PointCoord - vec2(0.5);
  float f = dot(temp, temp);
  if (f > 0.25 ) {
      discard;
  }
  gl_FragColor = vec4(u_color, 1.0);
}