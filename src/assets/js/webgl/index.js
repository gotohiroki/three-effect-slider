import {} from "three";
import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stage from "./stage";
import Mesh  from './mesh';

export default class webGL {
  // コンストラクタ
  constructor() {
    const stage = new Stage("#webgl");
    stage.init();

    const mesh = new Mesh(stage);
    mesh.init();

    window.addEventListener('resize', () => {
      stage.onResize();
      mesh.onResize();
    });

    const _update = () => {
      window.requestAnimationFrame(() => {
        _update();

        stage.onUpdate();
        mesh.onUpdate();
      });
    };

    _update();

    this.currentNum = 0;

    const _moveChangeSlide = () => {
      if(this.currentNum > 2) {
        this.currentNum = 0;
      } else {
        this.currentNum++;
      }
    };

    const _autoChangeSlide = () => {
      gsap.to({},{
        ease: "none",
        duration: 3.0,
        repeat: -1.0
      }).eventCallback('onRepeat', () => {
        mesh._changeSlide(this.currentNum);
        _moveChangeSlide();
      });
    };

    window.addEventListener('load', () => {
      _autoChangeSlide();
    });
  }
}
