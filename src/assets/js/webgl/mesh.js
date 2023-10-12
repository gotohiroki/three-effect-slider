import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";

export default class Mesh {
  constructor(stage) {

    this.stage = stage;

    this.mesh = null;

    this.duration = 0.9;
    this.ease = "power1.out";

    this.geometryParam = {
      width: 1.0,
      height: 1.0,
      widthSegments: 1.0,
      heightSegments: 1.0
    };
    
    this.materialParam = {
      useWireframe: false
    };

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.naturalSize = {
      x: 1728,
      y: 1064
    };

    this.images = [
      "assets/img/sample-01.webp",
      "assets/img/sample-02.webp",
      "assets/img/sample-03.webp",
      "assets/img/sample-04.webp"
    ];

    this.noiseImage = "assets/img/noise.webp";

    this.uniforms = {
      u_noise_texture: {
        type: 't',
        value: new THREE.TextureLoader().load(this.noiseImage),
      },
      u_texture_01: {
        type: 't',
        value: new THREE.TextureLoader().load(this.images[0]),
      },
      u_texture_02: {
        type: 't',
        value: new THREE.TextureLoader().load(this.images[1]),
      },
      u_texture_03: {
        type: 't',
        value: new THREE.TextureLoader().load(this.images[2]),
      },
      u_texture_04: {
        type: 't',
        value: new THREE.TextureLoader().load(this.images[3]),
      },
      u_noise_switch_01: {
        type: 'f',
        value: 0.0
      },
      u_noise_switch_02: {
        type: 'f',
        value: 0.0
      },
      u_noise_switch_03: {
        type: 'f',
        value: 0.0
      },
      u_noise_switch_04: {
        type: 'f',
        value: 0.0
      },
      u_texture_switch_01: {
        type: "f",
        value: 1.0
      },
      u_texture_switch_02: {
        type: "f",
        value: 0.0
      },
      u_texture_switch_03: {
        type: "f",
        value: 0.0
      },
      u_texture_switch_04: {
        type: "f",
        value: 0.0
      },
      u_meshSize: {
        type: "v2",
        value: {
          x: this.width,
          y: this.height
        }
      },
      u_textureSize: {
        type: "v2",
        value: {
          x: this.naturalSize.x,
          y: this.naturalSize.y
        }
      },
    };
  }

  init() {
    this._setMesh();
    this._setMeshScale();
  }

  _setMesh() {
    const geometry = new THREE.PlaneGeometry(
      this.geometryParam.width,
      this.geometryParam.height,
      this.geometryParam.widthSegments,
      this.geometryParam.heightSegments
    );

    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      wireframe: this.materialParam.useWireframe,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.stage.scene.add(this.mesh);
  }

  _setMeshScale() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.mesh.scale.x = this.width;
    this.mesh.scale.y = this.height;

    this.uniforms.u_meshSize.value.x = this.mesh.scale.x;
    this.uniforms.u_meshSize.value.y = this.mesh.scale.y;
  }

  onResize() {
    this._setMeshScale();
  }

  _setNoise(number) {
    switch(number) {
      case 0:
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_01, {
            value: 0.0
          }, {
            duration: this.duration,
            ease: this.ease,
            value: 1.0
          });
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_02, {
          value: -1.0,
        }, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        break;
      case 1:
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_02, {
            value: 0.0,
          }, {
            duration: this.duration,
            ease: this.ease,
            value: 1.0
          });
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_03, {
          value: -1.0
        }, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        break;
      case 2:
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_03, {
          value: 0.0
        }, {
          duration: this.duration,
          ease: this.ease,
          value: 1.0
        });
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_04, {
          value: -1.0,
        }, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        break;
      case 3:
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_04, {
          value: 0.0,
        }, {
          duration: this.duration,
          ease: this.ease,
          value: 1.0
        });
        gsap.fromTo(this.mesh.material.uniforms.u_noise_switch_01, {
          value: -1.0,
        }, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        break;
    }
  }

  _changeSlide(number) {
    this._setNoise(number);

    switch(number) {
      case 0:
        gsap.to(this.mesh.material.uniforms.u_texture_switch_01, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        gsap.to(this.mesh.material.uniforms.u_texture_switch_02, {
          duration: this.duration,
          ease: this.ease,
          value: 1.0,
        });
        break;
      case 1:
        gsap.to(this.mesh.material.uniforms.u_texture_switch_02, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        gsap.to(this.mesh.material.uniforms.u_texture_switch_03, {
          duration: this.duration,
          ease: this.ease,
          value: 1.0
        });
        break;
      case 2:
        gsap.to(this.mesh.material.uniforms.u_texture_switch_03, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        gsap.to(this.mesh.material.uniforms.u_texture_switch_04, {
          duration: this.duration,
          ease: this.ease,
          value: 1.0
        });
        break;
      case 3:
        gsap.to(this.mesh.material.uniforms.u_texture_switch_04, {
          duration: this.duration,
          ease: this.ease,
          value: 0.0
        });
        gsap.to(this.mesh.material.uniforms.u_texture_switch_01, {
          duration: this.duration,
          ease: this.ease,
          value: 1.0
        });
        break;
    }
  }

  _render() {

  }

  onUpdate() {
    this._render();
  }


}