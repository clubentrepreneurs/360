const videoLinks = [
  "https://www.youtube.com/watch?v=lUU1G-6klpI&list=PLV8G_tL0jD2JNU3NqxIcULusdtMWeKL5k&index=1/embed/lUU1G-6klpI?autoplay=1",
  "https://www.youtube.com/embed/lUU1G-6klpI?autoplay=1",
  "https://www.youtube.com/embed/lUU1G-6klpI?autoplay=1",
  "https://www.youtube.com/embed/lUU1G-6klpI?autoplay=1",
  "https://www.youtube.com/embed/lUU1G-6klpI?autoplay=1",
  "https://www.youtube.com/embed/lUU1G-6klpI?autoplay=1",
  "https://www.youtube.com/embed/lUU1G-6klpI?autoplay=1"
];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new THREE.GLTFLoader();
let clickableIcons = [];

loader.load("assets/background.glb", (gltf) => {
  scene.add(gltf.scene);
});

const radius = 2.5;

for (let i = 0; i < 7; i++) {
  loader.load(`assets/icon${i+1}.glb`, (gltf) => {
    const model = gltf.scene;
    const angle = (i / 7) * Math.PI * 2;
    model.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    model.userData.index = i;
    clickableIcons.push(model);
    scene.add(model);
  });
}

const ambient = new THREE.AmbientLight(0xffffff, 1.5);
const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.set(1, 1, 1);
scene.add(ambient, directional);

scene.add(light);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(clickableIcons, true);
  if (intersects.length > 0) {
    const index = intersects[0].object.parent.userData.index;
    openVideo(index);
  }
});

document.querySelectorAll('.circle').forEach(c => {
  const i = parseInt(c.dataset.id);
  const angle = (i / 7) * Math.PI * 2;
  const x = 50 + Math.cos(angle) * 30;
  const y = 50 + Math.sin(angle) * 30;
  c.style.left = `${x}%`;
  c.style.top = `${y}%`;
  c.addEventListener("click", () => openVideo(i));
});

function openVideo(index) {
  document.getElementById("youtube-frame").src = videoLinks[index];
  document.getElementById("video-modal").style.display = "block";
}

document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("video-modal").style.display = "none";
  document.getElementById("youtube-frame").src = "";
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
