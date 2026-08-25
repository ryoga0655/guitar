import React, { useState, useEffect } from 'react';
import { Star, Plus, Search, Pencil, Trash2, ChevronDown, Shuffle, PlayCircle, Home, Trophy } from 'lucide-react';

const COLORS = {
  bg: '#17110D',
  surface: '#241B15',
  surfaceHover: '#2E231B',
  border: '#3D2E22',
  text: '#F3E9D5',
  textMuted: '#B8A88C',
  gold: '#CBA135',
  goldBright: '#E4C566',
};

const FONT_DISPLAY = "'Shippori Mincho', serif";
const FONT_BODY = "'Zen Kaku Gothic New', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

const RANKS = [
  { key: 'S', label: '挑戦', color: '#C1443A' },
  { key: 'A', label: '練習', color: '#D98A3D' },
  { key: 'B', label: '標準', color: '#CBA135' },
  { key: 'C', label: '入門', color: '#6E9B7C' },
  { key: 'D', label: '簡単', color: '#5C84A6' },
];

const CATEGORIES = [
  { key: 'chords', label: 'コード' },
  { key: 'stroke', label: 'ストローク' },
  { key: 'rhythm', label: 'リズム' },
  { key: 'arpeggio', label: 'アルペジオ' },
];

const PROFILES = ['ゆうこ', 'なつか', 'りょうが'];

const RANK_ORDER = { S: 0, A: 1, B: 2, C: 3, D: 4 };

const LEVEL_NAMES = ['みならい', '初級', '中級', '上級', '達人'];

function levelName(value) {
  return value ? LEVEL_NAMES[value - 1] : '未評価';
}

const OLLIES_CHANNEL_HANDLE = 'olliesdaigo'; // オーリーズの音楽室

function youtubeSearchUrl(title) {
  return `https://www.youtube.com/@${OLLIES_CHANNEL_HANDLE}/search?query=${encodeURIComponent(title)}`;
}

const SEED_SONGS = [
  { id: 'seed-marigold', title: 'マリーゴールド', artist: 'あいみょん', genre: 'J-POP', difficulty: 'B', chords: 4, stroke: 4, rhythm: 3, arpeggio: 2 },
  { id: 'seed-aotonatsu', title: '青と夏', artist: 'Mrs. GREEN APPLE', genre: 'J-POP/ロック', difficulty: 'S', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-ginnoryu', title: '銀の龍の背に乗って', artist: '中島みゆき', genre: 'J-POP', difficulty: 'S', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-haikei-shounen', title: '拝啓、少年よ', artist: 'Hump Back', genre: 'ロック', difficulty: 'A', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-katsushika-rhapsody', title: '葛飾ラプソディー', artist: '堂島孝平', genre: 'J-POP', difficulty: 'A', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-chandelier', title: 'シャンデリヤ', artist: 'THEE MICHELLE GUN ELEPHANT', genre: 'ロック', difficulty: 'B', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-cherry', title: 'チェリー', artist: 'スピッツ', genre: 'J-POP/ロック', difficulty: 'B', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-countryroad', title: 'カントリー・ロード', artist: '本名陽子', genre: '映画音楽(耳をすませば)', difficulty: 'C', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-soramotoberuhazu', title: '空も飛べるはず', artist: 'スピッツ', genre: 'J-POP/ロック', difficulty: 'C', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-yorunikakeru', title: '夜に駆ける', artist: 'YOASOBI', genre: 'J-POP', difficulty: 'S', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-marunouchi-sadistic', title: '丸の内サディスティック', artist: '椎名林檎', genre: 'J-POP/ロック', difficulty: 'S', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
  { id: 'seed-himawari-no-yakusoku', title: 'ひまわりの約束', artist: '秦基博', genre: 'J-POP', difficulty: 'A', chords: 0, stroke: 0, rhythm: 0, arpeggio: 0 },
];

function useGoogleFonts() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
}

