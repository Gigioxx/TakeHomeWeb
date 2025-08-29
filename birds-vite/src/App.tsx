import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { BirdsPage } from '@/components/BirdsPage';
import { BirdDetail } from '@/components/BirdDetail';

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen bg-white flex overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<BirdsPage />} />
              <Route path="/bird/:id" element={<BirdDetail />} />
            </Routes>
          </main>
        </SidebarProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
