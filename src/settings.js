import * as THREE from 'three';
import gsap from 'gsap';

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

const colors={
    material:0xffffff,
    light:0xffffff
};



const canvas = document.querySelector(".draw");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,2000);
const renderer = new THREE.WebGLRenderer({canvas,alpha:true});
renderer.setSize(sizes.width,sizes.height);
scene.add(camera);


const material = new THREE.MeshToonMaterial({color:0xffffff});


window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    if (window.innerWidth < 768) {
        // For small screens
        camera.position.set(0, 0, 5); 
        cube.scale.set(0.5, 0.5, 0.5); 
        decahedron.scale.set(0.5, 0.5, 0.5); 
        octahedron.scale.set(0.5, 0.5, 0.5);
        octahedron.position.set(0, -objectDistance * 2, 0); 
    } else {
        // For larger screens
        camera.position.set(0, 0, 3); 
        cube.scale.set(1, 1, 1);
        decahedron.scale.set(1, 1, 1); 
        octahedron.scale.set(1, 1, 1);
        octahedron.position.set(2, -objectDistance * 2, 0); 
    }


    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width,sizes.height);
});


const cameraGroup = new THREE.Group();
cameraGroup.add(camera);
scene.add(cameraGroup);
camera.position.set(0,0,3);

const clock = new THREE.Clock();

const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshToonMaterial({color:colors.material,wireframe:false}));
const decahedronGeometry = new THREE.DodecahedronGeometry( 1, 3 );
const decahedron = new THREE.Mesh(decahedronGeometry,material);
const octahedronGeometry = new THREE.OctahedronGeometry( 1 );
const octahedron = new THREE.Mesh(octahedronGeometry,material);

scene.add(cube,decahedron,octahedron);





const objectDistance = 5;


cube.position.set(2,-objectDistance*0,0);
decahedron.position.set(-2,-objectDistance*1,0);
octahedron.position.set(2,-objectDistance*2,0);
octahedron.material.wireframe=false;


const directionalLight = new THREE.DirectionalLight("#00ffff",3.0);
directionalLight.position.set(1,5,0);
scene.add(directionalLight);
const directionalLight2 = new THREE.DirectionalLight("#5356FF",2);
directionalLight2.position.set(-1,5,0);
scene.add(directionalLight2);




export {canvas,scene,camera,renderer,cube,clock,decahedron,octahedron,sizes,objectDistance,cameraGroup,gsap}