varying vec3 vColor;

void main()
{
  // // Point
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength = 1.0 - step(0.5, strength);

  // // Diffuse point
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength *= 2.0;
  // strength = 1.0 - strength;

  // Light point
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 5.0);

  // Final color
  vec3 mixedColor = mix(vec3(0.0), vColor, strength);

  gl_FragColor = vec4(mixedColor, 1.0);
}