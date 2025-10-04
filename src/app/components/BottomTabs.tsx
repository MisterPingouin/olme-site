export default function BottomTabs() {
  return (
    <nav aria-label="Sections"
         className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[92%] max-w-[1100px]">
      <div className="tabs-wrap">
        <a href="#mixologie" className="tab-chip tab-chip--active">
          <span className="tab-num">01</span><span className="tab-label">Mixologie</span>
        </a>
        <a href="#vins" className="tab-chip">
          <span className="tab-num">02</span><span className="tab-label">Vins, bières & softs</span>
        </a>
        <a href="#food" className="tab-chip">
          <span className="tab-num">03</span><span className="tab-label">Brut Food</span>
        </a>
        <a href="#infos" className="tab-chip">
          <span className="tab-num">04</span><span className="tab-label">Infos pratiques</span>
        </a>
      </div>
    </nav>
  );
}
