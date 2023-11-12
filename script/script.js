import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xbaf9ff, 1);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 上部に光源を追加
const lightTop = new THREE.DirectionalLight(0xffffff, 10);
lightTop.position.set(10, 1, -2);
lightTop.castShadow = true;
scene.add(lightTop);

// 自然光を追加
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// 床を追加
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xa3e9f0 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = degreesToRadians(-90);
floor.position.y = -0.5;
floor.receiveShadow = true;
scene.add(floor);

// 3Dモデルを読み込む
const loader = new GLTFLoader();
loader.load('../assets/gltf/model.gltf', function (gltf) {
  gltf.scene.scale.set(0.3, 0.3, 0.3);
  gltf.scene.rotation.y = degreesToRadians(150);
  gltf.scene.position.y = -0.5;
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(gltf.scene);
});

// オブジェクトを描画
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
