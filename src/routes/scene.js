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
  const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, new BABYLON.Vector3(500, 0, 500), scene);
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
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox/", scene, extensions);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	


  // Creating an array of Objects to create
  const sphereNameArray = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  const sphereSizeArray = [150, 10, 15, 15, 10, 50, 45, 30, 30];

  // Creating an array of Objects
  let sphereObjectArray = [];

  // Temporary Variables
  let sphereObj;
  let currentPos = 0;
  const planetSpacing = 100;
  let size;
  let material;

  // Loop for creating new objects
  for (let [index, sphereName] of sphereNameArray.entries()) {
    size = sphereSizeArray[index];
    console.log(size, sphereName);
    sphereObj = new BABYLON.MeshBuilder.CreateSphere(sphereName, {diameter: size}, scene);
    
    material = new BABYLON.StandardMaterial(sphereName + 'Mat', scene);
    
    material.emissiveTexture = new BABYLON.Texture(`./textures/2k_${sphereName}.jpg`, scene);
    material.diffuseTexture = new BABYLON.Texture(`./textures/2k_${sphereName}.jpg`, scene);

    sphereObj.material = material;
    sphereObj.position.x = currentPos += planetSpacing;
    sphereObj.rotate(BABYLON.Vector3.Right(), Math.PI);
    sphereObjectArray.push(sphereObj);
    currentPos += planetSpacing;
  }

  
  // GUI
  // Temporary Variables
  let setupButtons = () => {
    let advancedTexture;
    let buttonArray = [];
    let button;
    let plane;
    let sphereName;

    for (let [index, sphere] of sphereObjectArray.entries()) {
      sphereName = sphereNameArray[index];
      plane = BABYLON.MeshBuilder.CreatePlane(sphereName, {size: 80});
      plane.parent = sphere;
      plane.position.y = 100;
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
      button.onPointerClickObservable.add(function() {
        location.assign(`./${sphereNameArray[index]}`);
    });
    }
  }
  

  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('OverlayUI', scene);

  let setupBasicUI = () => {
    let titleBox = new GUI.TextBlock('TitleBox', 'Solar Factuary');
    titleBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    titleBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    titleBox.width = '400px';
    titleBox.height = '100px';
    titleBox.paddingRight = '50px';
    titleBox.color = 'white';
    titleBox.fontSize = '50px';

    let subTitleBox = new GUI.TextBlock('SubTitleBox', 'Solar System');
    subTitleBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    subTitleBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    subTitleBox.width = '400px';
    subTitleBox.height = '100px';
    subTitleBox.paddingRight = '50px';
    subTitleBox.color = 'white';
    subTitleBox.fontSize = '30px';
    subTitleBox.top = '50px';

    let creditsBox = new GUI.TextBlock('CreditsBox', 'Made by @depthpixels and @g0bie');
    creditsBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    creditsBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    creditsBox.width = '400px';
    creditsBox.height = '100px';
    creditsBox.paddingRight = '50px';
    creditsBox.color = 'white';
    creditsBox.fontSize = '15px';

    advancedTexture.addControl(titleBox);
    advancedTexture.addControl(subTitleBox);
    advancedTexture.addControl(creditsBox);
  }


  let textBlock1 = new GUI.TextBlock('Tutorial Header', 'Tutorial')
  textBlock1.width = '300px';
  textBlock1.height = '50px';
  textBlock1.color = 'white';
  textBlock1.paddingLeft = "50px";
  textBlock1.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

  let textBlock2 = new GUI.TextBlock('Directions', 'Use Left Click to Rotate\nUse Right Click to Pan (Move Side-to-Side)\nUse your scroll wheel to zoom in and out\nClick the buttons above the planets to open planet view.\nIncase Planets dissapear when zooming please keep zooming in to make them reappear, It is a known bug.');
  textBlock2.width = '500px';
  textBlock2.height = '150px';
  textBlock2.color = 'white';
  textBlock2.top = '50px';
  textBlock2.paddingLeft = "50px";
  textBlock2.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  textBlock2.textWrapping = true;

  let button1 = GUI.Button.CreateSimpleButton('Dismiss', 'Dismiss Tutorial');
  button1.width = '200px';
  button1.height = '50px';
  button1.background = '#FFFFFF4A';
  button1.paddingLeft = "50px";
  button1.top = '200px';
  button1.onPointerClickObservable.add(function() {
    textBlock1.isVisible = false;
    textBlock2.isVisible = false;
    button1.isVisible = false;
  });

  textBlock1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  textBlock1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  textBlock2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  textBlock2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  button1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  button1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(textBlock1);
  advancedTexture.addControl(textBlock2);
  advancedTexture.addControl(button1);

  setupButtons();
  setupBasicUI();


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