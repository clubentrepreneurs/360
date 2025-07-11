// Assure-toi que three.module.js est bien disponible à la racine ou indique le bon chemin !
import * as THREE from 'three';
import { GLTFLoader } from './GLTFLoader.js';
import { OrbitControls } from './OrbitControls.js';

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const loader = new GLTFLoader();
loader.load('background.glb', (gltf) => {
  gltf.scene.position.set(0, 0, 0);
  scene.add(gltf.scene);
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
