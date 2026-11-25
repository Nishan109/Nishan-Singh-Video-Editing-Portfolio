"use client";
import { useEffect, useRef, useState } from "react";
import Navigation, { Wordmark } from "./Navigation";
import { FeaturedFilm, PlayIcon, ProjectCard } from "./Films";
import { ArtworkViewer, VideoViewer } from "./Viewers";
import { projects, mobileProjects, portraits, studies } from "../lib/projects";
import { getHeroParallax } from "../lib/hero-parallax";

const featured = ["the-gilded-chronicles", "winter-is-coming", "the-last-ride"].map(id => projects.find(project => project.id === id));
const heroTrailer = projects.find(project => project.id === "twin-earth");
const disciplines = ["VIDEO EDITING", "AI FILMMAKING", "CINEMATIC STORYTELLING", "VISUAL ART"];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [selection, setSelection] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [textPaused, setTextPaused] = useState(false);
  const progress = useRef(null);
  const hero = useRef(null);
  const visible = filter === "all" ? projects : projects.filter(project => project.group === filter);
  useEffect(() => {
    let frame;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 650px)");
    const update = () => {
      frame = null;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
      if (hero.current) {
        const bounds = hero.current.getBoundingClientRect();
        const { offset, range } = getHeroParallax(bounds.top, bounds.height, { compact: compact.matches, reducedMotion: reducedMotion.matches });
        hero.current.style.setProperty("--hero-parallax-y", offset + "px");
        hero.current.style.setProperty("--hero-parallax-range", range + "px");
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
    };
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [filter]);
  function play(project, video) { setPlaying({ project, video }); }
  function openArt(event, items, index) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setSelection({ items, index });
  }
  function cards(items) { return items.map((project, index) => <ProjectCard key={project.id} project={project} play={play} openArt={event => openArt(event, items, index)} />); }
  function gallery(items, isStudy) {
    return items.map((item, index) => <a key={item.id} href={item.artwork} className={isStudy ? "study-poster art-link" : "portrait-piece art-link"} aria-label={"View " + item.title + (isStudy ? " character poster" : " portrait")} aria-haspopup="dialog" onClick={event => openArt(event, items, index)} data-reveal>
      <div className="portrait-image"><img src={item.artwork.replace(".webp", "-small.webp")} alt={item.alt} width={item.width} height={item.height} loading="lazy" /><span className="art-plus" aria-hidden="true">+</span></div>
      <span className="portrait-caption">{item.title}<span aria-hidden="true">+</span></span>
    </a>);
  }
  return <>
    <a className="skip" href="#featured">Skip to selected work</a><div className="reading-progress" ref={progress} aria-hidden="true" /><Navigation />
    <main>
      <section className="hero" ref={hero} aria-labelledby="intro-name">
        <div className="hero-visual">
          <img className="hero-portrait" src="/assets/hero-cinematic-16x9.webp" width="1664" height="936" fetchPriority="high" alt="Cinematic wide portrait of Nishan Singh in a black turban, lit by amber window light against a dark studio wall" />
        </div>
        <div className="shell hero-inner">
        <div className="hero-topline"><p className="eyebrow">INDEPENDENT FILMMAKER & VISUAL ARTIST</p><span className="hero-location">A DIFFERENT WAY OF SEEING.</span></div>
        <div className="hero-stage">
          <div className="hero-copy">
            <h1 id="intro-name"><span>I MAKE</span><span>STORIES</span><span className="hero-last"><em>FEEL.</em><span className="hero-asterisk" aria-hidden="true">✳</span></span></h1>
            <div className="hero-loop" data-paused={textPaused}>
              <span className="loop-spark" aria-hidden="true">✳</span>
              <span className="loop-viewport" aria-hidden="true"><span className="loop-track">
                {[...disciplines, disciplines[0]].map((discipline, index) => <span key={index}>{discipline}</span>)}
              </span></span>
              <span className="visually-hidden">My craft: video editing, AI filmmaking, cinematic storytelling, and visual art.</span>
              <button className="loop-toggle" type="button" aria-label={textPaused ? "Play text animation" : "Pause text animation"} title={textPaused ? "Play text animation" : "Pause text animation"} onClick={() => setTextPaused(paused => !paused)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{textPaused ? <path d="m8 5 12 7-12 7Z" /> : <><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></>}</svg>
              </button>
            </div>
            <div className="hero-description"><span className="small-cross" aria-hidden="true">+</span><p>I’m Nishan Singh. I turn raw ideas into<br className="desktop-break" /> films, frames, and feelings that stay.</p></div>
            <a className="primary" href="#featured">Discover my work<span className="button-spark" aria-hidden="true">✳</span></a>
          </div>
        </div>
        <div className="hero-bottom"><p>STORIES WITH INTENT.<br /><span>EVERY FRAME, A FEELING.</span></p><a className="scroll-cue" href="#featured"><span className="scroll-track" aria-hidden="true"><i /></span>Scroll to explore</a><button className="trailer-cue" onClick={() => play(heroTrailer, heroTrailer.videos[0])} type="button" aria-haspopup="dialog"><span className="trailer-image"><img src="/assets/twin-earth-small.webp" alt="" width="768" height="432" /><span><PlayIcon /></span></span><span><small>STEP INTO MY WORLD</small><strong>Watch Twin Earth</strong></span></button></div>
        </div>
      </section>
      <div className="discipline-strip" aria-label="Creative disciplines"><div className="discipline-track">{[0, 1].map(copy => <div className="discipline-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>{disciplines.map(label => <span key={label}>{label}<span aria-hidden="true">✳</span></span>)}</div>)}</div></div>
      <section className="featured-section section shell" id="featured" aria-labelledby="featured-heading">
        <div className="section-topline" data-reveal><p className="eyebrow">A FEW WORLDS I’VE CREATED</p><span className="section-note">A selection of films & concepts</span></div>
        <div className="section-heading" data-reveal><h2 id="featured-heading">SELECTED <em>WORK.</em></h2><a className="text-link" href="#work">Explore all films<span className="link-mark" aria-hidden="true">+</span></a></div>
        <div className="featured-films">{featured.map(project => <FeaturedFilm key={project.id} project={project} play={play} />)}</div>
      </section>
      <section className="archive-section" id="work" aria-labelledby="work-heading"><div className="section shell">
        <div className="section-topline" data-reveal><p className="eyebrow">THE FILM ARCHIVE</p><span className="section-note">Imagination. Cut into reality.</span></div>
        <div className="section-heading" data-reveal><h2 id="work-heading">WORLD BY <em>WORLD.</em></h2><p className="heading-description">Sci-fi worlds. Human stories. A little<br />of the unexpected in every frame.</p></div>
        <div className="archive-toolbar"><div className="filters" aria-label="Filter projects" role="group">{[["all", "All work"], ["film", "AI films"], ["music-brand", "Music & brand"]].map(([id, label]) => <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}<span>{id === "all" ? projects.length : projects.filter(project => project.group === id).length}</span></button>)}</div><p id="filter-status" aria-live="polite">{visible.length} projects</p></div>
        <div className={"project-grid" + (visible.length < 3 ? " compact-grid" : "")} id="projects">{cards(visible)}</div>
      </div></section>
      <section className="mobile-section section shell" id="mobile" aria-labelledby="mobile-heading">
        <div className="section-topline" data-reveal><p className="eyebrow">SMALL CAMERA. BIG FEELING.</p><span className="section-note">Shot on a mobile camera</span></div>
        <div className="section-heading" data-reveal><h2 id="mobile-heading">POCKET <em>CINEMA.</em></h2><p className="heading-description">An open road. Everyday objects.<br />A new perspective is all it takes.</p></div>
        <div className="mobile-grid">{cards(mobileProjects)}</div>
      </section>
      <section className="portrait-section" id="portraits" aria-labelledby="portrait-heading"><div className="section shell">
        <div className="section-topline" data-reveal><p className="eyebrow">BEYOND THE MOVING IMAGE</p><span className="section-note">AI portrait art & visual explorations</span></div>
        <div className="section-heading" data-reveal><h2 id="portrait-heading">STILL. <em>ALIVE.</em></h2><p className="heading-description">Studies in light, character, and the<br />stories a single image can hold.</p></div>
        <div className="portrait-collection">{gallery(portraits, false)}</div><div className="studies-heading" data-reveal><h3>Characters from other worlds.</h3><p className="category">FILM CHARACTER STUDIES</p></div><div className="portrait-grid">{gallery(studies, true)}</div>
      </div></section>
      <section className="about-section section shell" id="about" aria-labelledby="about-heading">
        <div className="about-art" data-reveal><img src="/assets/blue-spotlight.webp" alt="Nishan seated beneath a cinematic blue spotlight" width="472" height="880" loading="lazy" /><span className="about-art-label">ALWAYS CHASING THE NEXT FRAME.</span><span className="about-star" aria-hidden="true">✳</span></div>
        <div className="about-content" data-reveal><p className="eyebrow">THE MIND BEHIND THE MOTION</p><h2 id="about-heading">A STORYTELLER.<br />AN EDITOR.<br /><em>ALWAYS CURIOUS.</em></h2><p className="about-copy">I’m Nishan Singh, a video editor and AI visual artist exploring where cinematic storytelling meets new possibilities.</p><p className="about-copy">From imagined worlds to moments captured on my phone, I build films and images around one thing: how they make you feel.</p><div className="practice"><span>Video editing</span><span>AI filmmaking</span><span>Mobile cinematography</span><span>Visual art</span></div><a className="text-link" href="https://www.youtube.com/@woxoraweb" target="_blank" rel="noopener noreferrer">More of my world on YouTube<span className="link-mark" aria-hidden="true">+</span></a></div>
      </section>
      <section className="connect-section" id="connect" aria-labelledby="connect-heading"><div className="shell connect-inner" data-reveal><p className="eyebrow">THE NEXT FRAME IS UNWRITTEN.</p><h2 id="connect-heading">LET’S MAKE<br /><em>SOMETHING MOVE.</em></h2><div className="connect-bottom"><p>Good stories start with a connection.<br />Find me and my latest work on YouTube.</p><a className="primary light-button" href="https://www.youtube.com/@woxoraweb" target="_blank" rel="noopener noreferrer">Let’s connect on YouTube<span className="button-spark" aria-hidden="true">✳</span></a></div><span className="connect-star" aria-hidden="true">✳</span></div></section>
    </main>
    <footer><div className="shell footer-top"><Wordmark /><p>MADE WITH INTENT. EDITED WITH FEELING.</p><a className="back" href="#top">Back to top<span aria-hidden="true">+</span></a></div><div className="shell footer-bottom"><p>© {new Date().getFullYear()} Nishan Singh Films</p><span>INDEPENDENT VISION. ENDLESS POSSIBILITIES.</span></div></footer>
    {selection && <ArtworkViewer selection={selection} move={index => setSelection({ ...selection, index })} play={play} dismiss={() => setSelection(null)} />}
    {playing && <VideoViewer {...playing} dismiss={() => setPlaying(null)} />}
  </>;
}
