/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { CustomTitlebar, TitlebarColor } = require('@siva7170/custom-electron-titlebar')
const path = require('path')

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}

	// eslint-disable-next-line no-new
	new CustomTitlebar({
		backgroundColor: TitlebarColor.fromHex('#6538b9'),
		menuTransparency: 0.2
		// icon: path.resolve('example/assets', 'logo.svg'),
		// icons: path.resolve('example/assets', 'icons.json'),
	})
})
