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
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);


  // Making Models
  const planetSphere = BABYLON.MeshBuilder.CreateSphere('planet', {diameter: 100});
  planetSphere.rotate(BABYLON.Vector3.Right(), Math.PI);

  // Materials
  const planetMaterial = new BABYLON.StandardMaterial('planetMat', scene);

  planetMaterial.emissiveTexture = new BABYLON.Texture('../../textures/2k_mercury.jpg', scene);

  planetSphere.material = planetMaterial;


  // New ArcRotateCamera, Mouse Controllable
  const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 50, new BABYLON.Vector3(50, 20, 50), scene);
  // Set Camera Target to the planet
  camera.setTarget(planetSphere);
  // Increase Camera Speed
  camera.inputs.attached.pointers.panningSensibility = 100;
  // Only get inputs from the <canvas> element, allowing the user to only rotate the camera when <canvas> is clicked/in focus
  camera.attachControl(canvas, true);


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