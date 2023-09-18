varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

vec4 permute(vec4 x) {
    return mod(((x*34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P){
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * 
        vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main()
{
    // color 1
    vec3 color1 = vec3(vUv.x, vUv.y, 1.0);

    // color 2
    vec3 color2 = vec3(vUv.x, vUv.y, 0.0);
    
    // pattern 3
    // float v = vUv.x;

    // pattern 4
    // float v = vUv.y;

    // pattern 5
    // float v = 1.0 - vUv.y;

    // pattern 6
    // float v = vUv.y * 10.0;

    // pattern 7
    // float v = mod(vUv.y * 10.0, 1.0);

    // pattern 8
    // float v = mod(vUv.y * 10.0, 1.0);
    // v = step(0.5, v);

    // pattern 9
    // float v = mod(vUv.y * 10.0, 1.0);
    // v = step(0.8, v);

    // pattern 10
    // float v = mod(vUv.x * 10.0, 1.0);
    // v = step(0.8, v);

    // pattern 11
    float vX = mod(vUv.x * 10.0, 1.0);
    float vY = mod(vUv.y * 10.0, 1.0);
    float v = step(0.8, vX) + step(0.8, vY);

    // pattern 12
    // float vX = mod(vUv.x * 10.0, 1.0);
    // float vY = mod(vUv.y * 10.0, 1.0);
    // float v = step(0.4, vX) * step(0.8, vY);

    // pattern 13
    // float vX = mod(vUv.x * 10.0, 1.0);
    // float vY = mod(vUv.y * 10.0, 1.0);
    // float v = step(0.4, vX) * step(0.8, vY);

    // pattern 14 
    // float vX = mod(vUv.x * 10.0, 1.0);
    // float vY = mod(vUv.y * 10.0, 1.0);
    // float v = step(0.8, vX) * step(0.4, vY) + step(0.4, vX) * step(0.8, vY);

    // pattern 15
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // float bar = barX + barY;

    // pattern 16
    // float v = abs(vUv.x - 0.5);

    // pattern 17
    // float v = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // pattern 18
    // float v = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // pattern 19
    // float v = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // pattern 20
    // float v = step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // pattern 21
    // float v = floor(vUv.x * 10.0) / 10.0;

    // pattern 22
    // float v = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

    // pattern 23
    // float v = random(vUv);

    // pattern 24
    // vec2 uv = vec2(
    //     floor(vUv.x * 10.0) / 10.0, 
    //     floor(vUv.y * 10.0) / 10.0);
    // float v = random(uv);

    // pattern 25
    // vec2 uv = vec2(
    //     floor(vUv.x * 10.0) / 10.0, 
    //     floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0);
    // float v = random(uv);

    // pattern 26
    // float v = sqrt(vUv.x * vUv.x + vUv.y * vUv.y); // v = length(vUv);

    // pattern 27
    // float x = abs(vUv.x - 0.5);
    // float y = abs(vUv.y - 0.5);
    // float v = sqrt(x * x + y * y); // v = distance(vUv, vec2(0.5, 0.5));

    // pattern 28
    // float v = 1.0 - distance(vUv, vec2(0.5, 0.5));

    // pattern 29
    // float v = 0.02 / distance(vUv, vec2(0.5, 0.5)) - 0.05;

    // pattern 30
    // vec2 lightUv = vec2(vUv.x * 0.2 + 0.4, vUv.y);
    // float v = 0.02 / distance(lightUv, vec2(0.5, 0.5)) - 0.2;

    // pattern 31
    // vec2 lightUvX = vec2(vUv.x * 0.2 + 0.4, vUv.y);
    // float lightX =  0.02 / distance(lightUvX, vec2(0.5, 0.5));
    // vec2 lightUvY = vec2(vUv.y * 0.2 + 0.4, vUv.x);
    // float lightY = 0.02 / distance(lightUvY, vec2(0.5, 0.5));
    // float v = lightX * lightY - 0.02;

    // pattern 32
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // vec2 lightUvX = vec2(rotatedUv.x * 0.2 + 0.4, rotatedUv.y);
    // float lightX =  0.02 / distance(lightUvX, vec2(0.5, 0.5));
    // vec2 lightUvY = vec2(rotatedUv.y * 0.2 + 0.4, rotatedUv.x);
    // float lightY = 0.02 / distance(lightUvY, vec2(0.5, 0.5));
    // float v = lightX * lightY - 0.02;

    // pattern 33
    // float v = step(0.25, distance(vUv, vec2(0.5)));

    // pattern 34
    // float v = abs(distance(vUv, vec2(0.5)) - 0.25);

    // pattern 35
    // float v = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // pattern 36
    // float v = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // pattern 37
    // vec2 wavedUv = vec2(
    //     vUv.x, 
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float v = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // pattern 38
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1, 
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float v = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // pattern 39
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1, 
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float v = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // pattern 40
    // float v = atan(vUv.x, vUv.y);

    // pattern 41
    // float v = atan(vUv.x - 0.5, vUv.y - 0.5);

    // pattern 42
    // float v = atan(vUv.x - 0.5, vUv.y - 0.5);
    // v /= PI * 2.0;
    // v += 0.5;

    // pattern 43
    // float v = atan(vUv.x - 0.5, vUv.y - 0.5);
    // v /= PI * 2.0;
    // v += 0.5;
    // v *= 30.0;
    // v = mod(v, 1.0);

    // pattern 44
    // float v = atan(vUv.x - 0.5, vUv.y - 0.5);
    // v /= PI * 2.0;
    // v += 0.5;
    // v = sin(v * 100.0);

    // pattern 45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float sinusoid = sin(angle * 100.0);
    // float radius = 0.45 + sinusoid * 0.02;
    // float v = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // pattern 46
    // // Perlin 2D noise
    // float v = cnoise(vUv * 10.0);

    // pattern 47
    // float v = step(0.05, cnoise(vUv * 10.0));

    // pattern 48
    // float v = 1.0 - abs(cnoise(vUv * 10.0));

    // pattern 49
    // float v = sin(cnoise(vUv * 10.0) * 20.0);

    // pattern 50    
    // float v = step(0.8, sin(cnoise(vUv * 10.0) * 20.0));



    // Clamp v for RGB
    v = clamp(v, 0.0, 1.0);

    // Render: Color1 version
    vec3 blackColor = vec3(0.0);
    vec3 mixedColor = mix(blackColor, color1, v);
    gl_FragColor = vec4(mixedColor, 1.0);

    // Render: Black and White version
    // gl_FragColor = vec4(v, v, v, 1.0);

}