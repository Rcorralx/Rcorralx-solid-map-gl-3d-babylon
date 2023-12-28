import { render } from 'solid-js/web';
import { Component, createSignal } from 'solid-js';
import MapGL, { Viewport, Layer3D } from 'solid-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SceneLoader } from '@babylonjs/core/Loading';
import { AxesViewer } from '@babylonjs/core';
import '@babylonjs/loaders';

const [viewport, setViewport] = createSignal({
  center: [148.9819, -35.3981],
  zoom: 18,
  pitch: 60,
} as Viewport);
const [rotation, setRotation] = createSignal(true);

const App: Component = () => (
  <MapGL
    options={{
      style: 'mb:light',
      antialias: true,
    }}
    viewport={viewport()}
    onViewportChange={(evt: Viewport) => setViewport(evt)}
  >
    <Layer3D
      defaultLight
      babylon
      origin={[148.9819, -35.39847]}
      onAdd={(scene) => {
        new AxesViewer(scene, 10);

        // // load GLTF model in to the scene        
        SceneLoader.LoadAssetContainerAsync(                  
  //       'https://playground.babylonjs.com/scenes/',
  //       'skull.babylon',  
          'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/',
          '34M_17.gltf',
          scene
        ).then((modelContainer: any) => {
          modelContainer.addAllToScene();

          const rootMesh = modelContainer.createRootMesh();

          // Create a second mesh
          const rootMesh2 = rootMesh.clone();

          // Position in babylon.js coordinate system
          rootMesh2.position.x = -38.5; // +east, meters
          rootMesh2.position.z = 302.5; // +north, meters
        });
      }}
    />
  </MapGL>
);

render(() => <App />, document.getElementById('root') as HTMLElement);
