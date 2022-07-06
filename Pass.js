import{BufferGeometry,Float32BufferAttribute,OrthographicCamera,Mesh}from"./three.module.js";class Pass{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const _camera=new OrthographicCamera(-1,1,1,-1,0,1),_geometry=new BufferGeometry;_geometry.setAttribute("position",new Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),_geometry.setAttribute("uv",new Float32BufferAttribute([0,2,0,0,2,0],2));class FullScreenQuad{constructor(e){this._mesh=new Mesh(_geometry,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,_camera)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}export{Pass,FullScreenQuad};