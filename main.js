const animate = ({ timing, draw, duration }) => {
	let start = performance.now();

	requestAnimationFrame(doAnimation = (time) => {
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			let progress = timing(timeFraction);
			draw(progress);

			if (timeFraction < 1) requestAnimationFrame(doAnimation);
			else animate({ timing, draw, duration});
	});
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let ballElement = document.querySelector('#ball');

const mainElement = document.querySelector('#main');
const balls = [];
for (let i = 0; i < 30; i += 1) {
	let newBall = document.createElement('img');
	newBall.style.position = "absolute";
	newBall.src = './ball.svg';
	newBall.style.left = `${1 + getRandomInt(90)}%`;
	console.log(`${getRandomInt(100)}px`);
	newBall.style.top = `${1 + getRandomInt(90)}%`;
	mainElement.appendChild(newBall);
	balls.push(newBall);
}

const animationSettings = {
	duration: 3000,
	timing(timeFraction) {
		const timing = timeFraction;
		return timing;
	},
	draw(progress) {
		ballElement.style['margin-left'] = 100 * Math.sin(progress * Math.PI * 2) + 'px';
		ballElement.style['margin-top'] = 100 * Math.cos(progress * Math.PI * 2) + 'px';
	}
};

const ballDropAnimation = {
	duration: 1000,
	timing(timeFraction) {
		return timeFraction;
	},
	draw(progress) {
		console.log('drawing');
		balls.forEach((ball) => {
			const currentTop = ball.style.top;
			let topNumber = Number(currentTop.replace('%',''));
			topNumber += 1;
			if (topNumber > 90) topNumber = 1;
			ball.style.top = `${topNumber}%`;
		});
	}
}

	animate(ballDropAnimation);
	// animate(animationSettings);



