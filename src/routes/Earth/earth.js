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

  // Importing Models
  BABYLON.SceneLoader.ImportMeshAsync('Earth', '../../models/Earth.blend')

  // New ArcRotateCamera, Mouse Controllable
  const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(50, 20, 50), scene);
  // Set Camera Target to the planet
  camera.setTarget(earthSphere);
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