function Pick({ color, size = 44 }) {
  return (
    <svg width={size} height={size * 1.14} viewBox="0 0 100 114" style={{ display: 'block' }}>
      <path
        d="M50,4 C74,4 94,26 94,52 C94,72 82,90 62,104 C56,109 50,112 50,112 C50,112 44,109 38,104 C18,90 6,72 6,52 C6,26 26,4 50,4 Z"
        fill={color}
      />
    </svg>
  );
}

function RankBadge({ rankKey, size = 44 }) {
  const rank = RANKS.find((r) => r.key === rankKey) || RANKS[2];
  return (
    <div className="relative shrink-0" style={{ width: size, height: size * 1.14 }}>
      <Pick color={rank.color} size={size} />
      <span
        className="absolute inset-0 flex items-center justify-center font-bold"
        style={{ fontFamily: FONT_DISPLAY, color: '#17110D', fontSize: size * 0.4, paddingBottom: size * 0.16 }}
      >
        {rank.key}
      </span>
    </div>
  );
}

function ProfileButton({ name, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-2xl border p-5 flex flex-col items-center gap-2"
      style={{
        borderColor: active ? COLORS.gold : COLORS.border,
        background: active ? 'rgba(203,161,53,0.10)' : COLORS.surface,
      }}
    >
      <Pick color={active ? COLORS.gold : COLORS.border} size={40} />
      <span style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 15 }}>{name}</span>
    </button>
  );
}

function ProfileSwitchModal({ current, onSelect, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(10,7,5,0.72)' }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
        <h2 className="text-xl mb-1" style={{ fontFamily: FONT_DISPLAY, color: COLORS.text }}>
          ユーザーを切り替え
        </h2>
        <p className="mb-4" style={{ color: COLORS.textMuted, fontSize: 12 }}>
          選んだ人ごとに記録が分かれています
        </p>
        <div className="flex gap-3">
          {PROFILES.map((name) => (
            <ProfileButton key={name} name={name} active={name === current} onClick={() => onSelect(name)} />
          ))}
        </div>
        <button
          onClick={onCancel}
          className="mt-5 w-full py-2.5 rounded-xl border"
          style={{ borderColor: COLORS.border, color: COLORS.text }}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}

function RankingList({ data, loading }) {
  if (loading) {
    return (
      <p className="mt-10" style={{ color: COLORS.textMuted }}>
        集計中...
      </p>
    );
  }
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-5">
        <Trophy size={18} style={{ color: COLORS.gold }} />
        <h2 style={{ fontFamily: FONT_DISPLAY, color: COLORS.text, fontSize: 18 }}>★獲得数ランキング</h2>
      </div>
      <div className="space-y-3">
        {data.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center gap-4 rounded-2xl border p-4"
            style={{ borderColor: i === 0 ? COLORS.gold : COLORS.border, background: COLORS.surface }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: 36,
                height: 36,
                background: i === 0 ? COLORS.gold : COLORS.border,
                color: i === 0 ? '#17110D' : COLORS.text,
                fontFamily: FONT_DISPLAY,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 16 }}>{r.name}</p>
              <p style={{ color: COLORS.textMuted, fontSize: 12 }}>{r.songCount}曲登録</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={16} style={{ color: COLORS.gold }} fill={COLORS.gold} />
              <span style={{ color: COLORS.gold, fontFamily: FONT_MONO, fontSize: 18, fontWeight: 700 }}>
                {r.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarInput({ value, onChange, size = 22 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i === value ? 0 : i)}
          className="p-0.5"
          aria-label={LEVEL_NAMES[i - 1]}
          title={LEVEL_NAMES[i - 1]}
        >
          <Star
            size={size}
            strokeWidth={1.5}
            style={{ color: i <= value ? COLORS.gold : COLORS.border }}
            fill={i <= value ? COLORS.gold : 'none'}
          />
        </button>
      ))}
    </div>
  );
}

