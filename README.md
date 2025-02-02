# Custom Electron Titlebar

This project is a typescript library for electron that allows you to configure a fully customizable title bar.


[![License](https://badgen.net/github/license/siva7170/custom-electron-titlebar?label=License)](https://github.com/AlexTorresDev/custom-electron-titlebar/blob/master/LICENSE)
[![NPM](https://badgen.net/npm/v/@siva7170/custom-electron-titlebar?label=NPM)](https://npmjs.org/package/@siva7170/custom-electron-titlebar)
[![Install size](https://badgen.net/packagephobia/install/@siva7170/custom-electron-titlebar?label=Install%20size)](https://packagephobia.com/result?p=@siva7170/custom-electron-titlebar)

> [!IMPORTANT]  
> This project will no longer be maintained, because I am the only one working on it and I have no free time left to review the issues and incorporate new features or update the dependencies to the latest versions.
>
> **Thanks to all the contributors and dependents of this library.**

[📄 Documentation](https://github.com/AlexTorresDev/custom-electron-titlebar/wiki)

### Standard Title Bar

![Screenshot 1](screenshots/70shots_so.jpg)

### Bottom Menu Bar

![Screenshot 2](screenshots/544shots_so.jpg)

### Menu

![Screenshot 3](screenshots/780shots_so.jpg)

### Custom color

![Screenshot 4](screenshots/262shots_so.jpg)

# 📦 Installing
You can install this package with `npm`, `pnpm` or `yarn`.
```sh
npm install @siva7170/custom-electron-titlebar
```

# 🛠️ Usage
The implementation is done as follows:

In the main application file (main.js or .ts)
```js
import { setupTitlebar, attachTitlebarToWindow } from "@siva7170/custom-electron-titlebar/main";

// setup the titlebar main process
setupTitlebar();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false, // needed if process.versions.electron < 14
    titleBarStyle: 'hidden',
    /* You can use *titleBarOverlay: true* to use the original Windows controls */
    titleBarOverlay: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  ...

  // attach fullScreen(f11 and not 'maximized') && focus listeners
  attachTitlebarToWindow(mainWindow);
}
```

In the preload file (preload.js or .ts)
```js
import { Titlebar } from "@siva7170/custom-electron-titlebar";

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
  new Titlebar();
});
```

To use menu item without submenu, please use id.

Note: You should use numeric for id property.

```js
const exampleMenuTemplate = [
	{
		label: 'zoomIn',
		id:'1',
		click: () => {
			dialog.showMessageBox(null,{title:'Success', message:'Test it amd test test 111',type:'error'}).then((res)=>{
				
			  },(err)=>{
				
			  });
		}
	},
	{
		label: 'zoomIn22',
		id:'2',
		click: () => {
			dialog.showMessageBox(null,{title:'Success', message:'Test it amd test test 2222',type:'error'}).then((res)=>{
				
			  },(err)=>{
				
			  });
		}
	},
	{
		label: 'Simple Options',
		id:'3',
		submenu: [
			{
				label: 'zoomIn',
				id:'3-1',
				click: () => {
					dialog.showMessageBox(null,{title:'Success', message:'Test it amd test test 333',type:'error'}).then((res)=>{
						
					  },(err)=>{
						
					  });
				}
			}
		]
	}
]
```

To see the options you can include in the Title Bar constructor, such as color of elements, icons, menu position, and much more, and the methods you can use, go to the [wiki](https://github.com/AlexTorresDev/custom-electron-titlebar/wiki)

## 💰 Support
If you want to support my development, you can do so by donating through [💖 Sponsor](https://github.com/sponsors/AlexTorresDev)


## 📝 Contributors
I would like to express my sincere gratitude to all the people who have collaborated in the development and advancement of this project. I appreciate your contributions.

[![](https://contrib.rocks/image?repo=AlexTorresDev/custom-electron-titlebar)](https://github.com/AlexTorresDev/custom-electron-titlebar/graphs/contributors)


## ✅ License
This project is under the [MIT](https://github.com/AlexTorresDev/custom-electron-titlebar/blob/master/LICENSE) license.
