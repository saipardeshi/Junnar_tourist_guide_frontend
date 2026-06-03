export default function Background3D() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <source src="/video/video_bg_black_orange.mp4" type="video/mp4" />
    </video>
  );
}