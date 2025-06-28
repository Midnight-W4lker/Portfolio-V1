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
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<GlobeRefs | null>(null);
  
  // Form refs with proper typing
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
      url: 'https://kaggle.com/midnightw4lker', 
      icon: <ExternalLink className="w-5 h-5" />,
    }
  ];

  // Initialize Three.js Globe
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Make the canvas bigger
    renderer.setSize(520, 520);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Bigger, glassy globe
    const globeGeometry = new THREE.SphereGeometry(1.8, 64, 64);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22e6ff,
      metalness: 0.7,
      roughness: 0.15,
      transmission: 0.85,
      thickness: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      iridescence: 0.5,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 400],
      sheen: 0.5,
      sheenColor: new THREE.Color(0x7fffd4),
      emissive: new THREE.Color(0x1de9b6),
      emissiveIntensity: 0.18,
      transparent: true,
      opacity: 0.92,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Bigger orbiting ring 1 (cyan)
    const ring1Geometry = new THREE.TorusGeometry(2.6, 0.045, 24, 120);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    // Bigger orbiting ring 2 (blue, tilted)
    const ring2Geometry = new THREE.TorusGeometry(3.1, 0.032, 24, 120);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.32,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 3.5;
    ring2.rotation.z = Math.PI / 4;
    scene.add(ring2);

    // Space-like particles
    const particleCount = 350;
    const particleGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      // Random position in a shell around the globe
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 3.6 + Math.random() * 1.5;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      // Cyan/blue/white color
      const color = new THREE.Color().setHSL(0.5 + 0.2 * Math.random(), 0.7, 0.7 + 0.2 * Math.random());
      colors.push(color.r, color.g, color.b);
    }
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Soft glow (optional)
    const glowGeometry = new THREE.SphereGeometry(2.0, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22e6ff,
      transparent: true,
      opacity: 0.08,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00bcd4, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffff, 1.2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    // Animate globe color for a subtle aurora effect
    let hue = 0.5;
    function animateGlobeColor() {
      hue += 0.0008;
      if (hue > 0.7) hue = 0.5;
      const color = new THREE.Color().setHSL(hue, 0.7, 0.55);
      globeMaterial.color.copy(color);
      globeMaterial.sheenColor.copy(color.clone().lerp(new THREE.Color(0xffffff), 0.5));
      globeMaterial.emissive.copy(color.clone().lerp(new THREE.Color(0x1de9b6), 0.6));
    }

    // Animation loop
    const animate = (): void => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      ring1.rotation.y += 0.019;
      ring2.rotation.y += 0.009;
      particles.rotation.y += 0.002;
      animateGlobeColor();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = (): void => {
      if (mountRef.current && renderer) {
        const size = Math.min(mountRef.current.clientWidth, 520);
        renderer.setSize(size, size);
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
      <div className="contact-form-section ">  {/*w-full lg:w-1/2 */}
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

      {/* Right Half - Animated Globe*/}
      <div className="globe-section">
        {/* Background Effects for Right Side  */}
        <div className="globe-background">
          <div className="globe-gradient-1"></div>
          <div className="globe-gradient-2"></div>
        </div>

        {/* Globe Container */}
        <div className="globe-container flex items-center justify-center w-[520px] h-[520px] mx-auto relative">
          <div className="globe-header">
            <h3 className="globe-title">
              Connect <span className="globe-accent">Globally</span>
            </h3>
            <p className="globe-subtitle">
              Reach out from anywhere in the world
            </p>
          </div>
          
          <div ref={mountRef} className="globe-mount w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;