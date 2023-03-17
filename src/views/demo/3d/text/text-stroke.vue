<template>
  <div id="3d"></div>
</template>

<script lang="ts">
  import * as THREE from 'three';
  import { FontLoader } from 'three/addons/loaders/FontLoader.js';
  import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  /**
   * 1. 读取字体文件分别常见网格实例和线实例
   * 2. 初始化三要素
   * 3. 设置相机观测
   * 4. 事件监听和基本优化
   */
  export default {
    data() {
      // scene不可以被重写setter
      this.scene = null;
      return {
        camera: null,
        renderer: null,
      };
    },

    mounted() {
      this.init();
    },

    methods: {
      init() {
        // 定义相机
        this.camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          1,
          10000,
        );
        this.camera.position.set(0, -400, 600);

        // 定义场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        // 辅助坐标系,红R、绿G、蓝B分别对应坐标系的x、y、z轴
        // const axesHelper = new THREE.AxesHelper(150);
        // this.scene.add(axesHelper)

        // 加载本地字体文件
        const fontLoader = new FontLoader();
        fontLoader.load('src/assets/fonts/regular.typeface.json', (font) => {
          const color = new THREE.Color(0x006699);

          const matDark = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
          });

          const matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
          });

          const message = '   Three.js\nStroke text.';
          // 根据字体定义形状
          const shapes = font.generateShapes(message, 100);
          // 根据字体文件填充生成几何体
          const geometry = new THREE.ShapeGeometry(shapes);
          geometry.computeBoundingBox();

          // x方向居中
          const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
          geometry.translate(xMid, 0, 0);

          // 根据几何体+网格实例 = 3d网格
          const text = new THREE.Mesh(geometry, matLite);
          text.position.z = -150;
          this.scene.add(text);

          const holeShapes = [];
          shapes.forEach((item) => {
            const tmpHoles = item.holes || [];
            tmpHoles.forEach((subItem) => {
              holeShapes.push(subItem);
            });
          });

          shapes.push.apply(shapes, holeShapes);
          const style = SVGLoader.getStrokeStyle(5, color.getStyle());
          const strokeText = new THREE.Group();

          // const lineText = new THREE.Object3D();

          for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];

            const points = shape.getPoints();
            // 根据点坐标确定抽象几何体形状
            // const geometry = new THREE.BufferGeometry().setFromPoints( points );
            const geometry = SVGLoader.pointsToStroke(points, style);

            geometry.translate(xMid, 0, 0);

            const strokeMesh = new THREE.Mesh(geometry, matDark);
            strokeText.add(strokeMesh);
          }

          this.scene.add(strokeText);
          this.render();
        });

        // 定义render
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // 设置设备像素比，高清适配
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // 可视区域大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // dom挂载
        document.getElementById('3d').appendChild(this.renderer.domElement);

        // 定义相机旋转轨道
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();

        // 事件优化
        controls.addEventListener('change', this.render);
        window.addEventListener('resize', this.onWindowResize);
      },

      render() {
        this.renderer.render(this.scene, this.camera);
      },

      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
      },
    },
  };
</script>

<style></style>
