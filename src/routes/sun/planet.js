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

  planetMaterial.emissiveTexture = new BABYLON.Texture('./textures/2k_sun.jpg', scene);

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
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox/", scene, extensions);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;	
  

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

    let subTitleBox = new GUI.TextBlock('SubTitleBox', 'The Sun');
    subTitleBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    subTitleBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    subTitleBox.width = '400px';
    subTitleBox.height = '100px';
    subTitleBox.paddingRight = '50px';
    subTitleBox.color = 'white';
    subTitleBox.fontSize = '30px';
    subTitleBox.top = '50px';

    let button1 = GUI.Button.CreateSimpleButton('Return', 'Return To\nSolar System');
    button1.width = '300px';
    button1.height = '50px';
    button1.color = 'white';
    button1.paddingRight = "100px";
    button1.top = '-200px';
    button1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button1.onPointerClickObservable.add(function() {
      location.assign('/Solar-Factuary/');
    });

    advancedTexture.addControl(titleBox);
    advancedTexture.addControl(subTitleBox);
    advancedTexture.addControl(button1);
  };

  let setupFactsUI = () => {
    let titleBox = new GUI.TextBlock('TitleBox', 'Did You Know?');
    titleBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    titleBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    titleBox.width = '400px';
    titleBox.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    titleBox.height = '100px';
    titleBox.paddingLeft = '50px';
    titleBox.color = 'white';
    titleBox.fontSize = '30px';

    let fact1 = new GUI.TextBlock('Fact1', "1. The Sun will continue to burn for about 130 million years after it burns through all of its hydrogen, instead of burning helium. During this time it will expand to such a size that it will engulf Mercury, Venus, and Earth. When it reaches this point, it will have become a red giant star.");
    fact1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    fact1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    fact1.width = '500px';
    fact1.height = '100px';
    fact1.paddingLeft = '50px';
    fact1.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    fact1.top = '100px';
    fact1.color = 'white';
    fact1.fontSize = '15px';
    fact1.textWrapping = true;

    let fact2 = new GUI.TextBlock('Fact2', "2. The Sun's magnetic field is constantly accelerating charged particles called the solar wind. But during solar flares, a large number of charged particles can be emitted. Sometimes a large piece of plasma can even break away from our star. This phenomenon is called coronary ejection.");
    fact2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    fact2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    fact2.width = '500px';
    fact2.height = '100px';
    fact2.paddingLeft = '50px';
    fact2.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    fact2.top = '250px';
    fact2.color = 'white';
    fact2.fontSize = '15px';
    fact2.textWrapping = true;

    let fact3 = new GUI.TextBlock('Fact3', "3. The layer of the Sun's surface that emits visible light is called the photosphere. There are colder areas that seem dark. You can't just look at our luminary through a telescope, but if you use dark filters, large groups of spots are visible. These are called sunspots which are areas on the surface of the Sun where the lines of force of its magnetic field are twisted and torn.");
    fact3.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    fact3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    fact3.width = '500px';
    fact3.height = '100px';
    fact3.paddingLeft = '50px';
    fact3.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    fact3.top = '400px';
    fact3.color = 'white';
    fact3.fontSize = '15px';
    fact3.textWrapping = true;

    advancedTexture.addControl(titleBox);
    advancedTexture.addControl(fact1);
    advancedTexture.addControl(fact2);
    advancedTexture.addControl(fact3);
  };

  setupBasicUI();
  setupFactsUI();


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