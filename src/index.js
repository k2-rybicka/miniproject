import * as THREE from "three";
import * as Tone from "tone";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";

let scene, camera, renderer;
let colour, intensity, light;
let ambientLight;

let selected;

let farewell, greeting, phraseSet;

let orbit;
let loader = new THREE.TextureLoader();

let sceneHeight, sceneWidth;

let clock, delta, interval;

let geometry, material;
let gb, spain, click;
let hello, listener, audioLoader, hola, goodbye, adios, hallo, auf;
let germany, france, bonjour, aurevoir, japan, konnichiwa, sayonara;
let norway, goddag, hadetbra;

//let size = 40;
//let divisions = 40;
//let gridHelper = new THREE.GridHelper(size, divisions);

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);

function init() {
  let overlay = document.getElementById("overlay");
  overlay.remove();
  Tone.start();

  clock = new THREE.Clock();
  delta = 0;
  interval = 1 / 25;

  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#d1b8db");

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;
  camera.position.x = 0;
  camera.position.y = 0;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = true;
  orbit.enableRotate = true;

  colour = 0xffffff;
  intensity = 1;
  light = new THREE.DirectionalLight(colour, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambientLight);

  listener = new THREE.AudioListener();
  camera.add(listener);
  hello = new THREE.PositionalAudio(listener);
  hola = new THREE.PositionalAudio(listener);
  goodbye = new THREE.PositionalAudio(listener);
  adios = new THREE.PositionalAudio(listener);
  hallo = new THREE.PositionalAudio(listener);
  auf = new THREE.PositionalAudio(listener);
  bonjour = new THREE.PositionalAudio(listener);
  aurevoir = new THREE.PositionalAudio(listener);
  konnichiwa = new THREE.PositionalAudio(listener);
  sayonara = new THREE.PositionalAudio(listener);
  goddag = new THREE.PositionalAudio(listener);
  hadetbra = new THREE.PositionalAudio(listener);

  audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/hello.mp3", function (buffer) {
    hello.setBuffer(buffer);
    hello.setRefDistance(10);
    hello.setLoop(false);
    hello.setVolume(1);
    hello.duration = 1;
  });
  audioLoader.load("./sounds/hola.wav", function (buffer) {
    hola.setBuffer(buffer);
    hola.setRefDistance(10);
    hola.setLoop(false);
    hola.setVolume(1);
    hola.duration = 1;
  });
  audioLoader.load("./sounds/goodbye.wav", function (buffer) {
    goodbye.setBuffer(buffer);
    goodbye.setRefDistance(10);
    goodbye.setLoop(false);
    goodbye.setVolume(1);
    goodbye.duration = 1;
  });
  audioLoader.load("./sounds/adios.mp3", function (buffer) {
    adios.setBuffer(buffer);
    adios.setRefDistance(10);
    adios.setLoop(false);
    adios.setVolume(1);
    adios.duration = 1;
  });
  audioLoader.load("./sounds/hallo.mp3", function (buffer) {
    hallo.setBuffer(buffer);
    hallo.setRefDistance(10);
    hallo.setLoop(false);
    hallo.setVolume(1);
    hallo.duration = 1;
  });
  audioLoader.load("./sounds/aufwiedersehen.mp3", function (buffer) {
    auf.setBuffer(buffer);
    auf.setRefDistance(10);
    auf.setLoop(false);
    auf.setVolume(1);
    auf.duration = 1;
  });
  audioLoader.load("./sounds/bonjour.mp3", function (buffer) {
    bonjour.setBuffer(buffer);
    bonjour.setRefDistance(10);
    bonjour.setLoop(false);
    bonjour.setVolume(1);
    bonjour.duration = 1;
  });
  audioLoader.load("./sounds/aurevoir.mp3", function (buffer) {
    aurevoir.setBuffer(buffer);
    aurevoir.setRefDistance(10);
    aurevoir.setLoop(false);
    aurevoir.setVolume(1);
    aurevoir.duration = 1;
  });
  audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/konnichiwa.mp3", function (buffer) {
    konnichiwa.setBuffer(buffer);
    konnichiwa.setRefDistance(10);
    konnichiwa.setLoop(false);
    konnichiwa.setVolume(1);
    konnichiwa.duration = 1;
  });
  audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/sayonara.mp3", function (buffer) {
    sayonara.setBuffer(buffer);
    sayonara.setRefDistance(10);
    sayonara.setLoop(false);
    sayonara.setVolume(1);
    sayonara.duration = 1;
  });
  audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/goddag.mp3", function (buffer) {
    goddag.setBuffer(buffer);
    goddag.setRefDistance(10);
    goddag.setLoop(false);
    goddag.setVolume(1);
    goddag.duration = 1;
  });
  audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/hadetbra.mp3", function (buffer) {
    hadetbra.setBuffer(buffer);
    hadetbra.setRefDistance(10);
    hadetbra.setLoop(false);
    hadetbra.setVolume(1);
    hadetbra.duration = 1;
  });

  geometry = new THREE.BoxBufferGeometry(4, 1, 1);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/click.png")
  });
  click = new THREE.Mesh(geometry, material);
  click.position.set(0, 6, 0);

  geometry = new THREE.BoxBufferGeometry(4, 1, 1);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/greetings.png")
  });
  greeting = new THREE.Mesh(geometry, material);
  greeting.position.set(-3, 4, 0);

  geometry = new THREE.BoxBufferGeometry(4, 1, 1);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/farewells.png")
  });
  farewell = new THREE.Mesh(geometry, material);
  farewell.position.set(3, 4, 0);

  geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/gb.png")
  });
  gb = new THREE.Mesh(geometry, material);

  geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/spain.png")
  });
  spain = new THREE.Mesh(geometry, material);
  spain.position.set(4, 0, 0);

  geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/germany.png")
  });
  germany = new THREE.Mesh(geometry, material);
  germany.position.set(-4, 0, 0);

  geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/france.png")
  });
  france = new THREE.Mesh(geometry, material);
  france.position.set(0, -4, 0);

  geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/japan.png")
  });
  japan = new THREE.Mesh(geometry, material);
  japan.position.set(-4, -4, 0);

  geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({
    map: loader.load("textures/norway.png")
  });
  norway = new THREE.Mesh(geometry, material);
  norway.position.set(4, -4, 0);

  scene.add(
    click,
    greeting,
    farewell,
    gb,
    spain,
    germany,
    france,
    japan,
    norway
  );

  gb.add(hello);
  gb.add(goodbye);
  spain.add(hola);
  spain.add(adios);
  germany.add(hallo);
  germany.add(auf);
  france.add(bonjour);
  france.add(aurevoir);
  japan.add(konnichiwa);
  japan.add(sayonara);
  norway.add(goddag);
  norway.add(hadetbra);

  //scene.add(gridHelper);

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let objects = [greeting, farewell, gb, spain, germany, france, japan, norway];
  let intersects = [];

  renderer.domElement.addEventListener("click", onClick);

  function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      selected = intersects[0].object;

      if (selected === farewell) {
        phraseSet = "farewells";
        farewell.material.color.setHex(0x6a0dad);
        greeting.material.color.setHex(0xffffff);
      } else if (selected === greeting) {
        phraseSet = "greetings";
        greeting.material.color.setHex(0x6a0dad);
        farewell.material.color.setHex(0xffffff);
      }

      if (phraseSet === "greetings") {
        if (selected === gb) {
          hello.play();
        } else if (selected === spain) {
          hola.play();
        } else if (selected === germany) {
          hallo.play();
        } else if (selected === france) {
          bonjour.play();
        } else if (selected === japan) {
          konnichiwa.play();
        } else if (selected === norway) {
          goddag.play();
        }
      } else if (phraseSet === "farewells") {
        if (selected === gb) {
          goodbye.play();
        } else if (selected === spain) {
          adios.play();
        } else if (selected === germany) {
          auf.play();
        } else if (selected === france) {
          aurevoir.play();
        } else if (selected === japan) {
          sayonara.play();
        } else if (selected === norway) {
          hadetbra.play();
        }
      }
    }
  }

  window.addEventListener("resize", onWindowResize, false);
  play();
}

//function stop() {
//  renderer.setAnimationLoop(null);
//}

function render() {
  renderer.render(scene, camera);
}

function play() {
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function update() {
  orbit.update();
  gb.rotation.y += 0.01;
  spain.rotation.y += 0.01;
  germany.rotation.y += 0.01;
  france.rotation.y += 0.01;
  japan.rotation.y += 0.01;
  norway.rotation.y += 0.01;
  delta += clock.getDelta();
  if (delta > interval) {
    delta = delta % interval;
  }
}

function onWindowResize() {
  sceneHeight = window.innerHeight;
  sceneWidth = window.innerWidth;
  renderer.setSize(sceneWidth, sceneHeight);
  camera.aspect = sceneWidth / sceneHeight;
  camera.updateProjectionMatrix();
}
