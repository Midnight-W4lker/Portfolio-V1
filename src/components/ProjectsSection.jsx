import React, { useState } from 'react';
import './styles/ProjectsSection.css';

const ProjectsSection = ({
  title = "Featured Projects",
  projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "A comprehensive analytics dashboard for e-commerce businesses with real-time data visualization and reporting features.",
      techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
      githubUrl: "https://github.com/Midnight-W4lker",
      demoUrl: "https://github.com/Midnight-W4lker",
      imageUrl: null,
      featured: true
    },
    {
      id: 2,
      title: "Data Science Pipeline",
      description: "Automated machine learning pipeline for customer churn prediction with 94% accuracy using Python and scikit-learn.",
      techStack: ["Python", "Pandas", "Scikit-learn", "Flask"],
      githubUrl: "https://github.com/Midnight-W4lker",
      demoUrl: "https://github.com/Midnight-W4lker",
      imageUrl: null,
      featured: true
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, file sharing, and team communication features.",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
      githubUrl: "https://github.com/Midnight-W4lker",
      demoUrl: "https://github.com/Midnight-W4lker",
      imageUrl: null,
      featured: false
    }
  ]
}) => {

  const getTechStackColor = (tech) => {
    const colors = {
      'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Node.js': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Python': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'TypeScript': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Vue.js': 'bg-green-600/20 text-green-400 border-green-600/30',
      'MongoDB': 'bg-green-700/20 text-green-400 border-green-700/30',
      'Firebase': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'default': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return colors[tech] || colors.default;
  };

  const ProjectCard = ({ project }) => {
    const [glowPos, setGlowPos] = useState({ x: "50%", y: "50%" });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setGlowPos({
        x: `${e.clientX - rect.left}px`,
        y: `${e.clientY - rect.top}px`
      });
    };

    return (
      <div
        onMouseMove={handleMouseMove}
        className="relative group rounded-xl overflow-hidden bg-gray-800/60 backdrop-blur-sm transition duration-500 hover:scale-105"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${glowPos.x} ${glowPos.y}, rgba(6, 182, 212, 0.3), transparent 40%)`,
            transition: 'background 100ms linear'
          }}
        />
        <div className="relative p-6 space-y-4 z-10">
          <div className="relative mb-4 overflow-hidden rounded-lg">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
            )}
            {project.featured && (
              <div className="absolute top-3 right-3 bg-cyan-500 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getTechStackColor(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300 text-sm font-medium"
              >
                Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg transition duration-300 text-sm font-medium"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A few teasers of the art I create with code and data.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
