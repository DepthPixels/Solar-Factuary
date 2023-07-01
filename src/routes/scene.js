// Imports
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

// CreateScene Function
export const createScene = async function(canvas) {
  // Babylon Rendering engine
  const engine = new BABYLON.Engine(canvas, true);
  // New Babylon scene
  const scene = new BABYLON.Scene(engine);

  // New ArcRotateCamera, Mouse Controllable
  const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(50, 20, 50), scene);
  // Increase Camera Speed
  camera.inputs.attached.pointers.panningSensibility = 10;
  // Only get inputs from the <canvas> element, allowing the user to only rotate the camera when <canvas> is clicked/in focus
  camera.attachControl(canvas, true);
  camera.maxZ = 15000

  // New HemisphericLight
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 15, -15), scene);
  // Setting light intensity
  light.intensity = 0.7;

  // Skybox
  let extensions = ['_pz.png', '_nz.png', '_px.png', '_nx.png', '_py.png', '_ny.png']
  let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:10000}, scene);
	let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../../textures/skybox/", scene, extensions);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	


  // Creating an array of Objects to create
  const sphereNameArray = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  const sphereSizeArray = [100, 10, 15, 15, 10, 50, 45, 30, 30];

  // Creating an array of Objects
  let sphereObjectArray = [];

  // Temporary Variables
  let sphereObj;
  let currentPos = 0;
  const planetSpacing = 80;
  let size;
  let material;

  // Loop for creating new objects
  for (let [index, sphereName] of sphereNameArray.entries()) {
    size = sphereSizeArray[index];
    console.log(size, sphereName);
    sphereObj = new BABYLON.MeshBuilder.CreateSphere(sphereName, {diameter: size}, scene);
    
    material = new BABYLON.StandardMaterial(sphereName + 'Mat', scene);
    
    material.emissiveTexture = new BABYLON.Texture(`../../textures/2k_${sphereName}.jpg`, scene);
    material.diffuseTexture = new BABYLON.Texture(`../../textures/2k_${sphereName}.jpg`, scene);

    sphereObj.material = material;
    sphereObj.position.x = currentPos += planetSpacing;
    sphereObj.rotate(BABYLON.Vector3.Right(), Math.PI);
    sphereObjectArray.push(sphereObj);
    currentPos += planetSpacing;
  }

  
  // GUI
  // Temporary Variables
  let advancedTexture;
  let buttonArray = [];
  let button;
  let plane;
  let sphereName;

  for (let [index, sphere] of sphereObjectArray.entries()) {
    sphereName = sphereNameArray[index];
    plane = BABYLON.MeshBuilder.CreatePlane(sphereName, {size: 80});
    plane.parent = sphere;
    plane.position.y = 80;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    button = GUI.Button.CreateSimpleButton(sphereName, sphereName.charAt(0).toUpperCase() + sphereName.slice(1));
    button.width = 1;
    button.height = 0.4;
    button.color = "white";
    button.fontSize = 100;
    advancedTexture.addControl(button);
    buttonArray.push(button);
  }

  for (let [index, button] of buttonArray.entries()) {
    button.onPointerUpObservable.add(function() {
      location.assign(`./${sphereNameArray[index]}`);
  });
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