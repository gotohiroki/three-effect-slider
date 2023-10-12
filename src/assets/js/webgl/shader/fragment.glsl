precision mediump float;

uniform vec2 u_meshSize;
uniform vec2 u_textureSize;

uniform float u_texture_switch_01;
uniform float u_texture_switch_02;
uniform float u_texture_switch_03;
uniform float u_texture_switch_04;

uniform float u_noise_switch_01;
uniform float u_noise_switch_02;
uniform float u_noise_switch_03;
uniform float u_noise_switch_04;

uniform sampler2D u_noise_texture;
uniform sampler2D u_texture_01;
uniform sampler2D u_texture_02;
uniform sampler2D u_texture_03;
uniform sampler2D u_texture_04;

varying vec2 vUv;

#define PI 3.14159265359

mat2 rotate2d(float _angle) {
  return mat2(cos(_angle), sin(_angle), sin(_angle), cos(_angle));
}

void main() {
  vec2 uv = vUv;

  vec2 ratio = vec2(
    min((u_meshSize.x / u_meshSize.y) / (u_textureSize.x / u_textureSize.y), 1.0),
    min((u_meshSize.y / u_meshSize.x) / (u_textureSize.y / u_textureSize.x), 1.0)
  );

  uv *= ratio;

  float noisePower = 0.5;
  mat2 rotate = rotate2d(PI);
  vec4 noise_texture = texture2D(u_noise_texture, uv);
  
  vec2 uv01 = uv + rotate * vec2(noise_texture.r, noise_texture.g) * u_noise_switch_01 * noisePower;
  vec2 uv02 = uv + rotate * vec2(noise_texture.r, noise_texture.g) * u_noise_switch_02 * noisePower;
  vec2 uv03 = uv + rotate * vec2(noise_texture.r, noise_texture.g) * u_noise_switch_03 * noisePower;
  vec2 uv04 = uv + rotate * vec2(noise_texture.r, noise_texture.g) * u_noise_switch_04 * noisePower;

  vec4 texture01 = texture2D(u_texture_01, uv01);
  vec4 texture02 = texture2D(u_texture_02, uv02);
  vec4 texture03 = texture2D(u_texture_03, uv03);
  vec4 texture04 = texture2D(u_texture_04, uv04);

  vec4 finalPos = texture01 * u_texture_switch_01 + texture02 * u_texture_switch_02 + texture03 * u_texture_switch_03 + texture04 * u_texture_switch_04;

  gl_FragColor = vec4(finalPos);
}