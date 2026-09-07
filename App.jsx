import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Home,
  MessageCircle,
  Video,
  CalendarDays,
  User,
  Send,
  Image as ImageIcon,
  Mic,
  MicOff,
  VideoOff,
  LogOut,
  Bell,
  BellRing,
  Plus,
  X,
  AtSign,
  Users,
  Flame,
  Disc,
  Download,
  MessageSquare,
  Sparkles,
  GraduationCap,
  Building2,
  Quote,
  Search,
  ArrowLeft,
  IdCard,
  Camera,
} from "lucide-react";

/* ---------------------------------------------------------------
   HigherLife Foundation — "I'm a Joshualite" community app
   Navy + white theme. Single-file React prototype.
   Data is stored with window.storage (shared across everyone using
   this artifact) so posts, announcements and chat feel like a real
   community — there is no real authentication behind it, so treat
   this as a working prototype rather than a secured production app.
------------------------------------------------------------------*/

const NAVY_900 = "#071630";
const NAVY_800 = "#0c2348";
const NAVY_700 = "#123163";
const NAVY_600 = "#1d4b8f";
const GOLD = "#c9a24b";
const OFFWHITE = "#f7f8fb";

const LOGO_SRC = "data:image/png;base64,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";

const QUOTES = {
  dawn: "Remember your 5:55am principle — always put God first.",
  arena: "You are the man in the arena, and your call to action has begun.",
  ratio: "In every 3 successful people there should be a Joshualite — an African.",
  transform: "Let's transform the community together, my dear Joshualite.",
};

const ADMIN_CONTACT = { id: "ADMIN", name: "HigherLife Admin", role: "admin" };

// ID format: 9 digits + 1 letter + 2 digits, e.g. 472018134W85
const ID_FORMAT_REGEX = /^\d{9}[A-Za-z]\d{2}$/;
const ID_FORMAT_EXAMPLE = "472018134W85";

