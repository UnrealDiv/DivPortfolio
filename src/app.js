
import * as THREE from 'three';
import {canvas,scene,camera,renderer,cube,clock,decahedron,octahedron,sizes,objectDistance,cameraGroup,gsap,gui} from "./settings";

const links = document.querySelectorAll(".info");
console.log(links[2].innerText);

let hY = [752,2008,1362]

links.forEach((x,i)=>{
    x.addEventListener("click",(e)=>{
        e.preventDefault(); 
        window.scrollTo({
            top: hY[i],
            behavior: 'smooth'
        });
    })
})



const textureLoader = new THREE.TextureLoader();
const star = textureLoader.load("./public/star.png");

const meshes = [cube,decahedron,octahedron];
let currentSection = 0;

let scrollY=0;
window.addEventListener("scroll",(e)=>{
     scrollY = window.scrollY;
     let newSection = Math.round(scrollY/sizes.height);
   
     if(newSection != currentSection ){
        if(newSection<3){
            currentSection = newSection;
            gsap.to(meshes[currentSection].rotation,{
                duration:1,
                ease:'power2.inOut',
                x:'+=6',
                y:'+=3'
            })
        }
     }
})

const mouse = {
    x:0,
    y:0
};

window.addEventListener("mousemove",(e)=>{
mouse.x = (e.clientX/innerWidth-0.5)*2;
mouse.y = (e.clientY/innerHeight-0.5)*2;
});






const particlesCount = 5000;
const positions = new Float32Array(particlesCount*3);

for(let i=0;i<particlesCount;i++){
    positions[i*3+0] = (Math.random()-0.5)*8;
    positions[i*3+1] = (Math.random())*-20+2;
    positions[i*3+2] = (Math.random()-0.5)*8;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));

const particlesMaterial = new THREE.PointsMaterial({
    map:star,
    sizeAttenuation:true,
    size:0.03,
    transparent:true,
    alphaTest:0.001,
    color:0xff00ff
   
});

const particles = new THREE.Points(particlesGeometry,particlesMaterial);
scene.add(particles);












let previousTime = 0;
function animate(){
    const elapsedTime = clock.getElapsedTime();
    previousTime = elapsedTime;
    camera.position.y = -scrollY/window.innerHeight * objectDistance;


    const parralaxX = mouse.x;
    const parralaxY = mouse.y;


    cameraGroup.position.x = parralaxX*0.5;
    cameraGroup.position.y = -parralaxY*0.5;



    // meshes.forEach((mesh)=>{
    //     mesh.rotation.x = elapsedTime*0.7;
    //     mesh.rotation.y = elapsedTime*0.9;
    //     mesh.rotation.z = elapsedTime*0.5;
    // });

    particles.position.x = Math.sin(elapsedTime);
    particles.position.y = Math.cos(elapsedTime);
    particles.position.z = Math.cos(elapsedTime);
    particlesGeometry.attributes.position.needsUpdate=true;

renderer.render(scene,camera);
window.requestAnimationFrame(animate);
}

animate();