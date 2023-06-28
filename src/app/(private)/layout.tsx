import { PrivateRouter } from '@/components/PrivateRouter'
import './index.css'
import { Sidebar } from '@/components/Sidebar'
import { LayoutTitle } from '@/components/LayoutTitle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className='min-h-screen'>
        <PrivateRouter>
          {Date.now()}
          <div className='flex'>
            <Sidebar />
            <main className='w-full m-5'>
              <LayoutTitle />
              {children}
            </main>
          </div>
          <ToastContainer theme='colored' />
        </PrivateRouter>
      </body>
    </html>
  )
}
