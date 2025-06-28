import React, {  useState, useRef, useEffect, ReactNode } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, ExternalLink, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import './styles/ContactSection.css';

interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
}

interface GlobeRefs {
  globe: THREE.Mesh;
  particles: THREE.Points;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  
  // Form refs with proper typing
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const socialLinks: SocialLink[] = [
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/yourprofile', 
      icon: <Linkedin className="w-5 h-5" />,
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/Midnight-W4lker', 
      icon: <Github className="w-5 h-5" />,
    },
    { 
      name: 'Kaggle', 
      url: 'https://kaggle.com/yourprofile', 
      icon: <ExternalLink className="w-5 h-5" />,
    }
  ];

  // Initialize Three.js Globe
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create Globe
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
      wireframe: true
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add particles around globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 3;

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    globeRef.current = { globe, particles: particlesMesh };

    // Animation loop
    const animate = (): void => {
      requestAnimationFrame(animate);
      
      if (globeRef.current) {
        globeRef.current.globe.rotation.y += 0.005;
        globeRef.current.particles.rotation.y += 0.001;
        globeRef.current.particles.rotation.x += 0.001;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = (): void => {
      if (mountRef.current && rendererRef.current) {
        const size = Math.min(mountRef.current.clientWidth, 400);
        rendererRef.current.setSize(size, size);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    
    // Get values using refs with proper null checks
    const name = nameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const subject = subjectRef.current?.value?.trim();
    const message = messageRef.current?.value?.trim();
    
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    
    try {
      const response = await fetch('https://formspree.io/f/xblypngz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        // Clear form using refs
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (subjectRef.current) subjectRef.current.value = '';
        if (messageRef.current) messageRef.current.value = '';
        
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section">      
      {/* Left Half - Contact Form */}
      <div className="contact-form-section">
        {/* Background Effects for Left Side */}
        <div className="background-effects">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
        </div>

        <div className="form-container">
          {/* Header */}
          <div className="header-section">
            <div className="connect-badge">
              <Send className="w-4 h-4" />
              Let's Connect
            </div>
            
            <h2 className="main-title">
              Get In <span className="title-accent">Touch</span>
            </h2>
            
            <p className="subtitle">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <Mail className="w-5 h-5" />
              </div>
              <a href="mailto:aliabid.2259@gmail.com" className="contact-link">
                aliabid.2259@gmail.com
              </a>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Phone className="w-5 h-5" />
              </div>
              <a href="tel:+923045949011" className="contact-link">
                +92 304 5949011
              </a>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="contact-text">Bahria Town, Islamabad, Pakistan</span>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="success-message animate-pulse">
              <CheckCircle className="flex-shrink-0 w-5 h-5" />
              <span>Message sent successfully! I'll get back to you soon.</span>
            </div>
          )}

          {/* Contact Form */}
          <div className="form-fields">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name" className="field-label">Name *</label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="field-label">Email *</label>
                <input
                  ref={emailRef}
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject" className="field-label">Subject *</label>
              <input
                ref={subjectRef}
                id="contact-subject"
                type="text"
                name="subject"
                autoComplete="off"
                required
                className="form-input"
                placeholder="What's this about?"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message" className="field-label">Message *</label>
              <textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                rows={5}
                autoComplete="off"
                required
                className="form-textarea"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <p className="social-label">Follow me on</p>
            <div className="social-links">
              {socialLinks.map((link: SocialLink, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Animated Globe */}
      <div className="globe-section">
        {/* Background Effects for Right Side */}
        <div className="globe-background">
          <div className="globe-gradient-1"></div>
          <div className="globe-gradient-2"></div>
        </div>

        {/* Globe Container */}
        <div className="globe-container">
          <div className="globe-header">
            <h3 className="globe-title">
              Connect <span className="globe-accent">Globally</span>
            </h3>
            <p className="globe-subtitle">
              Reach out from anywhere in the world
            </p>
          </div>
          
          <div ref={mountRef} className="globe-mount" />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;