import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, 
  MoreHorizontal, 
  Download, 
  Play, 
  Search, 
  Info, 
  Sparkles, 
  BookOpen, 
  Home, 
  Library, 
  PlusSquare, 
  Heart, 
  Settings, 
  LogOut,
  Headphones,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Share2
} from 'lucide-react';

// ማሳሰቢያ፡ እነዚህ ፋይሎች በGitHubህ ላይ መኖራቸውን እርግጠኛ ሁን
import { Song, UserAccountType, User } from './types';
import { GENRES, MOCK_SONGS, ARTISTS } from './constants';
import { getSongDescription, getSongMeaning } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_SONGS[0]);
  const [songInsight, setSongInsight] = useState<string>('');
  const [songMeaning, setSongMeaning] = useState<string>('');
  const [showMeaning, setShowMeaning] = useState(false);
  const [activeTab, setActiveTab] = useState('Pop');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // AI Song Insight ማመንጫ
  useEffect(() => {
    if (currentSong) {
      setSongInsight('AI ትንታኔ እየሰራ ነው...');
      setSongMeaning('');
      setShowMeaning(false);
      getSongDescription(currentSong.title, currentSong.artist).then(setSongInsight);
    }
  }, [currentSong]);

  const fetchMeaning = async () => {
    if (!songMeaning && currentSong) {
      setSongMeaning('ግጥሙን AI እየመረመረው ነው...');
      const meaning = await getSongMeaning(currentSong.title, currentSong.artist);
      setSongMeaning(meaning);
    }
    setShowMeaning(!showMeaning);
  };

  const filteredSongs = useMemo(() => {
    return MOCK_SONGS.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = activeTab === 'Others' || song.genre === activeTab;
      return matchesSearch && (searchQuery ? true : matchesGenre);
    });
  }, [searchQuery, activeTab]);

  const handleLogin = () => {
    if (!emailInput) return;
    setUser({ id: '1', email: emailInput, type: UserAccountType.FREE, followedArtists: [], likedSongs: [] });
    setIsAuthModalOpen(false);
  };

  if (isAuthModalOpen && !user) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black text-white">
        <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center rotate-12 shadow-lg shadow-violet-500/50">
              <Star className="text-white w-8 h-8 fill-white" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center mb-2 tracking-tighter">MELODYHUB</h2>
          <p className="text-gray-400 text-center mb-8">ወደ AI የሙዚቃ መድረክ እንኳን መጡ</p>
          <input 
            type="email" 
            placeholder="ኢሜልዎን ያስገቡ" 
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 outline-none focus:border-violet-500 transition-all text-white"
          />
          <button onClick={handleLogin} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform">መግቢያ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Headphones className="text-violet-500 w-8 h-8" />
          <h1 className="text-xl font-black tracking-tighter">MELODYHUB</h1>
        </div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-violet-400 font-bold"><Home size={20}/> Home</div>
          <div className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors cursor-pointer"><Search size={20}/> Discover</div>
          <div className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors cursor-pointer"><Library size={20}/> Library</div>
        </nav>
      </aside>

      <main className="flex-1 px-4 lg:px-8 py-6 pb-32 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4">
           <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="ዘፈን ወይም አርቲስት ይፈልጉ..." 
                className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-12 pr-4 focus:bg-white/10 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold">{user?.email}</p>
                <p className="text-[10px] text-violet-400 uppercase tracking-widest">{user?.type}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold">
                {user?.email[0].toUpperCase()}
              </div>
           </div>
        </div>

        {/* AI Insight Section */}
        {currentSong && (
          <div className="mb-10 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl group-hover:bg-violet-600/20 transition-all"></div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-[10px] font-black tracking-widest text-violet-400 uppercase">የ AI የሙዚቃ ትንታኔ</span>
                </div>
                <p className="text-xl font-medium italic text-gray-100">"{songInsight}"</p>
                {showMeaning && (
                  <div className="mt-4 p-4 bg-black/40 rounded-xl text-sm text-gray-300 animate-in fade-in slide-in-from-top-2 border border-white/5">
                    <h5 className="font-bold text-violet-400 mb-2">ጥልቅ ትርጉም፡</h5>
                    <pre className="font-sans whitespace-pre-wrap leading-relaxed">{songMeaning}</pre>
                  </div>
                )}
              </div>
              <button 
                onClick={fetchMeaning}
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-black transition-all shadow-lg shadow-violet-600/20"
              >
                <BookOpen className="w-4 h-4" />
                {showMeaning ? 'ትርጉም ደብቅ' : 'ትርጉም አሳይ'}
              </button>
            </div>
          </div>
        )}

        {/* Genre Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveTab(genre)}
              className={`px-6 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap ${activeTab === genre ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
