import './style.css';
import { MathUtils } from 'three';
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { InteractionManager } from 'three.interactive';
import ProjectsList from './ProjectsList.js';


//Scene Configuration
const scene = new THREE.Scene();  

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  // antialias: true,
});
renderer.render( scene, camera);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth -10 , window.innerHeight - 10);
// renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(120);
camera.position.setY(70);
camera.position.setX(0);

//Interaction Instace of InteractionManager Object
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement);

//Lighting Configuration

const pointLight = new THREE.PointLight(0xffffff);
const light = new THREE.AmbientLight( 0xffffff )
const lightHelper = new THREE.PointLightHelper(light);
const gridHelper = new THREE.GridHelper(200, 50);
pointLight.position.set(5, 10, 5);
scene.add(lightHelper, light, pointLight);


//Controls camera
const controls = new OrbitControls(camera, renderer.domElement);

//BackgroundLoader

const waterTexture = new THREE.TextureLoader().load('1.jpg');
scene.background = waterTexture;

//Grabbing needed elements for menu
const projects = document.getElementById('projects');
const aboutme = document.getElementById('aboutme');
const contact = document.getElementById('contact');
// FONT LOADER
const fontloader = new FontLoader();

//Bad Name loads font and creates text
const loadFont = (text, x,y,z) => {

  const font = fontloader.load('./fonts/boron.json', function (font){
  const geometry = new TextGeometry(text, {
    font: font,
    size: 15,
    height: 1,
    curveSegments: 12,

  })

  const mesh = new THREE.Mesh(geometry, [
      new THREE.MeshPhongMaterial({color: 'purple'}),
      new THREE.MeshPhongMaterial({color: 'rgba(250,44,596)'})
    ])
  mesh.castShadow = true;
  mesh.position.set(x,y,z);
  interactionManager.add(mesh);
  mesh.addEventListener('click', (event) => {
    console.log(mesh);
    let projects = false;
    switch(text) {
    case 'Projects':
      if (projects == false) {
          createAndDisplayProjects(true);
          let projects = true;
      } else {
          createAndDisplayProjects(false);
          let projects = true;
      }
     
      break;
    case 'About':
      if (aboutme.style.display  == 'none') {
          aboutme.style.display  = "flex";
      } else  {
          aboutme.style.display = 'none';
      }
      break;
    case 'Contact':
         if (contact.style.display  == 'none') {
          contact.style.display  = "flex";
      } else  {
          contact.style.display = 'none';
      }
      break;
    }
  });
  scene.add(mesh);


})

}


loadFont('Derriel Collins Full-Stack Developer', -125, 50, 0);

loadFont('Projects', 50, 0, -50);

loadFont('About', -90, -20, -50);

loadFont('Contact', -26, -85, -75);


//plane for scroll up sign
const video = document.getElementById( 'video' );
const scrolluptexture = new THREE.VideoTexture( video );
const planeGeo = new THREE.PlaneGeometry(15,15);
const planeMaterial = new THREE.MeshBasicMaterial( {map:scrolluptexture});

const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.position.set(0, 40, 90);
plane.rotation.x = -.5;
scene.add( plane );



