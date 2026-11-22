import { useLayoutEffect, useRef } from "react";
import { VideoButtons } from "./Films";
import YouTubePlayer from "./YouTubePlayer";

function useModal() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog.showModal();
    return () => { dialog.close(); opener?.focus(); };
  }, []);
  return ref;
}

export function VideoViewer({ project, video, dismiss }) {
  const ref = useModal();
  return <dialog ref={ref} className={"viewer video-viewer" + (project.vertical ? " video-viewer-vertical" : "")}
    aria-labelledby="video-title" onCancel={event => { event.preventDefault(); dismiss(); }}>
    <div className="viewer-bar"><h2 id="video-title">{project.title}</h2>
      <button type="button" className="close" aria-label="Close video" onClick={dismiss}>×</button>
    </div>
    <div className="video-screen">
      <YouTubePlayer key={video.id} project={project} video={video} />
    </div>
    <div className="video-footer"><span>Watch here or open the original video.</span><a href={video.source ?? "https://www.youtube.com/watch?v=" + video.id} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></div>
  </dialog>;
}

export function ArtworkViewer({ selection, move, play, dismiss }) {
  const ref = useModal();
  const { items, index } = selection;
  const project = items[index];
  return <dialog ref={ref} className="viewer" aria-labelledby="viewer-title"
    onCancel={event => { event.preventDefault(); dismiss(); }}
    onKeyDown={event => {
      if (event.key === "ArrowLeft" && index > 0) move(index - 1);
      if (event.key === "ArrowRight" && index < items.length - 1) move(index + 1);
    }}>
    <div className="viewer-bar"><div><p className="category">{project.label}</p><h2 id="viewer-title">{project.title}</h2></div>
      <button className="close" type="button" aria-label="Close artwork" onClick={dismiss}>×</button>
    </div>
    <img src={project.artwork ?? "/assets/" + project.id + ".webp"} alt={project.alt ?? project.summary} />
    <div className="viewer-details">
      <div className="viewer-copy">{project.summary && <p>{project.summary}</p>}
        {project.videos && <VideoButtons project={project} play={play} />}
      </div>
      <div className="viewer-actions">
        <button type="button" disabled={index === 0} onClick={() => move(index - 1)}>Previous</button>
        <button type="button" disabled={index === items.length - 1} onClick={() => move(index + 1)}>Next</button>
      </div>
    </div>
  </dialog>;
}
