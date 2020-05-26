// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// chrome.storage.local.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
//   // changeColor.setAttribute('vale', data.color);
// });

var now_speed;
function showButton() {
  chrome.storage.local.get('speed', function (data) {
    now_speed = data.speed;


    let speedInput = document.getElementById('speedInput');
    const speedOptions = [0.5, 1, 2, 4, 8, 16];
    function constructOptions(kspeedInput) {
      for (let item of speedOptions) {
        let button = document.createElement('button');
        button.textContent = item;
        if (item == now_speed) 
          button.style.backgroundColor = "#3aa757";
        button.addEventListener('click', function () {
          chrome.storage.local.set({speed: item}, function() {
            alert("Speed set to "+item+". Refresh to update.");
          });          
          for (let child of kspeedInput.children) {
            child.style.backgroundColor = "white";
          }
          this.style.backgroundColor = "#3aa757";

        });
        kspeedInput.appendChild(button);
      }

    }
    constructOptions(speedInput);

  });
}
showButton();
let changeSpeed = document.getElementById('changeSpeed');

changeSpeed.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'jquery.js' });
  });
  chrome.tabs.executeScript(
    tabs[0].id,
    {file: 'content.js' });
}
