"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScene = void 0;
const core_1 = require("@babylonjs/core");
const inspector_1 = require("@babylonjs/inspector");
const loadScene = (data) => {
    loadSceneAsync(data);
    function loadSceneAsync(loadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = document.getElementById(loadData.domID) || new HTMLCanvasElement();
            const webGPUSupported = yield core_1.WebGPUEngine.IsSupportedAsync;
            if (webGPUSupported) {
                console.log("Support");
            }
            else {
                console.log("Don't Support");
            }
            const engine = new core_1.Engine(container);
            const scene = new core_1.Scene(engine);
            scene.useRightHandedSystem = true;
            //#region Camera
            const camera = new core_1.ArcRotateCamera("Main", 0, 0, 100, new core_1.Vector3(0, 0, 0), scene);
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
            };
            camera.target.set(cameraData.target.x, cameraData.target.y, cameraData.target.z);
            camera.alpha = cameraData.alpha;
            camera.beta = cameraData.beta;
            camera.radius = cameraData.radius;
            camera.panningSensibility *= 0.01;
            camera.wheelPrecision *= 0.5;
            const ground = core_1.MeshBuilder.CreatePlane("Ground", { size: 50000 }, scene);
            ground.rotation.x = Math.PI / 2;
            ground.position.y = -10;
            const material = new core_1.StandardMaterial("ground", scene);
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
            let offset = new core_1.Vector3();
            engine.runRenderLoop(() => {
                scene.render();
                return;
            });
            const p = {
                a: 0
            };
            const animationG = new core_1.AnimationGroup("a", scene);
            const animation = new core_1.Animation('alpha', "alpha", 100, core_1.Animation.ANIMATIONTYPE_FLOAT);
            const keys = [
                { frame: 0, value: 0 },
                { frame: 1, value: 1 }
            ];
            animation.setKeys(keys);
            animationG.addTargetedAnimation(animation, material);
            inspector_1.Inspector.OnSelectionChangeObservable.add(() => {
            });
            scene.debugLayer.show();
            const pipeline = new core_1.DefaultRenderingPipeline("CustomPPL", true, scene);
            pipeline.samples = 4;
            pipeline.bloomEnabled = true;
            pipeline.bloomThreshold = 0.65;
            pipeline.bloomWeight = 0.7;
            pipeline.bloomKernel = 126;
            pipeline.fxaaEnabled = true;
            scene.fogMode = core_1.Scene.FOGMODE_EXP;
            scene.fogDensity = 0.0001;
            return { engine, scene };
        });
    }
};
exports.loadScene = loadScene;
