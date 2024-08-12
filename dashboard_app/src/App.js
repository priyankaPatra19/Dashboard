import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Calendar, Kanban, Line, Area, Bar, Pie } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';

function App() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            <button type="button"
              onClick={() => setThemeSettings(true)} 
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray">
              <FiSettings/>
            </button>
          </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar></Sidebar>
            </div>
          ):(
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar></Sidebar>
            </div>
          )}
          <div className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }>
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar></Navbar>
              </div>
          
          <div>
            { themeSettings && <ThemeSettings></ThemeSettings>}
            <Routes>
            <Route path="/" element={(<Calendar />)} />

                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />

                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
            </Routes>
          </div>
          <Footer></Footer>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
