// Imports
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

// CreateScene Function
export const createScene = (canvas) => {
  // Babylon Rendering engine
  const engine = new BABYLON.Engine(canvas, true);
  // New Babylon scene
  const scene = new BABYLON.Scene(engine);
  // Color to be used when clearing the scene
  scene.clearColor = new BABYLON.Color4(0.9, 0.3, 0.3, 1);

  // New ArcRotateCamera, Mouse Controllable
  const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(50, 20, 50), scene);
  // Increase Camera Speed
  camera.inputs.attached.pointers.panningSensibility = 100;
  // Only get inputs from the <canvas> element, allowing the user to only rotate the camera when <canvas> is clicked/in focus
  camera.attachControl(canvas, true);

  // New HemisphericLight
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 15, -15), scene);
  // Setting light intensity
  light.intensity = 0.7;

  // Basic Material
  const material = new BABYLON.StandardMaterial("material", scene);
  // Setting Material Color
  material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

  // Creating an array of Objects to create
  const sphereNameArray = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  const sphereSizeArray = [1, 1.5, 1.5, 1, 5, 4.5, 3, 3];

  // Creating an array of Objects
  let sphereObjectArray = [];

  // Temporary Variables
  let sphereObj;
  let currentPos = 10;
  const planetSpacing = 10;
  let size;

  // Loop for creating new objects
  for (let [index, sphereName] of sphereNameArray.entries()) {
    size = sphereSizeArray[index];
    console.log(size, sphereName);
    sphereObj = new BABYLON.MeshBuilder.CreateSphere(sphereName, {diameter: size}, scene);
    sphereObj.material = material;
    sphereObj.position.x = currentPos += planetSpacing;
    sphereObjectArray.push(sphereObj);
    currentPos += planetSpacing;
  }

  // Importing Models


  // GUI
  // Temporary Variables
  let advancedTexture;
  let buttonArray = [];
  let button;
  let plane;
  let sphereName;

  for (let [index, sphere] of sphereObjectArray.entries()) {
    sphereName = sphereNameArray[index];
    plane = BABYLON.MeshBuilder.CreatePlane(sphereName, {size: 10});
    plane.parent = sphere;
    plane.position.y = sphereSizeArray[index] * 3;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    button = GUI.Button.CreateSimpleButton(sphereName, sphereName)
    button.width = 1;
    button.height = 0.4;
    button.color = "white";
    button.fontSize = 200; 
    button.background = "green";
    button.onPointerUpObservable.add(function() {
        alert("you did it!");
    });
    advancedTexture.addControl(button);
    buttonArray.push(button);

  }

  // Engine Render Loop
  engine.runRenderLoop(() => {
    // Render the Scene each loop iteration
    scene.render();
  });

  // Resize the engine if the window is resized
  window.addEventListener('resize', () => {
    engine.resize();
  });

  // Return the scene object when the function is called
  return scene;
}