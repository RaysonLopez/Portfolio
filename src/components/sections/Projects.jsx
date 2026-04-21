import { projects } from '../../data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <SectionReveal>
          <SectionTitle
            label="Proyectos Destacados"
            title="Trabajo Técnico"
            subtitle="Cada proyecto representa un problema real con una solución concreta y medible."
          />
        </SectionReveal>

        <div className="row g-4">
          {projects.map((project, i) => (
            <div className="col-12 col-md-6" key={project.id}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