const createAndDisplayProjects = (show) => {

  ProjectsList.projects.map((project)=>{

  let projectTextureOne = new THREE.TextureLoader().load(project.imgUrl);
  let projectMaterial = new THREE.MeshBasicMaterial({map: projectTextureOne})
  let projectMesh = new THREE.Mesh(planeGeo, projectMaterial);
  
  projectMesh.rotation.x = -.5;

 

  interactionManager.add(projectMesh);
   projectMesh.addEventListener('click', (event) => {
    switch (project.id) {
    case 1:
    projectMesh.position.set(0, 25, 0);
    projectMesh.scale.set(5,5);
    setTimeout(()=>{
      projectMesh.position.set(50, 0, -50);
      projectMesh.scale.set(1,1);
    }, 3000)
   break;
   case 2:
    projectMesh.position.set(0, 25, 0);
    projectMesh.scale.set(5,5);
    setTimeout(()=>{
      projectMesh.position.set(50, 0, -20);
      projectMesh.scale.set(1,1);
    }, 3000)
   break;
   case 3:
    projectMesh.position.set(0, 25, 0);
    projectMesh.scale.set(5,5);
    setTimeout(()=>{
      projectMesh.position.set(50, 0, 0);
      projectMesh.scale.set(1,1);
    }, 3000)
   break;
   case 4:
    projectMesh.position.set(0, 25, 0);
    projectMesh.scale.set(5,5);
    setTimeout(()=>{
      projectMesh.position.set(50, 0, 25);
      projectMesh.scale.set(1,1);
    }, 3000)
   break;

  }
   
  });
 
  if (show === false) {

  } else {
  switch (project.id) {
    case 1:
    projectMesh.position.set(50, 0, -50);
    scene.add(projectMesh);
   break;
   case 2:
    projectMesh.position.set(50, 0, -20);
    scene.add(projectMesh);
   break;
   case 3:
    projectMesh.position.set(50, 0, 0);
    scene.add(projectMesh);
   break;
   case 4:
    projectMesh.position.set(50, 0, 25);
    scene.add(projectMesh);
   break;

  }
  }



})

}


//Purple ring 
const geometry = new THREE.TorusGeometry( 10, 1, 32, 85);
const material = new THREE.MeshStandardMaterial( {color: 'purple'});
const torus = new THREE.Mesh( geometry, material);
scene.add(torus);

//WATER PLANET LOADER
const waterPlanetTexture = new THREE.TextureLoader().load('3.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.png');

const waterPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: waterPlanetTexture,
    normalMap: normalTexture
  })
  );
scene.add(waterPlanet);


//Add alot of fish
// function addFish() {

 
//   const textureLoader = new THREE.TextureLoader();
//   const texture = new THREE.TextureLoader().load( "fish.jpg" );
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set( 1, 1, 2 );
//   const bigFishLoader = new GLTFLoader();
//   bigFishLoader.load('fish.glb', (gltf)=> {
//   const bigFish = gltf.scene;
//   bigFish.scale.set(10,10,10)
//   bigFish.traverse( function ( child ) {
//     //get the meshes
//     if ( child.isMesh ) {
//       // only replace texture if a texture map exist
//       if (child.material.map){
//       //replace the map with another THREE texture
//       child.material.map = texture;
//       //update
//       child.material.map.needsUpdate = true;
//       }
//     }
//   }
//    )
//   const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(120));
//   bigFish.position.set(x, y, z);
//   scene.add(bigFish);
      

// })
  
// }



// Array(100).fill().forEach(addFish);
// function onDocumentMouseMove(event) {

//     var mouse = new THREE.Vector2();
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//     var raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, camera );
//     var intersects = raycaster.intersectObjects( planes );

//     if(intersects.length > 0) {
//         $('html,body').css('cursor', 'pointer');
//     } else {
//         $('html,body').css('cursor', 'default');
//     }

// }


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01
}



function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.03;
  // torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  waterPlanet.rotation.y +=0.03;

  
  
   

document.body.onscroll = moveCamera;
  // controls.update();
  scrolluptexture.needsUpdate = true;

  renderer.render( scene, camera);
  interactionManager.update();
}

animate();


const fov = 50;
const planeAspectRatio = 16 / 9;

window.addEventListener('resize', () => { 
  camera.aspect = window.innerWidth / window.innerHeight;
  
if (camera.aspect > planeAspectRatio) {
    // window too large
    camera.fov = fov;
  } else {
    // window too narrow
    const cameraHeight = Math.tan(MathUtils.degToRad(fov / 2));
    const ratio = camera.aspect / planeAspectRatio;
    const newCameraHeight = cameraHeight / ratio;
    camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
  }
})

// window.addEventListener('mousemove', onDocumentMouseMove);
