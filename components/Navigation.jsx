"use client";
import { useEffect, useRef, useState } from "react";

const sections = [["featured", "Selected work"], ["work", "Films"], ["portraits", "Visual art"], ["about", "About"]];

export function Wordmark({ onClick }) {
  return <a className="wordmark" href="#top" aria-label="Nishan Singh Films home" onClick={onClick}>
    <span className="studio-mark" aria-hidden="true">n<span>.</span>s</span>
    <span className="studio-name">NISHAN SINGH<span>FILMS & VISUALS</span></span>
  </a>;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const header = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const targets = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    let frame = 0;
    function update() {
      frame = 0;
      const boundary = header.current.offsetHeight + 100;
      setActive(targets.filter(section => section.getBoundingClientRect().top <= boundary).pop()?.id);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function outside(event) { if (!header.current.contains(event.target)) setOpen(false); }
    const desktop = matchMedia("(min-width: 901px)");
    const collapse = () => setOpen(false);
    desktop.addEventListener("change", collapse);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      desktop.removeEventListener("change", collapse);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <header className="site-header" ref={header}
    onBlur={event => { if (event.relatedTarget && !header.current.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (open && event.key === "Escape") { setOpen(false); toggle.current.focus(); } }}>
    <div className="shell bar">
      <Wordmark onClick={() => setOpen(false)} />
      <button className="menu-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="studio-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span className="menu-icon" aria-hidden="true" /></button>
      <nav id="studio-nav" className={open ? "is-open" : ""} aria-label="Main navigation">
        {sections.map(([id, label]) => <a key={id} href={"#" + id} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#connect" onClick={() => setOpen(false)}>Let’s connect<span aria-hidden="true">✳</span></a>
      </nav>
    </div>
  </header>;
}
