'use strict';

let smallBlocks = document.querySelectorAll('.small-blocks__block');
let navBack = document.querySelector('.small-blocks-gallery__nav-arrows--back');
let navForward = document.querySelector('.small-blocks-gallery__nav-arrows--forward');
let blocksList = document.querySelector('.small-blocks-gallery__list');
let galleryElements = document.querySelectorAll('.small-blocks-gallery__block--item');
let timeInfo = new Date().toLocaleString();
let currentDates = document.querySelectorAll('.small-blocks__block--time');
let num = 0;
let step = 330;
let leftEdge = 330;
let rightEdge = -1320;

currentDates.forEach(function (date) {
	date.innerText = timeInfo;
})

let onForwardButtonClick = function () {
	num += step;
	if (num >= leftEdge) {
		num = leftEdge;
	} else if (num <= rightEdge) {
		num = rightEdge;
	}
	blocksList.style.transform = 'translate(' + num + 'px)';
	galleryElements.forEach(function (item) {
		item.classList.remove('chosenBlock');
		item.closest('a').querySelector('p').classList.add('hidden');
	});
}

let onBackButtonClick = function () {
	num -= step;
	if (num > leftEdge) {
		num = leftEdge;
	} else if (num < rightEdge) {
		num = rightEdge;
	}
	blocksList.style.transform = 'translate(' + num + 'px)';
	galleryElements.forEach(function (item) {
		item.classList.remove('chosenBlock');
		item.closest('a').querySelector('p').classList.add('hidden');
	});
}

let onBlockClick = function (evt) {
	let element = evt.currentTarget;
	localStorage.setItem('class', element.querySelector('div').classList[1]);
	localStorage.setItem('text', element.querySelector('p').innerText);
}

let onGalleryElementClick = function (evt) {
		if (evt.clientX < 545 && num <= 0) {
			num += step;
			blocksList.style.transform = 'translate(' + num + 'px)';
		} else if (evt.clientX > 855 && num >= -990) {
			num -= step;
			blocksList.style.transform = 'translate(' + num + 'px)';
		}
			galleryElements.forEach(function (element) {
				element.classList.remove('chosenBlock');
				element.classList.add('notChosenBlock');
				element.closest('a').querySelector('p').classList.add('hidden');
			});
			evt.currentTarget.classList.add('chosenBlock');
			evt.currentTarget.classList.remove('notChosenBlock');
			evt.currentTarget.closest('a').querySelector('p').classList.remove('hidden');
	}

galleryElements.forEach(function (block) {
	block.addEventListener('click', onGalleryElementClick);
	if (block.classList.contains(localStorage.getItem('class'))) {
		let initialBackground = getComputedStyle(galleryElements[1]).background;
		galleryElements[1].style.background = getComputedStyle(block).background;
		block.style.background = initialBackground;
		galleryElements[1].classList.add('chosenBlock', block.classList[1]);
		galleryElements[1].closest('a').querySelector('p').innerText = localStorage.getItem('text');
		galleryElements[1].closest('a').querySelector('p').classList.remove('hidden');
		if (galleryElements[1].classList[1] !== block.classList[1]) {
			block.classList.add('notChosenBlock', galleryElements[1].classList[1]);
			galleryElements[1].classList.remove(galleryElements[1].classList[1]);
			block.classList.remove(block.classList[1]);
			galleryElements[1].classList.remove('notChosenBlock');
		}	
	} else {
		block.classList.add('notChosenBlock');
	}
});

smallBlocks.forEach(function (element) {
	element.addEventListener('click', onBlockClick);
});

navForward.addEventListener('click', onForwardButtonClick);
navBack.addEventListener('click', onBackButtonClick);

