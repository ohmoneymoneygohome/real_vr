/* global AFRAME, THREE */
AFRAME.registerComponent('ground', {
  schema: {
    url: { default: '' }
  },
  update: function () {
    var objectLoader;
    var self = this;
    if (this.objectLoader) { return; }
    objectLoader = this.objectLoader = new THREE.JSONLoader();
    //objectLoader.setCrossOrigin('');
    console.log(this.data.url);
    objectLoader.load(this.data.url, function (obj) {
      console.log("----------------------------------------------");
      console.log(obj);
      obj.children.forEach(function (value) {
        if (value instanceof THREE.Mesh) {
          value.geometry.computeFaceNormals();
          value.geometry.computeVertexNormals();
          value.receiveShadow = true;
          value.material.flatShading = THREE.FlatShading;
        }
      });
      self.el.setObject3D('ground', obj);
    });
  }
});
