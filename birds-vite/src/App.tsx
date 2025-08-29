import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { BirdsPage } from '@/components/BirdsPage';
import { BirdDetail } from '@/components/BirdDetail';

const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="w-full h-screen bg-white">
          <AppSidebar />
          {/* Content area: offset by 308px only on desktop, full width on mobile */}
          <main className="md:ml-[308px] ml-0 flex flex-col items-center p-0 bg-white h-screen">
            <Routes>
              <Route path="/" element={<BirdsPage />} />
              <Route path="/bird/:id" element={<BirdDetail />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
