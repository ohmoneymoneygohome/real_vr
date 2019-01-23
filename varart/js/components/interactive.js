/* global AFRAME */

// 随机颜色
function bg() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function bg2() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

// 背景音乐控制
function autoPlay(id) {
    let myAuto = $("#bgm_" + id)[0];
    let myMainAuto = $("#bgm")[0];
    console.log(id + "play");
    myMainAuto.pause();
    //myMainAuto.load();
    myAuto.play();
}

function closePlay(id) {
    let myAuto = $("#bgm_" + id)[0];
    let myMainAuto = $("#bgm")[0];
    console.log(id + "stop");
    myAuto.pause();
    //myAuto.load();
    myMainAuto.play();
}

function setVolume(id, num) {
    let myMainAuto = $("#bgm")[0];
    myMainAuto.play();
    $("#" + id)[0].volume = num
}

function getPositionOnCircle(r, ox, oy, count) {
    let point = []; //结果
    /*
    * 求圆周上等分点的坐标
    * ox,oy为圆心坐标
    * r为半径
    * count为等分个数
    */

    let radians = (Math.PI / 180) * Math.round(360 / count), //弧度
        i = 0;
    for (; i < count; i++) {
        let x = ox + r * Math.sin(radians * i),
            y = oy + r * Math.cos(radians * i);

        point.unshift({x: x, y: y}); //为保持数据顺时针
    }
}

// 初始化
function format() {
    // 主背景音0.5
    setVolume("bgm", 0.5);
}

