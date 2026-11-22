"use client";

import { useEffect, useRef, useState } from "react";
import { loadYouTubeApi } from "../lib/youtube";

export default function YouTubePlayer({ project, video }) {
  const mount = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [playerState, setPlayerState] = useState(-1);
  const [attempt, setAttempt] = useState(0);
  const watchUrl = video.source ?? "https://www.youtube.com/watch?v=" + video.id;
  const embeddingBlocked = error === 101 || error === 150;

  function retry() {
    setError(null);
    setReady(false);
    setPlayerState(-1);
    setAttempt(value => value + 1);
  }

  useEffect(() => {
    let cancelled = false;
    let player;
    loadYouTubeApi().then(YT => {
      if (cancelled) return;
      const target = document.createElement("div");
      mount.current.appendChild(target);
      player = new YT.Player(target, {
        host: "https://www.youtube-nocookie.com",
        videoId: video.id,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, origin: window.location.origin, widget_referrer: window.location.href },
        events: {
          onReady: event => {
            if (cancelled) return;
            event.target.getIframe().title = project.title + " — " + video.label;
            event.target.getIframe().referrerPolicy = "strict-origin-when-cross-origin";
            setReady(true);
          },
          onError: event => { if (!cancelled) setError(event.data); },
          onStateChange: event => { if (!cancelled) setPlayerState(event.data); },
        },
      });
    }).catch(() => { if (!cancelled) setError("network"); });
    return () => { cancelled = true; player?.destroy(); };
  }, [video.id, video.label, project.title, attempt]);

  return <div className="youtube-player" data-player-ready={ready} data-player-state={playerState} data-player-error={error ?? undefined}>
    <div className="youtube-mount" ref={mount} hidden={error !== null} />
    {error !== null && <div className="video-fallback" role="status">
      <img src={"/assets/" + project.id + ".webp"} alt="" />
      <div><p className="eyebrow">{project.title}</p><h3>{embeddingBlocked ? "Watch this film on YouTube" : "The player couldn’t load"}</h3><p>{embeddingBlocked ? "YouTube is not allowing this video to play on other websites right now." : "Try again, or open the original video on YouTube."}</p>
        <div className="video-fallback-actions"><a className="primary" href={watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a><button className="video-retry" type="button" onClick={retry}>Try again</button></div>
      </div>
    </div>}
  </div>;
}
