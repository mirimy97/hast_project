import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Marker = React.memo(({ latitude, longitude }) => {
  const markerRef = useRef();

  useEffect(() => {
    const radius = 1; // radius of the globe
    const markerRadius = 0.01; // radius of the marker
    const markerColor = 0xff0000; // color of the marker

    // Convert latitude and longitude to 3D position
    // const spherical = new THREE.Spherical(
    //   radius,
    //   THREE.MathUtils.degToRad(90 - longitude),
    //   THREE.MathUtils.degToRad(latitude)
    // );

    var phi = (90 - latitude) * (Math.PI / 180);
    var theta = (longitude + 180) * (Math.PI / 180);
    let x = -(Math.sin(phi) * Math.cos(theta));
    let y = Math.cos(phi);
    let z = Math.sin(phi) * Math.sin(theta);

    //const position = new THREE.Vector3().setFromSpherical(spherical);

    // Create marker object
    const markerGeometry = new THREE.SphereGeometry(markerRadius, 32, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: markerColor });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
    //markerMesh.position.copy(position);
    markerMesh.position.set(x, y, z);
    console.log(markerMesh.position);
    // Add marker object to scene
    markerRef.current.add(markerMesh);
  }, [latitude, longitude]);

  return <group ref={markerRef} />;
});

export default Marker;
