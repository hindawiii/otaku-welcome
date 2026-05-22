export default function GamesRoomContent({ tab, color }: { tab: number; color: string }) {
  return (
    <div className="ogr-placeholder">
      <div className="ogr-placeholder-icon">🎮</div>
      <h3>غرفة الألعاب</h3>
      <p>
        في انتظار الملف الذي سترسله لإضافة محتوى أركان: أخبار · تصنيف · غرف لعب · مستواي.
        <br />الركن الحالي: <strong style={{ color }}>#{tab + 1}</strong>
      </p>
      <div className="ogr-placeholder-tag" style={{ background: `${color}26`, color }}>
        بانتظار المحتوى
      </div>
    </div>
  );
}
