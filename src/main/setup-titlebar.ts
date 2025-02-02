/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) AlexTorresDev. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *-------------------------------------------------------------------------------------------- */

export default () => {
	if (process.type !== 'browser') return

	const { BrowserWindow, Menu, MenuItem, ipcMain } = require('electron')

	// Send menu to renderer title bar process
	ipcMain.handle('request-application-menu', async () => JSON.parse(JSON.stringify(
		Menu.getApplicationMenu(),
		(key: string, value: any) => (key !== 'commandsMap' && key !== 'menu') ? value : undefined)
	))

	// Handle window events
	ipcMain.on('window-event', (event: any, eventName: String) => {
		const window = BrowserWindow.fromWebContents(event.sender)

		/* eslint-disable indent */
		if (window) {
			switch (eventName) {
				case 'window-minimize':
					window?.minimize()
					break
				case 'window-maximize':
					window?.isMaximized() ? window.unmaximize() : window?.maximize()
					break
				case 'window-close':
					window?.close()
					break
				case 'window-is-maximized':
					event.returnValue = window?.isMaximized()
					break
				default:
					break
			}
		}
	})

	// Handle menu events
	ipcMain.on('menu-event', (event: any, commandId: any) => {	
		
		const item = getMenuItemByCommandId(commandId, Menu.getApplicationMenu())
	
		if (item) item.click(undefined, BrowserWindow.fromWebContents(event.sender), event.sender)
	})

	// Handle the minimum size.
	ipcMain.on('window-set-minimumSize', (event: any, width: any, height: any) => {
	    const window = BrowserWindow.fromWebContents(event.sender);
		
	    /* eslint-disable indent */
	    if (window) {
		window?.setMinimumSize(width, height);
	    }
	});

	// Handle menu item icon
	ipcMain.on('menu-icon', (event: any, commandId: Number) => {
		const item = getMenuItemByCommandId(commandId, Menu.getApplicationMenu())
		if (item && item.icon && typeof item.icon !== 'string') {
			event.returnValue = item.icon.toDataURL()
		} else {
			event.returnValue = null
		}
	})

	ipcMain.on('update-window-controls', (event: any, args: Electron.TitleBarOverlay) => {
		const window = BrowserWindow.fromWebContents(event.sender)
		try {
			if (window) window.setTitleBarOverlay(args)
			event.returnValue = true
		} catch (_) {
			event.returnValue = false
		}
	})
}

function getMenuItemByCommandId(commandId: any, menu: Electron.Menu | null): Electron.MenuItem | undefined {
	if (!menu) return undefined

	for (const item of menu.items) {
		if (item.submenu) {
			const submenuItem = getMenuItemByCommandId(commandId, item.submenu)
			if (submenuItem) return submenuItem
		} 
		else if (item.commandId === commandId) return item
		else if(item.id && item.id === commandId.toString())  return item
	}

	return undefined
}
