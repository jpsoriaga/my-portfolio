import MainPage from './pages/MainPage.tsx'
import ProjectPage from './pages/ProjectPage.tsx'
import { projects } from './components/RecentProject/projects.ts'
import { usePathname } from './router.ts'

function App() {
  const pathname = usePathname()
  const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
  const project = projects.find((item) => item.slug === slug)

  // Unknown paths and projects without a detail page fall back to the home page.
  if (project?.details) {
    return <ProjectPage key={project.slug} project={{ ...project, details: project.details }} />
  }

  return (
    <>
      <MainPage />
    </>
  )
}

export default App