function SongCard({ song, confirming, onEdit, onDelete, onConfirmDelete, onCancelDelete, onRate }) {
  const mastery = Math.round(((song.chords + song.stroke + song.rhythm + song.arpeggio) / 20) * 100);

  return (
    <div className="relative rounded-2xl p-5 border" style={{ background: COLORS.surface, borderColor: COLORS.border }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg truncate" style={{ fontFamily: FONT_DISPLAY, color: COLORS.text }}>
            {song.title}
          </h3>
          <p className="text-sm truncate mt-0.5" style={{ color: COLORS.textMuted }}>
            {song.artist}
            {song.genre ? ` ・ ${song.genre}` : ''}
          </p>
        </div>
        <RankBadge rankKey={song.difficulty} size={44} />
      </div>

      <div className="mt-4 space-y-1.5">
        {CATEGORIES.map((c) => (
          <div key={c.key} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: COLORS.textMuted, fontFamily: FONT_BODY }}>
              {c.label}
            </span>
            <div className="flex items-center gap-2">
              <span
                className="w-12 text-right whitespace-nowrap"
                style={{ color: song[c.key] ? COLORS.gold : COLORS.textMuted, fontSize: 10.5, fontFamily: FONT_MONO }}
              >
                {levelName(song[c.key])}
              </span>
              <StarInput value={song[c.key]} onChange={(v) => onRate(c.key, v)} size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="h-1 rounded-full overflow-hidden" style={{ background: COLORS.border }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${mastery}%`, background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldBright})` }}
          />
        </div>
        <p className="mt-1 text-right" style={{ color: COLORS.textMuted, fontFamily: FONT_MONO, fontSize: 11 }}>
          習熟度 {mastery}%
        </p>
      </div>

      {!confirming ? (
        <div className="mt-3 flex items-center gap-1 justify-between">
          <a
            href={youtubeSearchUrl(song.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
            style={{ color: COLORS.gold, fontSize: 12 }}
          >
            <PlayCircle size={15} />
            参考音源
          </a>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg"
              style={{ color: COLORS.textMuted }}
              aria-label="編集"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg"
              style={{ color: COLORS.textMuted }}
              aria-label="削除"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-end gap-2" style={{ fontSize: 12 }}>
          <span style={{ color: COLORS.textMuted }}>削除しますか?</span>
          <button
            onClick={onCancelDelete}
            className="px-2 py-1 rounded-lg border"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            キャンセル
          </button>
          <button
            onClick={onConfirmDelete}
            className="px-2 py-1 rounded-lg"
            style={{ background: '#C1443A', color: '#fff' }}
          >
            削除
          </button>
        </div>
      )}
    </div>
  );
}

function SongForm({ initial, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [artist, setArtist] = useState(initial?.artist || '');
  const [genre, setGenre] = useState(initial?.genre || '');
  const [difficulty, setDifficulty] = useState(initial?.difficulty || '');
  const [chords, setChords] = useState(initial?.chords ?? 0);
  const [stroke, setStroke] = useState(initial?.stroke ?? 0);
  const [rhythm, setRhythm] = useState(initial?.rhythm ?? 0);
  const [arpeggio, setArpeggio] = useState(initial?.arpeggio ?? 0);
  const [error, setError] = useState('');

  function submit() {
    if (!title.trim()) {
      setError('曲名を入力してください');
      return;
    }
    if (!difficulty) {
      setError('総合難易度を選んでください');
      return;
    }
    onSave({
      ...(initial || {}),
      title: title.trim(),
      artist: artist.trim(),
      genre: genre.trim(),
      difficulty,
      chords,
      stroke,
      rhythm,
      arpeggio,
    });
  }

  const starFields = [
    { key: 'chords', label: 'コード', value: chords, set: setChords },
    { key: 'stroke', label: 'ストローク', value: stroke, set: setStroke },
    { key: 'rhythm', label: 'リズム', value: rhythm, set: setRhythm },
    { key: 'arpeggio', label: 'アルペジオ', value: arpeggio, set: setArpeggio },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(10,7,5,0.72)' }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, maxHeight: '90vh', overflowY: 'auto' }}
      >
        <h2 className="text-xl mb-5" style={{ fontFamily: FONT_DISPLAY, color: COLORS.text }}>
          {initial ? '曲を編集' : '曲を登録'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1" style={{ color: COLORS.textMuted, fontSize: 12 }}>
              曲名
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: マリーゴールド"
              className="w-full bg-transparent outline-none py-2"
              style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONT_BODY }}
            />
          </div>

          <div>
            <label className="block mb-1" style={{ color: COLORS.textMuted, fontSize: 12 }}>
              アーティスト
            </label>
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="例: あいみょん"
              className="w-full bg-transparent outline-none py-2"
              style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONT_BODY }}
            />
          </div>

          <div>
            <label className="block mb-1" style={{ color: COLORS.textMuted, fontSize: 12 }}>
              ジャンル
            </label>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="例: J-POP、弾き語り"
              className="w-full bg-transparent outline-none py-2"
              style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONT_BODY }}
            />
          </div>

          <div>
            <label className="block mb-2" style={{ color: COLORS.textMuted, fontSize: 12 }}>
              総合難易度
            </label>
            <div className="flex gap-2">
              {RANKS.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setDifficulty(r.key)}
                  className="flex-1 py-2 rounded-xl border font-bold"
                  title={r.label}
                  style={{
                    fontFamily: FONT_DISPLAY,
                    borderColor: difficulty === r.key ? r.color : COLORS.border,
                    background: difficulty === r.key ? r.color : 'transparent',
                    color: difficulty === r.key ? '#17110D' : COLORS.textMuted,
                  }}
                >
                  {r.key}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
            <p className="pt-3" style={{ color: COLORS.textMuted, fontSize: 12 }}>
              仕上がり具合(みならい〜達人)
            </p>
            {starFields.map((f) => (
              <div key={f.key} className="flex items-center justify-between">
                <span style={{ color: COLORS.text, fontSize: 14, fontFamily: FONT_BODY }}>{f.label}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-12 text-right whitespace-nowrap"
                    style={{ color: f.value ? COLORS.gold : COLORS.textMuted, fontSize: 11, fontFamily: FONT_MONO }}
                  >
                    {levelName(f.value)}
                  </span>
                  <StarInput value={f.value} onChange={f.set} />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p style={{ color: '#E08A7D', fontSize: 13 }}>{error}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border"
              style={{ borderColor: COLORS.border, color: COLORS.text, fontFamily: FONT_BODY }}
            >
              キャンセル
            </button>
            <button
              onClick={submit}
              className="flex-1 py-2.5 rounded-xl font-bold"
              style={{ background: COLORS.gold, color: '#17110D', fontFamily: FONT_DISPLAY }}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useGoogleFonts();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [formOpen, setFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [collapsedRanks, setCollapsedRanks] = useState(() => new Set());
  const [randomFrom, setRandomFrom] = useState('S');
  const [randomTo, setRandomTo] = useState('D');
  const [randomPick, setRandomPick] = useState(null);
  const [randomEmpty, setRandomEmpty] = useState(false);
  const [profileName, setProfileName] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [switchingProfile, setSwitchingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [ranking, setRanking] = useState([]);
  const [rankingLoading, setRankingLoading] = useState(false);

  async function loadRanking() {
    setRankingLoading(true);
    const results = await Promise.all(
      PROFILES.map(async (name) => {
        try {
          const result = await window.storage.get(`songs:${name}`, false);
          const list = result ? JSON.parse(result.value) : [];
          const total = list.reduce(
            (sum, s) => sum + (s.chords || 0) + (s.stroke || 0) + (s.rhythm || 0) + (s.arpeggio || 0),
            0
          );
          return { name, total, songCount: list.length };
        } catch (e) {
          return { name, total: 0, songCount: 0 };
        }
      })
    );
    results.sort((a, b) => b.total - a.total);
    setRanking(results);
    setRankingLoading(false);
  }

  useEffect(() => {
    if (activeTab === 'ranking') {
      loadRanking();
    }
  }, [activeTab]);

  async function selectProfile(name) {
    setProfileName(name);
    setSwitchingProfile(false);
    setLoading(true);
    try {
      const result = await window.storage.set('currentProfile', name, false);
      if (!result) console.error('Profile save failed');
    } catch (e) {
      console.error('Profile save error', e);
    }
  }

  function toggleRank(key) {
    setCollapsedRanks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function pickRandomSong() {
    const lo = Math.min(RANK_ORDER[randomFrom], RANK_ORDER[randomTo]);
    const hi = Math.max(RANK_ORDER[randomFrom], RANK_ORDER[randomTo]);
    let candidates = songs.filter((s) => RANK_ORDER[s.difficulty] >= lo && RANK_ORDER[s.difficulty] <= hi);
    if (candidates.length === 0) {
      setRandomPick(null);
      setRandomEmpty(true);
      return;
    }
    if (candidates.length > 1 && randomPick) {
      candidates = candidates.filter((s) => s.id !== randomPick.id);
    }
    const idx = Math.floor(Math.random() * candidates.length);
    setRandomPick(candidates[idx]);
    setRandomEmpty(false);
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get('currentProfile', false);
        if (result && PROFILES.includes(result.value)) {
          setProfileName(result.value);
        }
      } catch (e) {
        // 未選択の場合はそのまま(ユーザー選択画面を表示)
      } finally {
        setProfileLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!profileName) return;
    (async () => {
      setLoading(true);
      let existing = [];
      try {
        const result = await window.storage.get(`songs:${profileName}`, false);
        existing = result ? JSON.parse(result.value) : [];
      } catch (e) {
        existing = [];
      }
      const existingIds = new Set(existing.map((s) => s.id));
      const toAdd = SEED_SONGS.filter((s) => !existingIds.has(s.id)).map((s, i) => ({
        ...s,
        createdAt: Date.now() + i,
      }));
      const merged = [...existing, ...toAdd];
      setSongs(merged);
      if (toAdd.length > 0) {
        try {
          const result = await window.storage.set(`songs:${profileName}`, JSON.stringify(merged), false);
          if (!result) console.error('Storage init save failed');
        } catch (e2) {
          console.error('Storage init error', e2);
        }
      }
      setLoading(false);
    })();
  }, [profileName]);

  async function persist(next) {
    setSongs(next);
    if (!profileName) return;
    try {
      const result = await window.storage.set(`songs:${profileName}`, JSON.stringify(next), false);
      if (!result) console.error('Storage save failed');
    } catch (e) {
      console.error('Storage save error', e);
    }
  }

  function handleSave(song) {
    let next;
    if (editingSong) {
      next = songs.map((s) => (s.id === song.id ? song : s));
    } else {
      next = [...songs, { ...song, id: crypto.randomUUID(), createdAt: Date.now() }];
    }
    persist(next);
    setFormOpen(false);
    setEditingSong(null);
  }

  function handleDelete(id) {
    persist(songs.filter((s) => s.id !== id));
    setConfirmDeleteId(null);
  }

  function handleRate(songId, key, value) {
    const next = songs.map((s) => (s.id === songId ? { ...s, [key]: value } : s));
    persist(next);
  }

  const filtered = songs.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q)
    );
  });

  const grouped = RANKS.map((r) => {
    const items = filtered
      .filter((s) => s.difficulty === r.key)
      .sort((a, b) => {
        if (sortBy === 'name') return a.title.localeCompare(b.title, 'ja');
        return b.createdAt - a.createdAt;
      });
    return { rank: r, items };
  }).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen" style={{ background: COLORS.bg, fontFamily: FONT_BODY }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-28">
        <header className="flex items-center gap-3">
          <Pick color={COLORS.gold} size={36} />
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl sm:text-3xl truncate"
              style={{ fontFamily: FONT_DISPLAY, color: COLORS.text, letterSpacing: '0.02em' }}
            >
              {profileName ? `${profileName}の弾き込みノート` : '弾き込みノート'}
            </h1>
            <p className="mt-1" style={{ color: COLORS.textMuted, fontSize: 13 }}>
              曲ごとの弾き込み具合を、コード・ストローク・リズム・アルペジオの4視点で記録する
            </p>
            {profileLoaded && profileName && (
              <button
                onClick={() => setSwitchingProfile(true)}
                className="mt-2 flex items-center gap-1"
                style={{ color: COLORS.gold, fontSize: 12 }}
              >
                <Pencil size={12} />
                ユーザーを切り替え
              </button>
            )}
          </div>
        </header>

        {!profileLoaded ? (
          <p className="mt-10" style={{ color: COLORS.textMuted }}>
            読み込み中...
          </p>
        ) : !profileName ? (
          <div className="mt-10 rounded-2xl border p-6 text-center" style={{ borderColor: COLORS.border }}>
            <p style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 18 }}>だれが使いますか?</p>
            <p className="mt-1" style={{ color: COLORS.textMuted, fontSize: 13 }}>
              選んだ人ごとに記録が分かれます
            </p>
            <div className="mt-5 flex gap-3">
              {PROFILES.map((name) => (
                <ProfileButton key={name} name={name} active={false} onClick={() => selectProfile(name)} />
              ))}
            </div>
          </div>
        ) : (
          <>
          {activeTab === 'home' && (
          <>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border flex-1 min-w-0"
            style={{ borderColor: COLORS.border, background: COLORS.surface }}
          >
            <Search size={16} style={{ color: COLORS.textMuted }} className="shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="曲名・アーティスト・ジャンルで検索"
              className="bg-transparent outline-none flex-1 min-w-0"
              style={{ color: COLORS.text, fontSize: 14 }}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none sm:w-32 px-3 py-2.5 rounded-xl border outline-none"
              style={{ borderColor: COLORS.border, background: COLORS.surface, color: COLORS.text, fontSize: 14 }}
            >
              <option value="new">追加順</option>
              <option value="name">名前順</option>
            </select>
            <button
              onClick={() => {
                setEditingSong(null);
                setFormOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold shrink-0 whitespace-nowrap"
              style={{ background: COLORS.gold, color: '#17110D', fontFamily: FONT_DISPLAY, fontSize: 14 }}
            >
              <Plus size={16} /> 曲を登録
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border p-4" style={{ borderColor: COLORS.border, background: COLORS.surface }}>
          <div className="flex items-center gap-2">
            <Shuffle size={16} style={{ color: COLORS.gold }} />
            <span style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 14 }}>
              今日の1曲をランダムに選ぶ
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <select
              value={randomFrom}
              onChange={(e) => setRandomFrom(e.target.value)}
              className="px-2.5 py-2 rounded-lg border outline-none"
              style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text, fontSize: 13 }}
            >
              {RANKS.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}({r.key})
                </option>
              ))}
            </select>
            <span style={{ color: COLORS.textMuted, fontSize: 13 }}>〜</span>
            <select
              value={randomTo}
              onChange={(e) => setRandomTo(e.target.value)}
              className="px-2.5 py-2 rounded-lg border outline-none"
              style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text, fontSize: 13 }}
            >
              {RANKS.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}({r.key})
                </option>
              ))}
            </select>
            <button
              onClick={pickRandomSong}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold whitespace-nowrap"
              style={{ background: COLORS.gold, color: '#17110D', fontFamily: FONT_DISPLAY, fontSize: 13 }}
            >
              <Shuffle size={14} /> 選ぶ
            </button>
          </div>

          {randomPick && (
            <div
              className="mt-4 pt-4 flex items-center gap-3"
              style={{ borderTop: `1px solid ${COLORS.border}` }}
            >
              <RankBadge rankKey={randomPick.difficulty} size={40} />
              <div className="min-w-0 flex-1">
                <p className="truncate" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 16 }}>
                  {randomPick.title}
                </p>
                <p className="truncate" style={{ color: COLORS.textMuted, fontSize: 12 }}>
                  {randomPick.artist}
                </p>
              </div>
              <a
                href={youtubeSearchUrl(randomPick.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0"
                style={{ color: COLORS.gold, fontSize: 12, border: `1px solid ${COLORS.border}` }}
              >
                <PlayCircle size={15} />
                参考音源
              </a>
            </div>
          )}

          {randomEmpty && (
            <p className="mt-4 pt-4" style={{ borderTop: `1px solid ${COLORS.border}`, color: COLORS.textMuted, fontSize: 13 }}>
              この範囲に登録されている曲がありません
            </p>
          )}
        </div>

        <main className="mt-6 space-y-3">
          {loading ? (
            <p style={{ color: COLORS.textMuted }}>読み込み中...</p>
          ) : grouped.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border" style={{ borderColor: COLORS.border }}>
              <p style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 18 }}>
                {songs.length === 0 ? 'まだ曲が登録されていません' : '一致する曲が見つかりません'}
              </p>
              <p className="mt-2" style={{ color: COLORS.textMuted, fontSize: 13 }}>
                {songs.length === 0
                  ? '「曲を登録」から、弾いた曲とその仕上がりを記録しましょう'
                  : '検索キーワードを変えてみてください'}
              </p>
            </div>
          ) : (
            grouped.map(({ rank, items }) => {
              const isCollapsed = collapsedRanks.has(rank.key);
              return (
                <div key={rank.key} className="rounded-2xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
                  <button
                    onClick={() => toggleRank(rank.key)}
                    className="w-full flex items-center gap-3 px-4 py-3"
                    style={{ background: COLORS.surface }}
                  >
                    <RankBadge rankKey={rank.key} size={32} />
                    <span style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 15 }}>
                      {rank.label}
                    </span>
                    <span style={{ color: COLORS.textMuted, fontSize: 12, fontFamily: FONT_MONO }}>
                      {items.length}曲
                    </span>
                    <ChevronDown
                      size={16}
                      className="ml-auto transition-transform"
                      style={{
                        color: COLORS.textMuted,
                        transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {!isCollapsed && (
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ background: COLORS.bg }}>
                      {items.map((song) => (
                        <SongCard
                          key={song.id}
                          song={song}
                          confirming={confirmDeleteId === song.id}
                          onEdit={() => {
                            setEditingSong(song);
                            setFormOpen(true);
                          }}
                          onDelete={() => setConfirmDeleteId(song.id)}
                          onConfirmDelete={() => handleDelete(song.id)}
                          onCancelDelete={() => setConfirmDeleteId(null)}
                          onRate={(key, value) => handleRate(song.id, key, value)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </main>
          </>
          )}
          {activeTab === 'ranking' && <RankingList data={ranking} loading={rankingLoading} />}
          </>
        )}
      </div>

      {profileLoaded && profileName && (
        <nav
          className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t"
          style={{ background: COLORS.surface, borderColor: COLORS.border, paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <button
            onClick={() => setActiveTab('home')}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
          >
            <Home size={20} style={{ color: activeTab === 'home' ? COLORS.gold : COLORS.textMuted }} />
            <span
              style={{
                color: activeTab === 'home' ? COLORS.gold : COLORS.textMuted,
                fontSize: 11,
                fontFamily: FONT_BODY,
              }}
            >
              ホーム
            </span>
          </button>
          <button
            onClick={() => setActiveTab('ranking')}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
          >
            <Trophy size={20} style={{ color: activeTab === 'ranking' ? COLORS.gold : COLORS.textMuted }} />
            <span
              style={{
                color: activeTab === 'ranking' ? COLORS.gold : COLORS.textMuted,
                fontSize: 11,
                fontFamily: FONT_BODY,
              }}
            >
              ランキング
            </span>
          </button>
        </nav>
      )}

      {formOpen && (
        <SongForm
          initial={editingSong}
          onCancel={() => {
            setFormOpen(false);
            setEditingSong(null);
          }}
          onSave={handleSave}
        />
      )}

      {switchingProfile && (
        <ProfileSwitchModal
          current={profileName}
          onSelect={selectProfile}
          onCancel={() => setSwitchingProfile(false)}
        />
      )}
    </div>
  );
}
