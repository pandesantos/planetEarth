var camera, scene, renderer;

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
camera.position.z = 20;

scene = new THREE.Scene();

/** Creating a light source **/
var light = new THREE.PointLight( 0xffffff,1,0,2);
light.position.set(100,50,50);
scene.add(light);

var loader = new THREE.TextureLoader();

/** add space background to the scene **/
var geoSpace = new THREE.SphereGeometry(10000,32,32);
var spaceTexture = loader.load('img/stars.png');
var spaceMaterial = new THREE.MeshBasicMaterial({
	map: spaceTexture
});

var space = new THREE.Mesh(geoSpace, spaceMaterial);
space.material.side = THREE.BackSide;
space.geometry.computeVertexNormals();
space.geometry.mergeVertices();

scene.add(space);

/** creating earth **/
var geoEarth = new THREE.SphereGeometry( 5, 32, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );


var earthTexture = loader.load('img/earth.jpg'); // earth texture
var bump =  loader.load('img/bump.jpg'); // bump texture  
var specular = loader.load('img/specular.jpg'); // shining texture

var earthMaterial = new THREE.MeshPhongMaterial({
	map: earthTexture,
	bumpMap: bump,
	bumpScale:0.08,
	specularMap: specular,
});


var earth = new THREE.Mesh( geoEarth, earthMaterial ); // earth created
scene.add( earth ); // add earth to the scene

var geoCloud = new THREE.SphereGeometry(5.1,32,32); // cloud texture
var textureCloud = loader.load('img/cloud.png');
var cloudMaterial = new THREE.MeshPhongMaterial({
	map: textureCloud,
    transparent: true,
    depthWrite  : false,	
    side: THREE.DoubleSide,
    opacity: 0.8
});

var cloud = new THREE.Mesh(geoCloud, cloudMaterial); // cloud created
scene.add( cloud ); // cloud added to the scene

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;

/** create animation loop **/
var animate = function animate(){
	requestAnimationFrame( animate );
	cloud.rotation.y += 0.0005;  
	earth.rotation.y += 0.0005;
	renderer.render( scene, camera );
}

animate();

