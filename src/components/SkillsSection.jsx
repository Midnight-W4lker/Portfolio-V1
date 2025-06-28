import React, { useState } from 'react';

const SkillsSection = ({ 
  title = "Skills & Expertise",
  skillCategories = [
    {
      id: 'data-science',
      name: 'Data Science',
      icon: '📊',
      skills: [
        { name: 'Python', level: 95, description: 'Advanced proficiency in data analysis and machine learning' },
        { name: 'Machine Learning', level: 90, description: 'Scikit-learn, TensorFlow, PyTorch' },
        { name: 'Data Visualization', level: 88, description: 'Matplotlib, Seaborn, Plotly, Tableau' },
        { name: 'SQL', level: 85, description: 'PostgreSQL, MySQL, complex queries and optimization' },
        { name: 'Statistics', level: 82, description: 'Statistical analysis, hypothesis testing, A/B testing' },
        { name: 'Big Data', level: 78, description: 'Apache Spark, Hadoop, distributed computing' }
      ]
    },
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: '💻',
      skills: [
        { name: 'React', level: 92, description: 'Advanced React development with hooks and modern patterns' },
        { name: 'JavaScript', level: 90, description: 'ES6+, async programming, DOM manipulation' },
        { name: 'Node.js', level: 85, description: 'Express.js, API development, microservices' },
        { name: 'CSS/Tailwind', level: 88, description: 'Responsive design, modern CSS, Tailwind CSS' },
        { name: 'TypeScript', level: 80, description: 'Type-safe development, interfaces, generics' },
        { name: 'Next.js', level: 78, description: 'Full-stack React framework, SSR, API routes' }
      ]
    },
    {
      id: 'tools',
      name: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, description: 'Version control, branching strategies, collaboration' },
        { name: 'Docker', level: 85, description: 'Containerization, Docker Compose, deployment' },
        { name: 'AWS', level: 82, description: 'EC2, S3, Lambda, RDS, cloud architecture' },
        { name: 'MongoDB', level: 80, description: 'NoSQL database design, aggregation, indexing' },
        { name: 'Linux', level: 78, description: 'Command line, shell scripting, server administration' },
        { name: 'CI/CD', level: 75, description: 'GitHub Actions, automated testing and deployment' }
      ]
    }
  ]
}) => {
  const [activeTab, setActiveTab] = useState(skillCategories[0]?.id || 'data-science');

  const activeCategory = skillCategories.find(cat => cat.id === activeTab);

  const getSkillColor = (level) => {
    if (level >= 90) return 'from-cyan-500 to-cyan-400';
    if (level >= 80) return 'from-blue-500 to-blue-400';
    if (level >= 70) return 'from-green-500 to-green-400';
    return 'from-yellow-500 to-yellow-400';
  };

  const getSkillBorderColor = (level) => {
    if (level >= 90) return 'border-cyan-500/30';
    if (level >= 80) return 'border-blue-500/30';
    if (level >= 70) return 'border-green-500/30';
    return 'border-yellow-500/30';
  };

  const SkillBar = ({ skill, index }) => (
    <div 
      className="group bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300">
            {skill.name}
          </h4>
          <p className="text-gray-400 text-sm mt-1 leading-relaxed">
            {skill.description}
          </p>
        </div>
        <span className="text-cyan-400 font-semibold text-sm ml-4">
          {skill.level}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full transition-all duration-1000 ease-out transform origin-left`}
            style={{ 
              width: `${skill.level}%`,
              animation: 'slideIn 1s ease-out forwards'
            }}
          />
        </div>
        
        {/* Skill Level Indicator */}
        <div 
          className="absolute -top-1 w-4 h-4 bg-white rounded-full border-2 border-cyan-500 shadow-lg transition-all duration-1000"
          style={{ 
            left: `calc(${skill.level}% - 8px)`,
            animation: 'slideIn 1s ease-out forwards'
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across 
            different domains of software development and data science.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 shadow-lg transform scale-105'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-cyan-500/30 hover:text-cyan-300'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Content */}
        <div className="relative">
          {activeCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {activeCategory.skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {skillCategories.reduce((total, cat) => total + cat.skills.length, 0)}+
            </div>
            <div className="text-gray-300 font-medium">Technical Skills</div>
            <div className="text-gray-500 text-sm mt-1">Across multiple domains</div>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
            <div className="text-gray-300 font-medium">Years Experience</div>
            <div className="text-gray-500 text-sm mt-1">In software development</div>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
            <div className="text-gray-300 font-medium">Projects Completed</div>
            <div className="text-gray-500 text-sm mt-1">Personal and professional</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6 text-lg">
            Want to see these skills in action?
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 transform hover:scale-105"
          >
            View My Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Animations */}
      <div>
        <div className="absolute inset-0 pointer-events-none">
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideIn {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.6s ease-out forwards;
            }
          `
        }}
      />
    </section>
  );
};

export default SkillsSection;