// The ID format alone doesn't encode student/alumni/admin, so members pick
// their role at login. Change this list if HigherLife wants different roles.
const ROLE_OPTIONS = [
  { id: "student", label: "Student" },
  { id: "alumni", label: "Alumni" },
  { id: "admin", label: "Admin" },
];

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function pairKey(a, b) {
  return [a, b].sort().join("__");
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

async function storageGet(key, shared = true) {
  try {
    const res = await window.storage.get(key, shared);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
async function storageSet(key, value, shared = true) {
  try {
    await window.storage.set(key, JSON.stringify(value), shared);
    return true;
  } catch {
    return false;
  }
}

async function fetchAllPosts() {
  const index = (await storageGet("hl:posts:index")) || [];
  const items = await Promise.all(
    index.map((id) => storageGet(`hl:posts:${id}`))
  );
  return items.filter(Boolean).sort((a, b) => b.ts - a.ts);
}

function resizeImageToDataUrl(file, maxDim = 240, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        } else if (height >= width && height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveAvatarForUser(userId, dataUrl) {
  const members = (await storageGet("hl:members")) || [];
  const idx = members.findIndex((m) => m.id === userId);
  if (idx >= 0) {
    members[idx] = { ...members[idx], avatarUrl: dataUrl };
  }
  await storageSet("hl:members", members);
}

function nextSaturdayAt(hour, minute) {
  const now = new Date();
  const result = new Date(now);
  const day = now.getDay(); // 0 = Sunday .. 6 = Saturday
  let diff = (6 - day + 7) % 7;
  result.setDate(now.getDate() + diff);
  result.setHours(hour, minute, 0, 0);
  if (result <= now) result.setDate(result.getDate() + 7);
  return result;
}

function formatDateTime(d) {
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMeetingCompact(d) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
  const day = d.getDate();
  const month = d.toLocaleDateString(undefined, { month: "short" });
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${weekday} ${day} ${month}, ${hh}:${mm}`;
}

function hoursUntil(d) {
  return Math.max(0, Math.round((d.getTime() - Date.now()) / 3600000));
}

/* ---------------------------- App ---------------------------- */

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Shell
      user={user}
      tab={tab}
      setTab={setTab}
      onLogout={() => setUser(null)}
      onUpdateUser={(patch) => setUser((u) => ({ ...u, ...patch }))}
    />
  );
}

/* ---------------------------- Login ---------------------------- */

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("student");
  const [institution, setInstitution] = useState("");
  const [cohort, setCohort] = useState("");
  const [stage, setStage] = useState("form"); // form | welcome
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !id.trim()) {
      setError("Enter your name and ID number to continue.");
      return;
    }
    if (!ID_FORMAT_REGEX.test(id.trim())) {
      setError(`ID number should look like ${ID_FORMAT_EXAMPLE} (9 digits, a letter, 2 digits).`);
      return;
    }
    setError("");
    const profile = {
      name: name.trim(),
      id: id.trim(),
      role,
      institution: institution.trim(),
      cohort: cohort.trim(),
    };
    const members = (await storageGet("hl:members")) || [];
    const existing = members.find((m) => m.id === id.trim());
    if (!existing) {
      members.push(profile);
      await storageSet("hl:members", members);
    }
    setStage("welcome");
    setTimeout(() => {
      onLogin(existing || profile);
    }, 1400);
  };

  return (
    <div style={styles.loginScreen}>
      <style>{globalCss}</style>
      {stage === "form" ? (
        <div style={styles.loginCard}>
          <div style={styles.brandRow}>
            <img src={LOGO_SRC} alt="HigherLife Foundation" style={styles.crestImg} />
            <div>
              <div style={styles.brandName}>HigherLife Foundation</div>
              <div style={styles.brandSub}>Community</div>
            </div>
          </div>

          <h1 style={styles.themeLine}>I'm a Joshualite</h1>

          <form onSubmit={submit} style={{ marginTop: 8 }}>
            <label style={styles.label}>Full name</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Joshua Okafor"
              autoComplete="off"
            />
            <label style={styles.label}>ID number</label>
            <input
              style={styles.input}
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={`e.g. ${ID_FORMAT_EXAMPLE}`}
              autoComplete="off"
            />
            <label style={styles.label}>I am a</label>
            <div style={styles.roleToggleRow}>
              {ROLE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setRole(opt.id)}
                  style={{
                    ...styles.roleToggleBtn,
                    ...(role === opt.id ? styles.roleToggleBtnActive : {}),
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <label style={styles.label}>Institution (optional)</label>
            <input
              style={styles.input}
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. University of Zimbabwe"
              autoComplete="off"
            />
            <label style={styles.label}>Cohort / year (optional)</label>
            <input
              style={styles.input}
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              placeholder="e.g. 2021"
              autoComplete="off"
            />
            {error && <div style={styles.errorText}>{error}</div>}
            <button type="submit" style={styles.primaryBtn}>
              Log in
            </button>
          </form>
          <p style={styles.hint}>
            Your member type stays saved against your ID number once you've
            logged in the first time.
          </p>
        </div>
      ) : (
        <div style={styles.welcomeCard}>
          <img src={LOGO_SRC} alt="" style={styles.crestBigImg} />
          <div style={styles.welcomeText}>
            {role === "alumni"
              ? "Welcome, Alumni"
              : role === "admin"
              ? "Welcome, Admin"
              : `Welcome, Joshualite`}
          </div>
          <div style={styles.welcomeSub}>{name}</div>
        </div>
      )}
      <div style={styles.loginQuote}>{QUOTES.dawn}</div>
    </div>
  );
}

/* ---------------------------- Shell ---------------------------- */

function Shell({ user, tab, setTab, onLogout, onUpdateUser }) {
  const roleLabel =
    user.role === "alumni" ? "Alumni" : user.role === "admin" ? "Admin" : "Joshualite";
  const [pendingContact, setPendingContact] = useState(null);

  const goMessage = (contact) => {
    setPendingContact(contact);
    setTab("chat");
  };

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "discover", label: "Discover", icon: Search },
    { id: "chat", label: "Messages", icon: MessageCircle },
    { id: "meeting", label: "Meetings", icon: Video },
    { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div style={styles.appShell}>
      <style>{globalCss}</style>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <img src={LOGO_SRC} alt="" style={styles.crestSmallImg} />
          <div>
            <div style={styles.headerGreeting}>
              {user.role === "alumni"
                ? "Welcome, Alumni"
                : `Welcome, ${user.name.split(" ")[0]}`}
            </div>
            <div style={styles.headerRole}>{roleLabel}</div>
          </div>
        </div>
        <button style={styles.iconBtn} onClick={onLogout} title="Log out">
          <LogOut size={18} color="#fff" />
        </button>
      </header>

      <main style={styles.main}>
        {tab === "home" && <Feed user={user} setTab={setTab} />}
        {tab === "discover" && <Discover user={user} onMessage={goMessage} />}
        {tab === "chat" && (
          <Chat
            user={user}
            initialContact={pendingContact}
            onConsumeInitial={() => setPendingContact(null)}
          />
        )}
        {tab === "meeting" && <MeetingRoom user={user} />}
        {tab === "calendar" && <CalendarTab user={user} />}
        {tab === "profile" && <Profile user={user} onUpdateUser={onUpdateUser} />}
      </main>

      <nav style={styles.tabBar}>
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                ...styles.tabBtn,
                color: active ? GOLD : "#c7d2e6",
              }}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
              <span style={{ fontSize: 9.5, marginTop: 2 }}>{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ---------------------------- Page header (shared) ---------------------------- */

function PageHeader({ icon: Icon, eyebrow, title, subtitle }) {
  return (
    <div style={styles.pageHeader}>
      {eyebrow && (
        <div style={styles.pageHeaderEyebrow}>
          <Sparkles size={12} /> {eyebrow}
        </div>
      )}
      <div style={styles.pageHeaderTitleRow}>
        {Icon && <Icon size={18} color={NAVY_800} />}
        <div style={styles.pageHeaderTitle}>{title}</div>
      </div>
      {subtitle && <div style={styles.pageHeaderSubtitle}>{subtitle}</div>}
    </div>
  );
}

function Avatar({ src, name, size = 36 }) {
  const box = {
    width: size,
    height: size,
    borderRadius: "50%",
    flexShrink: 0,
    fontSize: Math.round(size * 0.36),
    fontWeight: 700,
  };
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ ...box, objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <div
      style={{
        ...box,
        background: NAVY_700,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initials(name)}
    </div>
  );
}

/* ---------------------------- Home Feed ---------------------------- */

function Feed({ user, setTab }) {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [tagAdmin, setTagAdmin] = useState(false);
  const [media, setMedia] = useState(null); // {type, data, name}
  const [busy, setBusy] = useState(false);
  const [onlyTagged, setOnlyTagged] = useState(false);
  const [meetingDismissed, setMeetingDismissed] = useState(false);
  const fileRef = useRef(null);

  const nextMeeting = nextSaturdayAt(15, 45);
  const roleLabel =
    user.role === "alumni" ? "Alumni" : user.role === "admin" ? "Admin" : "Joshualite";

  const loadPosts = useCallback(async () => {
    setPosts(await fetchAllPosts());
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3.5 * 1024 * 1024) {
      alert("Please choose a file under ~3.5MB for this prototype.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setMedia({
        type: file.type.startsWith("video") ? "video" : "image",
        data: reader.result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const submitPost = async () => {
    if (!caption.trim() && !media) return;
    setBusy(true);
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const post = {
      id,
      authorName: user.name,
      authorId: user.id,
      authorAvatar: user.avatarUrl || null,
      role: user.role,
      caption: caption.trim(),
      media,
      tagAdmin,
      ts: Date.now(),
      replies: [],
    };
    await storageSet(`hl:posts:${id}`, post);
    const index = (await storageGet("hl:posts:index")) || [];
    index.push(id);
    await storageSet("hl:posts:index", index);
    setCaption("");
    setMedia(null);
    setTagAdmin(false);
    if (fileRef.current) fileRef.current.value = "";
    setBusy(false);
    loadPosts();
  };

  const addReply = async (post, text) => {
    if (!text.trim()) return;
    const updated = {
      ...post,
      replies: [
        ...post.replies,
        { authorName: user.name, text: text.trim(), ts: Date.now() },
      ],
    };
    await storageSet(`hl:posts:${post.id}`, updated);
    loadPosts();
  };

  const visible = onlyTagged ? posts.filter((p) => p.tagAdmin) : posts;

  return (
    <div style={styles.tabPane}>
      <div style={styles.heroCard}>
        <div style={styles.heroBlobOne} />
        <div style={styles.heroBlobTwo} />
        <div style={styles.heroEyebrow}>
          <Sparkles size={13} /> I'm a Joshualite
        </div>
        <div style={styles.heroTitle}>
          Welcome {roleLabel}, {user.name.split(" ")[0]}!
        </div>
        <div style={styles.heroMetaRow}>
          <span style={styles.heroMetaItem}>
            <GraduationCap size={14} /> {roleLabel}
          </span>
          {user.institution && (
            <span style={styles.heroMetaItem}>
              <Building2 size={14} /> {user.institution}
            </span>
          )}
          {user.cohort && (
            <span style={styles.heroMetaItem}>
              <CalendarDays size={14} /> Cohort {user.cohort}
            </span>
          )}
        </div>
      </div>

      <div style={styles.bannerCard}>
        <Quote size={18} color={GOLD} style={{ marginBottom: 6 }} />
        <div style={styles.bannerQuote}>{QUOTES.arena}</div>
      </div>

      {!meetingDismissed && (
        <div style={styles.quickMeetingCard}>
          <div style={styles.quickMeetingBell}>
            <Bell size={16} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={styles.quickMeetingTitle}>Weekly Joshualite Community Meeting</div>
            <div style={styles.quickMeetingMeta}>
              {formatMeetingCompact(nextMeeting)} · in {hoursUntil(nextMeeting)}h
            </div>
          </div>
          <button style={styles.quickJoinBtn} onClick={() => setTab("meeting")}>
            <Video size={13} /> Join
          </button>
          <button
            style={styles.quickDismissBtn}
            onClick={() => setMeetingDismissed(true)}
            aria-label="Dismiss"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div style={styles.composerCard}>
        <textarea
          style={styles.textarea}
          placeholder={`Share something with the community, ${user.name.split(" ")[0]}...`}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
        />
        {media && (
          <div style={styles.mediaPreviewWrap}>
            {media.type === "image" ? (
              <img src={media.data} alt="preview" style={styles.mediaPreview} />
            ) : (
              <video src={media.data} style={styles.mediaPreview} controls />
            )}
            <button style={styles.removeMediaBtn} onClick={() => setMedia(null)}>
              <X size={14} />
            </button>
          </div>
        )}
        <div style={styles.composerRow}>
          <label style={styles.attachTextBtn}>
            <ImageIcon size={15} /> Photo
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              style={{ display: "none" }}
            />
          </label>
          <label style={styles.attachTextBtn}>
            <Video size={15} /> Video
            <input
              type="file"
              accept="video/*"
              onChange={onFile}
              style={{ display: "none" }}
            />
          </label>
          <button
            type="button"
            style={{
              ...styles.tagToggle,
              ...(tagAdmin ? styles.tagToggleActive : {}),
            }}
            onClick={() => setTagAdmin((v) => !v)}
          >
            <AtSign size={14} /> Tag Admin
          </button>
          <button
            style={{
              ...styles.primaryBtnSmall,
              opacity: busy ? 0.6 : 1,
              marginLeft: "auto",
            }}
            onClick={submitPost}
            disabled={busy}
          >
            <Send size={13} style={{ marginRight: 5 }} />
            Post
          </button>
        </div>
      </div>

      <div style={styles.sectionTitle}>Community Feed</div>

      {user.role === "admin" && (
        <button
          style={styles.filterChip}
          onClick={() => setOnlyTagged((v) => !v)}
        >
          {onlyTagged ? "Showing tagged posts" : "Show posts tagging you"}
        </button>
      )}

      {visible.length === 0 && (
        <div style={styles.emptyState}>
          No posts yet — be the first Joshualite to share something.
        </div>
      )}

      {visible.map((post) => (
        <PostCard key={post.id} post={post} onReply={addReply} />
      ))}
    </div>
  );
}

function PostCard({ post, onReply }) {
  const [reply, setReply] = useState("");
  return (
    <div style={styles.postCard}>
      <div style={styles.postHeader}>
        <Avatar src={post.authorAvatar} name={post.authorName} size={36} />
        <div style={{ flex: 1 }}>
          <div style={styles.postAuthor}>{post.authorName}</div>
          <div style={styles.postMeta}>
            {post.role === "alumni" ? "Alumni" : post.role === "admin" ? "Admin" : "Joshualite"}
            {" · "}
            {timeAgo(post.ts)}
          </div>
        </div>
        {post.tagAdmin && <span style={styles.tagBadge}>@Admin</span>}
      </div>
      {post.caption && <div style={styles.postCaption}>{post.caption}</div>}
      {post.media &&
        (post.media.type === "image" ? (
          <img src={post.media.data} alt="post" style={styles.postMedia} />
        ) : (
          <video src={post.media.data} style={styles.postMedia} controls />
        ))}

      {post.replies.length > 0 && (
        <div style={styles.repliesWrap}>
          {post.replies.map((r, i) => (
            <div key={i} style={styles.replyRow}>
              <b style={{ color: NAVY_800 }}>{r.authorName}:</b> {r.text}
            </div>
          ))}
        </div>
      )}
      <div style={styles.replyInputRow}>
        <input
          style={styles.replyInput}
          placeholder="Reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && reply.trim()) {
              onReply(post, reply);
              setReply("");
            }
          }}
        />
        <button
          style={styles.sendSmallBtn}
          onClick={() => {
            if (reply.trim()) {
              onReply(post, reply);
              setReply("");
            }
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- Chat ---------------------------- */

/* ---------------------------- Discover ---------------------------- */

function Discover({ user, onMessage }) {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    (async () => {
      const all = (await storageGet("hl:members")) || [];
      setMembers(all.filter((m) => m.id !== user.id));
    })();
  }, [user.id]);

  const openMember = async (m) => {
    setSelected(m);
    setLoadingPosts(true);
    const all = await fetchAllPosts();
    setSelectedPosts(all.filter((p) => p.authorId === m.id));
    setLoadingPosts(false);
  };

  const addReply = async (post, text) => {
    if (!text.trim()) return;
    const updated = {
      ...post,
      replies: [
        ...post.replies,
        { authorName: user.name, text: text.trim(), ts: Date.now() },
      ],
    };
    await storageSet(`hl:posts:${post.id}`, updated);
    setSelectedPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
  };

  const q = query.trim().toLowerCase();
  const filtered = !q
    ? members
    : members.filter(
        (m) =>
          m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
      );

  if (selected) {
    const roleLabel =
      selected.role === "alumni" ? "Alumni" : selected.role === "admin" ? "Admin" : "Joshualite";
    return (
      <div style={styles.tabPane}>
        <button style={styles.backLink} onClick={() => setSelected(null)}>
          <ArrowLeft size={15} /> Back to Discover
        </button>

        <div style={styles.memberDetailCard}>
          <div style={{ marginBottom: 10 }}>
            <Avatar src={selected.avatarUrl} name={selected.name} size={60} />
          </div>
          <div style={styles.memberDetailName}>{selected.name}</div>
          <div style={styles.memberDetailRole}>{roleLabel}</div>
          <div style={styles.heroMetaRowDark}>
            {selected.institution && (
              <span style={styles.heroMetaItemDark}>
                <Building2 size={13} /> {selected.institution}
              </span>
            )}
            {selected.cohort && (
              <span style={styles.heroMetaItemDark}>
                <GraduationCap size={13} /> Cohort {selected.cohort}
              </span>
            )}
            <span style={styles.heroMetaItemDark}>
              <IdCard size={13} /> {selected.id}
            </span>
          </div>
          <button
            style={{ ...styles.primaryBtnSmall, background: GOLD, color: NAVY_900, marginTop: 14 }}
            onClick={() => onMessage({ id: selected.id, name: selected.name, role: selected.role })}
          >
            <MessageCircle size={13} style={{ marginRight: 5 }} />
            Message
          </button>
        </div>

        <div style={styles.sectionTitle}>Posts by {selected.name.split(" ")[0]}</div>
        {loadingPosts && <div style={styles.emptyState}>Loading...</div>}
        {!loadingPosts && selectedPosts.length === 0 && (
          <div style={styles.emptyState}>No posts yet from {selected.name.split(" ")[0]}.</div>
        )}
        {selectedPosts.map((post) => (
          <PostCard key={post.id} post={post} onReply={addReply} />
        ))}
      </div>
    );
  }

  return (
    <div style={styles.tabPane}>
      <PageHeader
        icon={Search}
        eyebrow="Community directory"
        title="Discover Joshualites"
        subtitle="Search for members and see what they've been sharing."
      />
      <div style={styles.searchBox}>
        <Search size={16} color="#8894ac" />
        <input
          style={styles.searchInput}
          placeholder="Search by name or ID number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <div style={styles.emptyState}>
          {members.length === 0
            ? "No other members yet. Once more Joshualites log in, they'll appear here."
            : "No members match that search."}
        </div>
      )}

      {filtered.map((m) => {
        const roleLabel = m.role === "alumni" ? "Alumni" : m.role === "admin" ? "Admin" : "Joshualite";
        return (
          <button key={m.id} style={styles.contactRow} onClick={() => openMember(m)}>
            <Avatar src={m.avatarUrl} name={m.name} size={36} />
            <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
              <div style={styles.postAuthor}>{m.name}</div>
              <div style={styles.postMeta}>
                {roleLabel}
                {m.institution ? ` · ${m.institution}` : ""}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------- Chat ---------------------------- */

function Chat({ user, initialContact, onConsumeInitial }) {
  const [members, setMembers] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    (async () => {
      const all = (await storageGet("hl:members")) || [];
      const others = all.filter((m) => m.id !== user.id);
      const withAdmin = user.id === "ADMIN" ? others : [ADMIN_CONTACT, ...others];
      setMembers(withAdmin);
    })();
  }, [user.id]);

  const openConversation = useCallback(
    async (contact) => {
      setActive(contact);
      const key = `hl:chat:${pairKey(user.id, contact.id)}`;
      const msgs = (await storageGet(key)) || [];
      setMessages(msgs);
    },
    [user.id]
  );

  useEffect(() => {
    if (initialContact) {
      openConversation(initialContact);
      onConsumeInitial?.();
    }
  }, [initialContact, openConversation, onConsumeInitial]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !active) return;
    const key = `hl:chat:${pairKey(user.id, active.id)}`;
    const newMsg = { from: user.id, fromName: user.name, text: text.trim(), ts: Date.now() };
    const updated = [...messages, newMsg];
    setMessages(updated);
    setText("");
    await storageSet(key, updated);
  };

  if (!active) {
    return (
      <div style={styles.tabPane}>
        <PageHeader icon={MessageCircle} title="Messages" subtitle="Chat with fellow Joshualites and Admin." />
        {members.length === 0 && (
          <div style={styles.emptyState}>
            No other members yet. Once more Joshualites log in, they'll appear
            here.
          </div>
        )}
        {members.map((m) => (
          <button
            key={m.id}
            style={styles.contactRow}
            onClick={() => openConversation(m)}
          >
            <Avatar src={m.avatarUrl} name={m.name} size={36} />
            <div style={{ textAlign: "left" }}>
              <div style={styles.postAuthor}>{m.name}</div>
              <div style={styles.postMeta}>
                {m.role === "alumni" ? "Alumni" : m.role === "admin" ? "Admin" : "Joshualite"}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.chatWindow}>
      <div style={styles.chatHeader}>
        <button style={styles.backBtn} onClick={() => setActive(null)}>
          ←
        </button>
        <Avatar src={active.avatarUrl} name={active.name} size={36} />
        <div style={styles.postAuthor}>{active.name}</div>
      </div>
      <div style={styles.chatBody}>
        {messages.length === 0 && (
          <div style={styles.emptyState}>
            Say hello to {active.name.split(" ")[0]}.
          </div>
        )}
        {messages.map((m, i) => {
          const mine = m.from === user.id;
          return (
            <div
              key={i}
              style={{
                ...styles.bubbleRow,
                justifyContent: mine ? "flex-end" : "flex-start",
              }}
            >
              <div style={mine ? styles.bubbleMine : styles.bubbleTheirs}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div style={styles.chatInputRow}>
        <input
          style={styles.chatInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button style={styles.sendBtn} onClick={send}>
          <Send size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- Meeting Room ---------------------------- */

const MEETING_HEARTBEAT_MS = 8000;
const MEETING_STALE_MS = 25000;
const MEETING_POLL_MS = 4000;

function MeetingRoom({ user }) {
  const [joined, setJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [recording, setRecording] = useState(null); // {by, startedAt} or null
  const [recordedUrl, setRecordedUrl] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const heartbeatRef = useRef(null);
  const pollRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const chatBottomRef = useRef(null);

  const otherParticipants = participants.filter((p) => p.id !== user.id);

  const refreshRoom = useCallback(async () => {
    const map = (await storageGet("hl:meeting:participants")) || {};
    const now = Date.now();
    const active = Object.entries(map)
      .filter(([, v]) => now - v.ts < MEETING_STALE_MS)
      .map(([id, v]) => ({ id, ...v }));
    setParticipants(active);

    const chat = (await storageGet("hl:meeting:chat")) || [];
    setChatMessages(chat);

    const rec = await storageGet("hl:meeting:recording");
    setRecording(rec);
  }, []);

  const join = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError(
        "Camera/microphone access was blocked or unavailable. You can still join with audio and video off."
      );
    }
    setJoined(true);

    const upsert = async () => {
      const map = (await storageGet("hl:meeting:participants")) || {};
      map[user.id] = { name: user.name, role: user.role, avatarUrl: user.avatarUrl || null, ts: Date.now() };
      await storageSet("hl:meeting:participants", map);
    };
    await upsert();
    await refreshRoom();
    heartbeatRef.current = setInterval(upsert, MEETING_HEARTBEAT_MS);
    pollRef.current = setInterval(refreshRoom, MEETING_POLL_MS);
  };

  const leave = async () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    clearInterval(heartbeatRef.current);
    clearInterval(pollRef.current);
    setJoined(false);
    setChatOpen(false);
    const map = (await storageGet("hl:meeting:participants")) || {};
    delete map[user.id];
    await storageSet("hl:meeting:participants", map);
  };

  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach((t) => (t.enabled = !micOn));
    setMicOn((v) => !v);
  };
  const toggleCam = () => {
    streamRef.current?.getVideoTracks().forEach((t) => (t.enabled = !camOn));
    setCamOn((v) => !v);
  };

  const sendChat = async () => {
    if (!chatText.trim()) return;
    const msg = { name: user.name, text: chatText.trim(), ts: Date.now() };
    const updated = [...chatMessages, msg].slice(-200);
    setChatMessages(updated);
    setChatText("");
    await storageSet("hl:meeting:chat", updated);
  };

  const startRecording = () => {
    if (!streamRef.current) {
      setError("Turn your camera/microphone on before recording.");
      return;
    }
    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedUrl(URL.createObjectURL(blob));
    };
    recorder.start();
    recorderRef.current = recorder;
    const rec = { by: user.name, startedAt: Date.now() };
    setRecording(rec);
    storageSet("hl:meeting:recording", rec);
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    setRecording(null);
    storageSet("hl:meeting:recording", null);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatOpen]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      clearInterval(heartbeatRef.current);
      clearInterval(pollRef.current);
    };
  }, []);

  return (
    <div style={styles.tabPane}>
      <PageHeader
        icon={Video}
        title="Meetings"
        subtitle="Join the community meeting room — no limit on who can join."
      />
      <div style={styles.bannerCard}>
        <Quote size={18} color={GOLD} style={{ marginBottom: 6 }} />
        <div style={styles.bannerQuote}>{QUOTES.ratio}</div>
      </div>

      <div style={styles.meetingCard}>
        <div style={styles.sectionTitle}>Weekly Community Meeting</div>
        <div style={styles.postMeta}>Every Saturday · 15:45 · open to all Joshualites, no limit</div>

        {!joined ? (
          <button style={styles.primaryBtn} onClick={join}>
            Join meeting
          </button>
        ) : (
          <>
            {recording && (
              <div style={styles.recordingBadge}>
                <Disc size={13} color="#fff" /> Recording — started by {recording.by}
              </div>
            )}
            <div style={styles.videoGrid}>
              <div style={styles.videoTile}>
                {camOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={styles.videoEl}
                  />
                ) : user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" style={styles.videoEl} />
                ) : (
                  <div style={styles.videoOffTile}>{initials(user.name)}</div>
                )}
                <div style={styles.videoLabel}>You</div>
              </div>
              {otherParticipants.map((p) => (
                <div key={p.id} style={styles.videoTile}>
                  {p.avatarUrl ? (
                    <img src={p.avatarUrl} alt="" style={styles.videoEl} />
                  ) : (
                    <div style={styles.videoOffTile}>{initials(p.name)}</div>
                  )}
                  <div style={styles.videoLabel}>{p.name}</div>
                </div>
              ))}
            </div>
            <div style={styles.postMeta}>
              {otherParticipants.length + 1} joined right now
            </div>

            <div style={styles.meetingControls}>
              <button style={styles.controlBtn} onClick={toggleMic}>
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
              <button style={styles.controlBtn} onClick={toggleCam}>
                {camOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>
              <button
                style={{
                  ...styles.controlBtn,
                  ...(chatOpen ? styles.controlBtnActive : {}),
                }}
                onClick={() => setChatOpen((v) => !v)}
              >
                <MessageSquare size={18} />
              </button>
              {user.role === "admin" &&
                (recording ? (
                  <button style={styles.controlBtnDanger} onClick={stopRecording}>
                    <Disc size={18} />
                  </button>
                ) : (
                  <button style={styles.controlBtn} onClick={startRecording}>
                    <Disc size={18} />
                  </button>
                ))}
              <button style={styles.leaveBtn} onClick={leave}>
                Leave
              </button>
            </div>

            {chatOpen && (
              <div style={styles.meetingChatPanel}>
                <div style={styles.meetingChatBody}>
                  {chatMessages.length === 0 && (
                    <div style={styles.emptyState}>No messages yet — say hello.</div>
                  )}
                  {chatMessages.map((m, i) => (
                    <div key={i} style={styles.meetingChatRow}>
                      <b style={{ color: NAVY_800 }}>{m.name}:</b> {m.text}
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>
                <div style={styles.chatInputRow}>
                  <input
                    style={styles.chatInput}
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Message everyone in the meeting..."
                    onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  />
                  <button style={styles.sendBtn} onClick={sendChat}>
                    <Send size={16} color="#fff" />
                  </button>
                </div>
              </div>
            )}

            {recordedUrl && (
              <a
                href={recordedUrl}
                download={`meeting-recording-${Date.now()}.webm`}
                style={styles.downloadRecordingLink}
              >
                <Download size={14} style={{ marginRight: 6 }} />
                Download your recording
              </a>
            )}
          </>
        )}
        {error && <div style={styles.errorText}>{error}</div>}
        <p style={styles.hint}>
          Anyone can join with no limit on numbers. Recording currently
          captures your own camera and microphone feed on your device — a
          full mixed recording of every participant would need a media
          server behind the scenes.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Calendar ---------------------------- */

function CalendarTab({ user }) {
  const [reminderOn, setReminderOn] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [remindedIds, setRemindedIds] = useState([]);
  const [banner, setBanner] = useState("");

  const weeklyMeeting = nextSaturdayAt(15, 45);

  const loadAnnouncements = useCallback(async () => {
    const list = (await storageGet("hl:announcements")) || [];
    setAnnouncements(list.sort((a, b) => new Date(a.when) - new Date(b.when)));
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const enableReminders = async () => {
    if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
      try {
        await Notification.requestPermission();
      } catch {
        /* ignore */
      }
    }
    setReminderOn(true);
  };

  // Demo-grade in-app reminder check (works while this tab stays open)
  useEffect(() => {
    if (!reminderOn) return;
    const interval = setInterval(() => {
      const now = Date.now();
      if (weeklyMeeting.getTime() - now <= 5 * 60 * 1000 && weeklyMeeting.getTime() - now > 0) {
        setBanner("Weekly meeting starts in a few minutes — see you in the Meeting tab!");
      }
      announcements.forEach((a) => {
        const t = new Date(a.when).getTime();
        if (t - now <= 5 * 60 * 1000 && t - now > 0 && !remindedIds.includes(a.id)) {
          setBanner(`Reminder: "${a.title}" starts soon.`);
          setRemindedIds((ids) => [...ids, a.id]);
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("HigherLife Foundation", { body: `${a.title} starts soon.` });
          }
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [reminderOn, announcements, remindedIds, weeklyMeeting]);

  const addAnnouncement = async () => {
    if (!title.trim() || !date || !time) return;
    const id = `${Date.now()}`;
    const when = `${date}T${time}:00`;
    const list = [...announcements, { id, title: title.trim(), when, note: note.trim() }];
    setAnnouncements(list);
    await storageSet("hl:announcements", list);
    setTitle("");
    setDate("");
    setTime("");
    setNote("");
  };

  return (
    <div style={styles.tabPane}>
      <PageHeader
        icon={CalendarDays}
        title="Calendar"
        subtitle="Meetings, reminders and admin announcements."
      />
      {banner && (
        <div style={styles.reminderBanner}>
          <BellRing size={16} color="#fff" />
          <span style={{ marginLeft: 8 }}>{banner}</span>
        </div>
      )}

      <div style={styles.eventCard}>
        <div style={styles.sectionTitle}>Weekly Community Meeting</div>
        <div style={styles.postMeta}>{formatDateTime(weeklyMeeting)}</div>
        <div style={styles.postMeta}>Repeats every Saturday at 15:45</div>
        <button
          style={reminderOn ? styles.reminderOnBtn : styles.primaryBtnSmall}
          onClick={enableReminders}
        >
          <Bell size={14} style={{ marginRight: 6 }} />
          {reminderOn ? "Reminders on" : "Remind me"}
        </button>
      </div>

      <div style={styles.sectionTitle}>Admin announcements</div>
      {announcements.length === 0 && (
        <div style={styles.emptyState}>No announcements yet.</div>
      )}
      {announcements.map((a) => (
        <div key={a.id} style={styles.eventCard}>
          <div style={styles.postAuthor}>{a.title}</div>
          <div style={styles.postMeta}>{formatDateTime(new Date(a.when))}</div>
          {a.note && <div style={styles.postCaption}>{a.note}</div>}
        </div>
      ))}

      {user.role === "admin" && (
        <div style={styles.composerCard}>
          <div style={styles.sectionTitle}>Notify the community</div>
          <input
            style={styles.input}
            placeholder="Meeting title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ ...styles.input, flex: 1 }}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              style={{ ...styles.input, flex: 1 }}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <input
            style={styles.input}
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button style={styles.primaryBtnSmall} onClick={addAnnouncement}>
            <Plus size={14} style={{ marginRight: 4 }} />
            Post announcement
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Profile ---------------------------- */

function Profile({ user, onUpdateUser }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef(null);
  const roleLabel =
    user.role === "alumni" ? "Alumni" : user.role === "admin" ? "Admin" : "Joshualite";

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file, 240, 0.85);
      await saveAvatarForUser(user.id, dataUrl);
      onUpdateUser?.({ avatarUrl: dataUrl });
    } catch {
      setUploadError("Couldn't process that image — try a different photo.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div style={styles.tabPane}>
      <PageHeader icon={User} title="Profile" subtitle="Your details and the HigherLife creed." />
      <div style={styles.profileHero}>
        <div style={styles.avatarUploadWrap}>
          <Avatar src={user.avatarUrl} name={user.name} size={84} />
          <label style={styles.avatarEditBtn}>
            <Camera size={14} color="#fff" />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>
        </div>
        {uploading && <div style={styles.uploadHint}>Uploading photo...</div>}
        {uploadError && <div style={styles.errorTextLight}>{uploadError}</div>}
        <div style={styles.welcomeText}>{user.name}</div>
        <div style={styles.welcomeSub}>
          {roleLabel}
          {" · ID "}
          {user.id}
        </div>
        {(user.institution || user.cohort) && (
          <div style={styles.heroMetaRowDark}>
            {user.institution && (
              <span style={styles.heroMetaItemDark}>
                <Building2 size={13} /> {user.institution}
              </span>
            )}
            {user.cohort && (
              <span style={styles.heroMetaItemDark}>
                <GraduationCap size={13} /> Cohort {user.cohort}
              </span>
            )}
          </div>
        )}
      </div>

      <div style={styles.themeCard}>
        <div style={styles.themeCardLabel}>Theme</div>
        <div style={styles.themeCardLine}>I'm a Joshualite</div>
      </div>

      <div style={styles.quoteBlock}>{QUOTES.transform}</div>
      <div style={styles.quoteBlockAlt}>{QUOTES.dawn}</div>
      <div style={styles.quoteBlock}>{QUOTES.arena}</div>
      <div style={styles.quoteBlockAlt}>{QUOTES.ratio}</div>
    </div>
  );
}

/* ---------------------------- Styles ---------------------------- */

const globalCss = `
  * { box-sizing: border-box; }
  input, textarea, button { font-family: inherit; }
  input:focus, textarea:focus { outline: 2px solid ${GOLD}; }
  ::placeholder { color: #93a1bd; }
`;

const styles = {
  loginScreen: {
    minHeight: "100vh",
    background: `linear-gradient(160deg, ${NAVY_900} 0%, ${NAVY_700} 100%)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  loginCard: {
    background: "#fff",
    borderRadius: 18,
    padding: "28px 24px",
    width: "100%",
    maxWidth: 360,
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  },
  brandRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  crest: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: NAVY_800,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontWeight: 700,
    fontSize: 16,
  },
  crestImg: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 },
  brandName: { fontWeight: 700, color: NAVY_900, fontSize: 15 },
  brandSub: { color: "#6b7690", fontSize: 12 },
  themeLine: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: NAVY_900,
    fontSize: 26,
    margin: "4px 0 18px",
  },
  label: { display: "block", fontSize: 12, color: "#4c5875", marginBottom: 6, marginTop: 12 },
  input: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 10,
    border: "1px solid #d7ddec",
    fontSize: 14,
    color: NAVY_900,
    marginBottom: 4,
  },
  errorText: { color: "#b8433f", fontSize: 12.5, marginTop: 8 },
  roleToggleRow: { display: "flex", gap: 8, marginBottom: 4 },
  roleToggleBtn: {
    flex: 1,
    padding: "9px 4px",
    borderRadius: 9,
    border: "1px solid #d7ddec",
    background: "#fff",
    color: "#4c5875",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  roleToggleBtnActive: {
    background: NAVY_800,
    borderColor: NAVY_800,
    color: "#fff",
  },
  primaryBtn: {
    width: "100%",
    marginTop: 18,
    padding: "12px 14px",
    borderRadius: 10,
    border: "none",
    background: NAVY_800,
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  primaryBtnSmall: {
    padding: "9px 14px",
    borderRadius: 9,
    border: "none",
    background: NAVY_800,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    marginTop: 10,
  },
  hint: { fontSize: 11.5, color: "#8894ac", marginTop: 14, lineHeight: 1.5 },
  loginQuote: {
    color: "#c7d2e6",
    fontSize: 12.5,
    marginTop: 22,
    textAlign: "center",
    maxWidth: 300,
    fontStyle: "italic",
  },
  welcomeCard: { display: "flex", flexDirection: "column", alignItems: "center" },
  crestBigImg: { width: 84, height: 84, borderRadius: "50%", objectFit: "cover", marginBottom: 16 },
  crestBig: {
    width: 74,
    height: 74,
    borderRadius: 20,
    background: GOLD,
    color: NAVY_900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    fontSize: 26,
    marginBottom: 16,
  },
  welcomeText: {
    color: "#fff",
    fontFamily: "Georgia, serif",
    fontSize: 24,
    fontWeight: 700,
  },
  welcomeSub: { color: "#c7d2e6", fontSize: 13, marginTop: 4 },

  appShell: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: OFFWHITE,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  header: {
    background: NAVY_900,
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 10 },
  crestSmallImg: { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0 },
  crestSmall: {
    width: 34,
    height: 34,
    borderRadius: 8,
    background: NAVY_600,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    fontSize: 13,
  },
  headerGreeting: { color: "#fff", fontSize: 14, fontWeight: 600 },
  headerRole: { color: GOLD, fontSize: 11 },
  iconBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: 8,
    padding: 8,
    cursor: "pointer",
  },
  main: { flex: 1, overflowY: "auto", paddingBottom: 12 },
  tabPane: { padding: "14px 14px 20px" },

  tabBar: {
    display: "flex",
    background: NAVY_900,
    borderTop: `1px solid ${NAVY_700}`,
    padding: "6px 4px 8px",
  },
  tabBtn: {
    flex: 1,
    background: "none",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "6px 0",
    cursor: "pointer",
  },

  heroCard: {
    position: "relative",
    background: `linear-gradient(135deg, ${NAVY_800} 0%, ${NAVY_900} 100%)`,
    borderRadius: 16,
    padding: "20px 18px",
    marginBottom: 14,
    overflow: "hidden",
  },
  heroBlobOne: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
  },
  heroBlobTwo: {
    position: "absolute",
    top: 40,
    right: 30,
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.045)",
  },
  heroEyebrow: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#9fb0d4",
    fontSize: 12,
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  heroTitle: {
    position: "relative",
    color: "#fff",
    fontFamily: "Georgia, serif",
    fontSize: 26,
    lineHeight: 1.25,
    fontWeight: 700,
    marginBottom: 12,
  },
  heroMetaRow: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
  },
  heroMetaItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    color: "#c7d2e6",
    fontSize: 12.5,
  },
  heroMetaRowDark: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },
  heroMetaItemDark: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    color: "#c7d2e6",
    fontSize: 12,
  },

  pageHeader: { marginBottom: 14 },
  pageHeaderEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#8894ac",
    fontSize: 11.5,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  pageHeaderTitleRow: { display: "flex", alignItems: "center", gap: 8 },
  pageHeaderTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 20,
    fontWeight: 700,
    color: NAVY_900,
  },
  pageHeaderSubtitle: { fontSize: 12.5, color: "#6b7690", marginTop: 4 },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    border: "1px solid #e0e4ee",
    borderRadius: 12,
    padding: "10px 12px",
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: NAVY_900,
    background: "transparent",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    color: NAVY_800,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 14,
    padding: 0,
  },
  memberDetailCard: {
    background: NAVY_900,
    borderRadius: 16,
    padding: "22px 16px",
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: NAVY_600,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  memberDetailName: { color: "#fff", fontWeight: 700, fontSize: 16 },
  memberDetailRole: { color: "#c7d2e6", fontSize: 12.5, marginTop: 2 },

  bannerCard: {
    background: NAVY_900,
    borderRadius: 14,
    padding: "16px 16px",
    marginBottom: 14,
  },
  bannerQuote: {
    color: "#fff",
    fontFamily: "Georgia, serif",
    fontSize: 16.5,
    lineHeight: 1.4,
  },

  quickMeetingCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: NAVY_800,
    borderRadius: 14,
    padding: "12px 14px",
    marginBottom: 14,
  },
  quickMeetingBell: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  quickMeetingTitle: {
    color: "#fff",
    fontSize: 13.5,
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  quickMeetingMeta: { color: "#aebbd9", fontSize: 11.5, marginTop: 2 },
  quickJoinBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "#fff",
    color: NAVY_900,
    border: "none",
    borderRadius: 18,
    padding: "7px 12px",
    fontSize: 12.5,
    fontWeight: 700,
    cursor: "pointer",
    flexShrink: 0,
  },
  quickDismissBtn: {
    background: "none",
    border: "none",
    color: "#aebbd9",
    cursor: "pointer",
    flexShrink: 0,
    padding: 4,
  },

  composerCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    border: "1px solid #e6e9f2",
  },
  textarea: {
    width: "100%",
    border: "1px solid #e0e4ee",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    resize: "none",
    color: NAVY_900,
  },
  mediaPreviewWrap: { position: "relative", marginTop: 10, width: "fit-content" },
  mediaPreview: { maxWidth: "100%", maxHeight: 180, borderRadius: 10, display: "block" },
  removeMediaBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    background: NAVY_900,
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "50%",
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  composerRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" },
  attachBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 8,
    background: "#eef1f8",
    color: NAVY_800,
    cursor: "pointer",
  },
  attachTextBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12.5,
    color: "#5b6b85",
    cursor: "pointer",
    padding: "6px 4px",
  },
  tagToggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12.5,
    color: "#5b6b85",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "6px 4px",
  },
  tagToggleActive: {
    color: NAVY_800,
    fontWeight: 700,
  },
  filterChip: {
    background: "#eef1f8",
    border: "none",
    color: NAVY_800,
    fontSize: 12.5,
    padding: "7px 12px",
    borderRadius: 20,
    marginBottom: 10,
    cursor: "pointer",
  },
  emptyState: {
    color: "#8894ac",
    fontSize: 13,
    textAlign: "center",
    padding: "24px 10px",
  },

  postCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    border: "1px solid #e6e9f2",
  },
  postHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: NAVY_700,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  postAuthor: { fontWeight: 700, fontSize: 13.5, color: NAVY_900 },
  postMeta: { fontSize: 11.5, color: "#8894ac" },
  tagBadge: {
    background: "#fdf3e0",
    color: "#9c7a1f",
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 20,
    fontWeight: 600,
  },
  postCaption: { fontSize: 13.5, color: "#2c3550", lineHeight: 1.5, marginBottom: 8 },
  postMedia: { width: "100%", borderRadius: 10, marginBottom: 8, maxHeight: 260, objectFit: "cover" },
  repliesWrap: { borderTop: "1px solid #f0f2f8", paddingTop: 8, marginTop: 4 },
  replyRow: { fontSize: 12.5, color: "#454f6b", marginBottom: 4 },
  replyInputRow: { display: "flex", gap: 8, marginTop: 8 },
  replyInput: {
    flex: 1,
    border: "1px solid #e0e4ee",
    borderRadius: 20,
    padding: "7px 12px",
    fontSize: 12.5,
  },
  sendSmallBtn: {
    background: NAVY_800,
    border: "none",
    borderRadius: "50%",
    width: 30,
    height: 30,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  sectionTitle: { fontWeight: 700, fontSize: 14.5, color: NAVY_900, marginBottom: 8 },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    background: "#fff",
    border: "1px solid #e6e9f2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    cursor: "pointer",
  },
  chatWindow: { display: "flex", flexDirection: "column", height: "100%" },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderBottom: "1px solid #e6e9f2",
    background: "#fff",
  },
  backBtn: { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: NAVY_800 },
  chatBody: { flex: 1, overflowY: "auto", padding: 14 },
  bubbleRow: { display: "flex", marginBottom: 8 },
  bubbleMine: {
    background: NAVY_800,
    color: "#fff",
    padding: "9px 13px",
    borderRadius: "14px 14px 2px 14px",
    fontSize: 13.5,
    maxWidth: "75%",
  },
  bubbleTheirs: {
    background: "#eef1f8",
    color: NAVY_900,
    padding: "9px 13px",
    borderRadius: "14px 14px 14px 2px",
    fontSize: 13.5,
    maxWidth: "75%",
  },
  chatInputRow: {
    display: "flex",
    gap: 8,
    padding: 10,
    borderTop: "1px solid #e6e9f2",
    background: "#fff",
  },
  chatInput: {
    flex: 1,
    border: "1px solid #e0e4ee",
    borderRadius: 20,
    padding: "10px 14px",
    fontSize: 14,
  },
  sendBtn: {
    background: NAVY_800,
    border: "none",
    borderRadius: "50%",
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  meetingCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    border: "1px solid #e6e9f2",
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginTop: 14,
  },
  videoTile: {
    position: "relative",
    background: NAVY_900,
    borderRadius: 10,
    overflow: "hidden",
    aspectRatio: "4 / 3",
  },
  videoEl: { width: "100%", height: "100%", objectFit: "cover" },
  videoOffTile: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    background: NAVY_700,
  },
  videoLabel: {
    position: "absolute",
    bottom: 4,
    left: 6,
    color: "#fff",
    fontSize: 10.5,
    background: "rgba(0,0,0,0.4)",
    padding: "1px 6px",
    borderRadius: 4,
  },
  meetingControls: { display: "flex", gap: 10, marginTop: 14, justifyContent: "center" },
  controlBtn: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "1px solid #d7ddec",
    background: "#eef1f8",
    color: NAVY_800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leaveBtn: {
    padding: "0 18px",
    height: 42,
    borderRadius: 21,
    border: "none",
    background: "#b8433f",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  controlBtnActive: {
    background: NAVY_800,
    color: "#fff",
    borderColor: NAVY_800,
  },
  controlBtnDanger: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "none",
    background: "#b8433f",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  recordingBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#b8433f",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 10px",
    borderRadius: 8,
    marginTop: 12,
    width: "fit-content",
  },
  meetingChatPanel: {
    marginTop: 14,
    border: "1px solid #e6e9f2",
    borderRadius: 12,
    overflow: "hidden",
  },
  meetingChatBody: {
    maxHeight: 180,
    overflowY: "auto",
    padding: 10,
    background: "#fafbfd",
  },
  meetingChatRow: { fontSize: 12.5, color: "#454f6b", marginBottom: 6 },
  downloadRecordingLink: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: 12,
    fontSize: 13,
    color: NAVY_800,
    fontWeight: 600,
    textDecoration: "none",
  },

  eventCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 14,
    border: "1px solid #e6e9f2",
    marginBottom: 10,
  },
  reminderBanner: {
    display: "flex",
    alignItems: "center",
    background: NAVY_800,
    color: "#fff",
    fontSize: 13,
    padding: "10px 12px",
    borderRadius: 10,
    marginBottom: 12,
  },
  reminderOnBtn: {
    padding: "9px 14px",
    borderRadius: 9,
    border: "1px solid #cfe3d4",
    background: "#e9f6ec",
    color: "#2e7d43",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    marginTop: 10,
  },

  profileHero: {
    background: NAVY_900,
    borderRadius: 16,
    padding: "26px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarUploadWrap: {
    position: "relative",
    display: "inline-block",
    marginBottom: 12,
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: GOLD,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${NAVY_900}`,
    cursor: "pointer",
  },
  uploadHint: { color: "#c7d2e6", fontSize: 11.5, marginBottom: 8 },
  errorTextLight: { color: "#f0a8a5", fontSize: 11.5, marginBottom: 8 },
  themeCard: {
    background: "#fff",
    border: `1px solid ${GOLD}`,
    borderRadius: 14,
    padding: 16,
    textAlign: "center",
    marginBottom: 14,
  },
  themeCardLabel: { fontSize: 11, color: "#8894ac", letterSpacing: 0.3 },
  themeCardLine: {
    fontFamily: "Georgia, serif",
    fontSize: 22,
    color: NAVY_900,
    marginTop: 4,
  },
  quoteBlock: {
    background: NAVY_900,
    color: "#fff",
    borderRadius: 12,
    padding: 14,
    fontFamily: "Georgia, serif",
    fontSize: 14.5,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  quoteBlockAlt: {
    background: "#fff",
    color: NAVY_900,
    border: `1px solid ${GOLD}`,
    borderRadius: 12,
    padding: 14,
    fontFamily: "Georgia, serif",
    fontSize: 14.5,
    lineHeight: 1.5,
    marginBottom: 10,
  },
};