format();
let isDoorCanBeOpened = false;
let isFlyStarted = false;
AFRAME.registerComponent('change-color-on-hover', {
    schema: {
        color: {default: 'red'}
    },
    init: function () {
        let data = this.data;
        let el = this.el;  // <a-box>
        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', data.color);
            el.setAttribute('color', "white");
        });
        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', "blue");
        });
        el.addEventListener('click', function (evt) {
            el.setAttribute('opacity', "0.6");
            if (data.color === "blue") {
                document.querySelector('#sky').setAttribute(
                    'material',
                    {
                        shader: 'skyGradient',
                        colorTop: bg(),
                        colorBottom: bg2(),
                        side: 'back'
                    });
                let camPos = document.querySelector("#cameraWrappers1");
                let position = camPos.getAttribute("position");
                let index = Number(el.id.split("y")[1]);
                //播放bgm
                autoPlay(index);
                let sceneY = index * 100;
                if (position.z == 0) {
                    console.log("position");
                    console.log(position);
                    camPos.setAttribute("position", '0 ' + sceneY + ' 100');
                } else if (position.z == 100) {
                    console.log("position2");
                    console.log(position);
                    camPos.setAttribute("position", '0 1.6 0');
                }
                console.log("666666666");
                let positionnew = camPos.getAttribute("position")
                //console.log(positionnew)
            } else if (data.color === "white") {
                document.querySelector('#sky').setAttribute('material',
                    {
                        shader: 'skyGradient',
                        colorTop: "#000000",
                        colorBottom: "#000000",
                        side: 'back'
                    });
            } else {
                let camPos = document.querySelector("#cameraWrappers1");
                camPos.setAttribute("animation__01", {
                    property: "position",
                    dir: "alternate",
                    dur: 10000,
                    to: "-191 213 1236",
                    loop: false
                });

            }

        });
    }
});
AFRAME.registerComponent('show-a-paint-on-hover', {
    schema: {
        paint: {default: 'paint1'}
    },
    init: function () {
        let el = this.el;  // <a-box>
        let randomNum = Math.ceil(Math.random() * 5);
        el.addEventListener('mouseenter', function () {
            let camPos = document.querySelector("#cameraWrappers1");
            let position = camPos.getAttribute("position");
            el.setAttribute("look-at", "#look-here");
            el.querySelector("a-image").setAttribute("visible", "true");
            el.querySelector("a-image").setAttribute("src", "#frame" + randomNum);
        });
        el.addEventListener('mouseleave', function () {


        });

    }
});
AFRAME.registerComponent('move-standpoint', {
    schema: {
        dir: {default: 'forward'}
    },
    init: function () {
        let el = this.el;  // <a-box>
        let camPos = document.querySelector("#cameraWrappers1");
        el.addEventListener('mouseenter', function () {
            //let p = camPos.getAttribute("position");
            //document.querySelector("#point1").setAttribute("position",p)
            //camPos.playAnimation()
            AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.curve", "#circle1");
            AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.dur", "20000");
            AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.loop", true);
            AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.rotate", false);
            AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.resetonplay", false);
        });
        el.addEventListener('mouseleave', function () {

            //camPos.pauseAnimation()
            let p = camPos.getAttribute("position");
            document.querySelector("#point7").setAttribute("position", p);
            AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.curve", "#circle2");
            // let camPos = document.querySelector("#cameraPositions2");
            // AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.curve", "");
            // AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.dur", "");
            // AFRAME.utils.entity.setComponentProperty(camPos, "alongpath.loop", "");
        });

    }
});
AFRAME.registerComponent('stand-in-front-of', {
    schema: {
        dir: {default: 'forward'}
    },
    init: function () {
        let el = this.el;  // <a-box>
        el.setAttribute("look-at", "#cameraWrappers1");
        let camPos = document.querySelector("#cameraWrappers1");
        let light_6 = document.querySelector("#light_6");
        el.addEventListener('mouseenter', function () {
            let p = this.getAttribute("position");
            let newP = {};
            if (p.x > 0) {
                newP.x = parseInt(p.x - 1)
            } else {
                newP.x = parseInt(p.x + 1)
            }
            newP.y = parseInt(p.y + 600);
            newP.z = parseInt(p.z + 100);
            //console.log(newP)
            let camP = camPos.getAttribute("position");
            //console.log(camP)
            camPos.setAttribute("animation__stand", {
                property: "position",
                dur: 6000,
                to: newP,
                loop: false,
                startEvents: "move",
                pauseEvents: "stop",
            });
            light_6.setAttribute("animation", {
                property: "position",
                dur: 6000,
                to: p,
                loop: false,
                startEvents: "move",
                pauseEvents: "stop",
            });
            camPos.emit('move');
            light_6.emit('move');
        });
        el.addEventListener('mouseleave', function (e) {
            camPos.emit('stop');
            light_6.emit('stop');
        });
        el.addEventListener('click', function (e) {

        });

    }
});
AFRAME.registerComponent('draw-a-line', {
    schema: {},
    init: function () {
        let el = this.el;  // <a-box>
        el.addEventListener('mouseenter', function () {
            var p = document.getElementById('cursor').object3D.getWorldPosition();
            //console.log(p)
        });
        el.addEventListener('mouseleave', function () {

        });

    }
});
AFRAME.registerComponent('move-rig', {
    schema: {},
    init: function () {
    },
    tick: function () {
        var rigEl = this.el;
        var currentRotation = rigEl.object3D.rotation;
        //var currentposition = rigEl.object3D.position;
        var rot = {};
        rot.x = currentRotation.x * 180 / Math.PI;
        rot.y = currentRotation.y * 180 / Math.PI;
        rot.z = currentRotation.z * 180 / Math.PI;
        let follow = document.querySelector("#logo");
        follow.setAttribute("rotation", rot);
        // Compare to this.lastPosition (a vector3 you create)
        //this.lastPosition.copy(rigEl.object3D.position);
        //console.log(currentPosition)

    }
});
AFRAME.registerComponent('open-the-door', {
    schema: {},
    init: function () {
        let el = this.el;  // <a-box>
        let fly = document.querySelector("#fly");
        el.addEventListener('mouseenter', function () {
            if(isDoorCanBeOpened){
                this.setAttribute("animation", {
                    property: "rotation",
                    dir: "liner",
                    dur: "2000",
                    delay: "1500",
                    loop: false,
                    to: "0 120 0",
                });
                let handle = el.querySelector("#room_handle");
                handle.setAttribute("animation", {
                    property: "rotation",
                    dir: "alternate",
                    dur: "1500",
                    loop: false,
                    to: "0 0 -60",
                });
                fly.setAttribute("animation__pos2", {
                    property: "position",
                    dir: "liner",
                    delay:1500,
                    dur:"3500",
                    loop: false,
                    to:"-5 1.6 -27",
                });
            }

        });
        el.addEventListener('mouseleave', function () {

        });

    }
});
AFRAME.registerComponent('come-in-here', {
    schema: {},
    init: function () {
        let el = this.el;  // <a-box>
        let camPos = document.querySelector("#cameraWrappers1");
        let fly = document.querySelector("#fly");
        let fly_inner = document.querySelector("#fly_inner");
        let camOldPos = camPos.getAttribute("position");
        el.addEventListener('click', function () {
            let pos = el.object3D.getWorldPosition();
            let pos0 = {x:camOldPos.x,y:camOldPos.y,z:camOldPos.z};
            let fly_pos0 = {x:camOldPos.x,y:camOldPos.y+1,z:camOldPos.z};
                camPos.setAttribute("animation__come", {
                    property: "position",
                    dir: "liner",
                    easing:"easeInOutQuad",
                    dur:"1500",
                    loop: false,
                    to:pos,
                });
            let time = setTimeout(function () {
                if(!isFlyStarted){
                    fly.setAttribute("visible","true");
                    fly.setAttribute("position",pos);
                    fly.setAttribute("scale","0.5 0.5 0.5");
                }
                camPos.setAttribute("animation__back", {
                    property: "position",
                    dir: "liner",
                    easing:"easeInOutQuad",
                    dur:"1000",
                    loop: false,
                    to:camOldPos,
                });
                el.setAttribute("geometry",{primitive: "octahedron"});
                el.setAttribute("animation__ro", {
                    property: "rotation",
                    dir: "liner",
                    dur:"10000",
                    loop: true,
                    to:"360 360 360",
                });
                clearTimeout(time);
            }, 5000);
        });
        el.addEventListener('mouseleave', function () {

        });

    }
});
AFRAME.registerComponent('fly-track-control', {
    schema: {},
    init: function () {
        let el = this.el;  // <a-box>
        let camPos = document.querySelector("#cameraWrappers1");
        let fly_inner = document.querySelector("#fly_inner");
        let wing = document.querySelector("#wing");
        let camOldPos = camPos.getAttribute("position");
        let els = document.querySelectorAll(".fly_aside");
        let isTimeToGoOUT = false;
        let isClickAble = true;
        let fly_tep_1 = false;
        let fly_tep_2 = false;
        let fly_tep_3 = false;

        el.addEventListener('mouseenter', function () {
            //注视后变色 升高 并围绕人旋转
            if(isClickAble){
                for (let i = 0; i < els.length; i++) {
                    els[i].setAttribute("material",{color:"#26C6DA"})
                }
                el.setAttribute("animation__up1", {
                    property: "position",
                    dir: "liner",
                    easing:"easeInOutQuad",
                    delay:500,
                    dur:"1500",
                    loop: false,
                    to:'-6.4 2.1 -35.3',
                });
                el.setAttribute("animation__big1", {
                    property: "scale",
                    dir: "liner",
                    delay:1000,
                    easing:"easeInOutQuad",
                    dur:"1500",
                    loop: false,
                    to:'1.1 1.1 1.1',
                });
                let time = setTimeout(function () {
                    el.setAttribute("pivot","0.3 -0.2 0");
                    isClickAble = false;
                    isFlyStarted = true;
                    fly_tep_1 = true;
                    clearTimeout(time);
                }, 1500);

            }
            //注视后变色 飞到另一房间
            if(fly_tep_1){
                for (let i = 0; i < els.length; i++) {
                    els[i].setAttribute("material",{color:"#F88"})
                }
                el.setAttribute("pivot","");
                AFRAME.utils.entity.setComponentProperty(el, "alongpath.curve", "#camera_curve");
                AFRAME.utils.entity.setComponentProperty(el, "alongpath.dur", "10000");
                AFRAME.utils.entity.setComponentProperty(el, "alongpath.delay", "1000");
                AFRAME.utils.entity.setComponentProperty(el, "alongpath.loop", false);
                AFRAME.utils.entity.setComponentProperty(el, "alongpath.rotate", false);
                AFRAME.utils.entity.setComponentProperty(el, "alongpath.resetonplay", false);
                el.addEventListener("movingended", function(){
                    fly_tep_1 =false;
                    fly_tep_2 =true;
                });

            }
            //注视后变色 镜头移动到另一房间
            if(fly_tep_2){
                let pos = el.object3D.getWorldPosition();
                console.log("pos");
                console.log(pos);
                camPos.setAttribute("animation__step2", {
                    property: "position",
                    dir: "liner",
                    easing:"easeInOutQuad",
                    dur:"6500",
                    loop: false,
                    to:pos,
                });
                let time = setTimeout(function () {

                    fly_tep_2 = false;
                    fly_tep_3 = true;
                    isDoorCanBeOpened = true;
                    clearTimeout(time);
                }, 7000);
            }
            //注视飞机 进入中心世界
            if(fly_tep_3){
                el.setAttribute("animation__fly3", {
                    property: "position",
                    dir: "liner",
                    easing:"easeInOutQuad",
                    dur:"20500",
                    loop: false,
                    to:"0 3 0",
                });
                camPos.setAttribute("animation__step3", {
                    property: "position",
                    dir: "liner",
                    delay:1500,
                    easing:"easeInOutQuad",
                    dur:"20500",
                    loop: false,
                    to:"0 1.6 0",
                });
                let time1 = setTimeout(function () {

                    fly_inner.setAttribute("position","8 0 0");
                    clearTimeout(time1);
                }, 20000);

            }

        });
        el.addEventListener('click', function () {

        });
        el.addEventListener('animationcomplete',function (event) {
            console.log("evt-----------");

            let p = el.getAttribute("position");
            console.log(p);
            if (event.detail.name !== 'animation__pos2' || this.done) { return; }
            isTimeToGoOUT = true;
        });
        if(isTimeToGoOUT){
            for (let i = 0; i < els.length; i++) {
                els[i].setAttribute("material",{color:"red"})
            }
        }
    }
});
let els = document.querySelectorAll("a-tetrahedron");
for (let i = 0; i < els.length; i++) {
    els[i].addEventListener('click', function () {
        let bgmId = this.parentNode.getAttribute("id");
        let id = Number(bgmId.split("y")[1]);
        closePlay(id);
        let camPos = document.querySelector("#cameraWrappers1");
        camPos.setAttribute("position", '0 1.6 0');
    });
}
// document.querySelector("a-camera").addEventListener("componentchanged", function (evt) {
//     // The console message outputs 'rotation' and never outputs 'position'
//     //console.log(evt);
//     // if(evt.detail.name === "position")
//     // {
//     //     console.log("Camera has moved from " + evt.oldData + " to " + evt.newData);
//     // }
//     // else
//     // {
//     //     console.log("position has not changed");
//     // }
// });

