export function PlayIcon({ className = "" }) {
  return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 4.8a1 1 0 0 1 1.5-.86l11 7.2a1 1 0 0 1 0 1.72l-11 7.2A1 1 0 0 1 8 19.2Z" /></svg>;
}
export function VideoButtons({ project, play, sources = false }) {
  return <div className="video-links">
    {project.videos?.map(video => <button key={video.id} type="button" className="video-link" aria-haspopup="dialog" aria-label={video.label + " for " + project.title} onClick={() => play(project, video)}><PlayIcon />{video.label}</button>)}
    {sources && project.videos?.filter(video => video.source).map(video => <a key={video.id} className="video-source" href={video.source} target="_blank" rel="noopener noreferrer" aria-label={"YouTube source for " + project.title + " (opens in a new tab)"}>YouTube</a>)}
  </div>;
}
export function ProjectCard({ project, play, openArt }) {
  const [width, height] = project.thumbnailSize ?? [768, 432];
  return <article className={"art-card" + (project.vertical ? " art-card-vertical" : "")} data-group={project.group} data-reveal>
    <a className="card-media art-link" href={"/assets/" + project.id + ".webp"} aria-label={"View " + project.title + " artwork"} aria-haspopup="dialog" onClick={openArt}>
      <img src={"/assets/" + project.id + "-small.webp"} width={width} height={height} loading="lazy" alt={project.summary} />
      <span className="expand" aria-hidden="true">View artwork <span>+</span></span>
    </a>
    <div className="card-copy"><p className="category">{project.label}</p><h3>{project.title}</h3><VideoButtons project={project} play={play} sources /></div>
  </article>;
}
export function FeaturedFilm({ project, play }) {
  return <article className="featured-film" data-reveal>
    <button className="feature-media" type="button" onClick={() => play(project, project.videos[0])} aria-label={"Play " + project.title} aria-haspopup="dialog">
      <img src={"/assets/" + project.id + ".webp"} width="1536" height="864" alt={project.title + " film artwork"} loading="lazy" />
      <span className="feature-type">AI FILM</span><span className="film-play"><PlayIcon /><span>Watch film</span></span>
    </button>
    <div className="feature-caption"><div><p className="category">{project.label}</p><h3>{project.title}</h3></div><span className="caption-star" aria-hidden="true">✳</span></div>
    <VideoButtons project={project} play={play} />
  </article>;
}
