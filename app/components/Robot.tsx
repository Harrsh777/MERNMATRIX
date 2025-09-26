'use client';

import React from 'react';
import { InteractiveRobotSpline } from './3drobot';


export function Robot() { 
  
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
   
    <div className="relative w-screen h-screen overflow-hidden">

      <InteractiveRobotSpline
        scene={ROBOT_SCENE_URL}
        className="absolute inset-0 z-0" 
      />

    
      <div className="
        absolute inset-0 z-10
        pt-4 md:pt-6 lg:pt-8
        px-4 md:px-8            
        pointer-events-none     
      ">
       
        <div className="
          text-left               // Left align the text
          text-white              // Text color
          drop-shadow-lg          // Text shadow for readability
          w-full max-w-xs         // Smaller max width
        ">
         
          <h1 className="
            text-sm md:text-base lg:text-lg 
            font-semibold 
           
          ">
            Say Hii to Whobee
          </h1>
        </div>
      </div>

    </div> 
  );
}
