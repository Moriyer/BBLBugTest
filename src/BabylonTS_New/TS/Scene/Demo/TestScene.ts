import { Color3, Engine, Mesh, Scene, SceneLoader, Texture, Vector2, Vector3, WebGPUEngine, DefaultRenderingPipeline, MeshBuilder, StandardMaterial, PBRMaterial, DirectionalLight, HemisphericLight, ArcRotateCamera, AnimationGroup, Animation, IAnimationKey } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";

export type ILoadSceneData = {
    domID: string
}

const loadScene = (data: ILoadSceneData) => {



    loadSceneAsync(data);



    async function loadSceneAsync(loadData: ILoadSceneData) {
        const container = (document.getElementById(loadData.domID) as HTMLCanvasElement) || new HTMLCanvasElement();

        const webGPUSupported = await (WebGPUEngine as any).IsSupportedAsync;
        if (webGPUSupported) {
            console.log("Support");
        }
        else {
            console.log("Don't Support");
        }
        const engine = new Engine(container);
        const scene = new Scene(engine);
        scene.useRightHandedSystem = true;

        //#region Camera
        const camera = new ArcRotateCamera("Main", 0, 0, 100, new Vector3(0, 0, 0), scene)
        // camera.minY = -99999;

        camera.maxZ *= 100;
        camera.attachControl(container, true);

        const cameraData = {
            "target": {
                "x": 48.46784591674805,
                "y": 159.14,
                "z": -41.737
            },
            "alpha": 5.174038215940015,
            "beta": 1.6432964194894306,
            "radius": 444.40419056178405
        }
        camera.target.set(cameraData.target.x, cameraData.target.y, cameraData.target.z);
        camera.alpha = cameraData.alpha;
        camera.beta = cameraData.beta;
        camera.radius = cameraData.radius;
        camera.panningSensibility *= 0.01;
        camera.wheelPrecision *= 0.5;


        const ground = MeshBuilder.CreatePlane("Ground", { size: 50000 }, scene);
        ground.rotation.x = Math.PI / 2;
        ground.position.y = -10;
        const material = new StandardMaterial("ground", scene);
        ground.material = material;
        ground.checkCollisions = false;
        ground.isPickable = false;
        //禁止旋转

        // if (camera.autoRotationBehavior) {
        //     camera.autoRotationBehavior.idleRotationSpeed = 0;
        // }
        scene.activeCameras = [camera];
        //#endregion
        let frameIndex = 0;
        let offset = new Vector3();
        engine.runRenderLoop(() => {
            scene.render();
            return;
        })
        const p = {
            a: 0
        }
        const animationG = new AnimationGroup("a", scene);
        const animation = new Animation('alpha', "alpha", 100, Animation.ANIMATIONTYPE_FLOAT);
        const keys: IAnimationKey[] = [
            { frame: 0, value: 0 },
            { frame: 1, value: 1 }
        ]
        animation.setKeys(keys);
        animationG.addTargetedAnimation(animation, material);
        Inspector.OnSelectionChangeObservable.add(() => {

        })
        scene.debugLayer.show();


        const pipeline = new DefaultRenderingPipeline("CustomPPL", true, scene);
        pipeline.samples = 4;
        pipeline.bloomEnabled = true;
        pipeline.bloomThreshold = 0.65;
        pipeline.bloomWeight = 0.7;
        pipeline.bloomKernel = 126;
        pipeline.fxaaEnabled = true;

        scene.fogMode = Scene.FOGMODE_EXP;
        scene.fogDensity = 0.0001;


        return { engine, scene }
    }



}

export { loadScene };
