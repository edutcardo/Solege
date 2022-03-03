import { useState, useEffect } from 'react'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectCard from '../project/ProjectCard'
import styles from './Projects.module.css'

function Company() {
  
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch('http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
          }),
      100,
    )
  }, [])

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
      </div>
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
          
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>

  );
        }

export default Company