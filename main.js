const { app, BrowserWindow, screen, ipcMain, Menu } = require('electron');
const path = require('path');

let floatBallWindow;
let mainWindow;

function createFloatBall() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  
  // 悬浮球大小
  const ballSize = 60;
  
  // 默认位置：屏幕右下角
  const x = screenWidth - ballSize - 20;
  const y = screenHeight - ballSize - 100;

  floatBallWindow = new BrowserWindow({
    width: ballSize,
    height: ballSize,
    x,
    y,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  floatBallWindow.loadFile('float-ball.html');
  
  floatBallWindow.on('focus', () => {
    floatBallWindow.blur();
  });
}

function createMainWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    x: screenWidth / 2 - 200,
    y: screenHeight / 2 - 250,
    frame: false, // 无边框
    resizable: false,
    skipTaskbar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('main-window.html');
  
  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (floatBallWindow) {
      floatBallWindow.show();
    }
  });
}

app.whenReady().then(() => {
  createFloatBall();
  
  // 创建右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        app.quit();
      }
    }
  ]);

  // 监听右键菜单事件
  ipcMain.on('show-context-menu', (event) => {
    contextMenu.popup(floatBallWindow);
  });

  // 监听窗口失去焦点事件，关闭菜单
  floatBallWindow.on('blur', () => {
    if (contextMenu) {
      contextMenu.closePopup();
    }
  });

  // 处理打开主窗口
  ipcMain.on('open-main-window', () => {
    if (floatBallWindow) {
      floatBallWindow.hide();
    }
    if (mainWindow) {
      mainWindow.show();
    } else {
      createMainWindow();
    }
  });

  // 处理关闭主窗口
  ipcMain.on('close-main-window', () => {
    if (mainWindow) {
      mainWindow.hide();
    }
    if (floatBallWindow) {
      floatBallWindow.show();
    }
  });

  // 处理获取窗口位置
  ipcMain.on('get-window-bounds', (event) => {
    const bounds = floatBallWindow.getBounds();
    event.returnValue = { x: bounds.x, y: bounds.y };
  });

  // 处理移动窗口
  ipcMain.on('move-window', (event, position) => {
    floatBallWindow.setPosition(position.x, position.y);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
