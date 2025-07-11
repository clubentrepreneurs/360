const scene = new THREE.Scene();

// Caméra centrée
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

// Rendu sur le canvas
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lumières
const ambient = new THREE.AmbientLight(0xffffff, 1.5);
const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.set(2, 2, 5);
scene.add(ambient, directional);

// Chargement du modèle
const loader = new THREE.GLTFLoader();
loader.load("background.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(1, 1, 1); // Ajustable
  scene.add(model);
}, undefined, (error) => {
  console.error("Erreur de chargement du modèle :", error);
});

// Ajustement au redimensionnement
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Boucle de rendu
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
