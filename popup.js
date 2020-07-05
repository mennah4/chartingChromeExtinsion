// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.tabs.getSelected(null, tab => {
  if (tab.url.includes('tasty.co/recipe')) {
      document.querySelector('.disclaimer').classList.add('hidden');
      document.querySelector('.shopping-list').classList.remove('hidden');
  }
});

chrome.tabs.getSelected = function( tab ) {
  console.log("here")
  if (tab.url.includes('nseindia.com')) {
    console.log("again")

    document.querySelector('.disclaimer').classList.add('hidden');
    document.querySelector('.shopping-list').classList.remove('hidden');
}
};