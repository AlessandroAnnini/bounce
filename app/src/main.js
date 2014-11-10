/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transitionable = require("famous/transitions/Transitionable");
    var Modifier   = require("famous/core/Modifier")

    var state = new Transitionable(0);
    state.set(100, {duration : 500, curve : 'easeInOut'});
    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var logo = new ImageSurface({
        size: [200, 200],
        content: 'content/images/famous_logo.png',
        classes: ['backfaceVisibility']
    });

    var translateModifier = new Modifier({
        align: [0.5, 0.75],
        origin: [0.5, 1],
        transform : Transform.identity

    });

    
    var scaleModifier = new Modifier({
        align: [0.5, 0.75],
        origin: [0.5, 1],
    });

    mainContext.add(translateModifier).add(scaleModifier).add(logo);
    function play() {  
        setTimeout(function() {
            translateModifier.halt();
            scaleModifier.halt();
            translateModifier.setTransform(Transform.translate(0,-400,0), {curve : 'easeOut', duration : 500});
            scaleModifier.setTransform(Transform.scale(0.8,1.2,1), {curve : 'easeOut', duration : 500});
            translateModifier.setTransform(Transform.translate(0,0,0), {curve : 'easeIn', duration : 500});
            scaleModifier.setTransform(Transform.scale(1,1,1), {curve : 'easeIn', duration : 500});
            translateModifier.setTransform(Transform.translate(0,0.1,0), {curve : 'linear', duration : 75});
            translateModifier.setTransform(Transform.translate(0,0.0,0), {curve : 'linear', duration : 75});
            scaleModifier.setTransform(Transform.scale(1.6,0.4,1.0), {curve : 'easeIn', duration : 75});
            scaleModifier.setTransform(Transform.scale(1,1,1), {curve : 'easeOut', duration : 75});
            play();
        }, 1150);
    }
    play();
});
