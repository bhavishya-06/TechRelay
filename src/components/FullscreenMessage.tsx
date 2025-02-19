function FullscreenMessage() {
  return (
    <div className="fullscreen-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="message-container">
        {/* Your message content */}
      </div>
    </div>
  );
} 