uniform float uSize;
uniform float uTime;

attribute float aRandom;
attribute vec3 aRandomPosition;

varying vec3 vColor;

void main()
{
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float angle = atan(modelPosition.x, modelPosition.z); // spin
  float distanceToCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
  angle += angleOffset;
  modelPosition.x = cos(angle) * distanceToCenter;
  modelPosition.z = sin(angle) * distanceToCenter;

  modelPosition.x += aRandomPosition.x; // random position
  modelPosition.y += aRandomPosition.y;
  modelPosition.z += aRandomPosition.z;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  // Size
  gl_PointSize = uSize * aRandom;
  gl_PointSize *= (1.0 / - viewPosition.z ); // size attenuation

  // Varying
  vColor = color;
}