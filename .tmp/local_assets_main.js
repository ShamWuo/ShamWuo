<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Productivity Incremental (MVP)</title>
  <!-- minimal theme only -->
  <link rel="stylesheet" href="css/minimal.css">
  <!-- Nice geometric font for a clean gamey feel -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
  <div id="app" class="container">
    <header>
      <div class="brand">
  <!-- inline logo svg -->
  <svg class="logo" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#f2d7b3"/><stop offset="1" stop-color="#e3c7a5"/></linearGradient></defs><rect rx="8" width="48" height="48" fill="url(#g1)"></rect><path d="M12 34 L18 18 L30 34 Z" fill="#2b1f14"/></svg>
        <div class="title">Productivity Incremental</div>
      </div>
  <!-- toolbar: search, export/import, reset, undo, sound -->
  <div class="top-controls toolbar">
        <input id="taskSearch" placeholder="Search tasks (/)" aria-label="Search tasks" />
  <button id="favFilterBtn" class="btn btn-ghost" title="Show favorites only">Favorites</button>
  <button id="compactToggle" class="btn btn-ghost" title="Compact view">Compact</button>
      <select id="profileSelect" style="margin-left:8px"><option value="default">Profile: You</option></select>
      <button id="addProfileBtn" class="btn btn-ghost" title="Add profile">+Profile</button>
        <button id="undoBtn" class="btn btn-ghost" title="Undo last action">Undo</button>
  <div class="undo-dropdown"><button id="undoHistoryBtn" class="btn btn-ghost" title="Undo history">History</button><div id="undoHistoryList" class="dropdown hidden"></div></div>
        <button id="exportSaveBtn" class="btn btn-ghost" title="Export save">Export</button>
  <button id="exportTasksCsv" class="btn btn-ghost" title="Export tasks CSV">Export Tasks CSV</button>
  <button id="exportPdfBtn" class="btn btn-ghost" title="Export visible app to PDF">Export PDF</button>
  <button id="quickPasteBtn" class="btn btn-ghost" title="Paste lines from clipboard to add tasks">Quick Paste</button>
        <input id="importFile" type="file" accept="application/json" style="display:none" />
  <button id="importSaveBtn" class="btn btn-ghost" title="Import save">Import</button>
  <input id="importUrl" placeholder="Import from URL" style="width:180px;margin-left:6px" />
  <button id="importUrlBtn" class="btn btn-ghost" title="Import from URL">Import URL</button>
        <button id="resetBtn" class="btn btn-ghost" title="Reset progress">Reset</button>
        <label class="sound-toggle"><input id="soundToggle" type="checkbox" /> Sound</label>
  <label class="notify-toggle" style="margin-left:8px"><input id="notifyToggle" type="checkbox" /> Notify</label>
  <select id="quickAdd" style="margin-left:6px"><option value="">Quick add...</option><option value="1">Quick: Email</option><option value="2">Quick: Meeting</option><option value="3">Quick: Code review</option></select>
        <div id="autosaveIndicator" class="autosave">Saved</div>
        <!-- Extra features batch: 50 toggles -->
        <div id="extraFeaturesToggle" style="margin-left:12px">
          <button id="showExtraFeatures" class="btn btn-ghost">+50 Features</button>
        </div>
        <!-- Advanced feature controls -->
        <button id="darkToggle" class="btn btn-ghost" title="Toggle dark mode">Dark</button>
        <button id="redoBtn" class="btn btn-ghost" title="Redo last undone">Redo</button>
        <div style="display:inline-flex;gap:6px;align-items:center;margin-left:8px">
          <input id="slotName" placeholder="slot name" style="width:110px" />
          <button id="saveSlotBtn" class="btn btn-small btn-ghost">Save Slot</button>
          <button id="loadSlotBtn" class="btn btn-small btn-ghost">Load Slot</button>
        </div>
  <button id="cloudSyncBtn" class="btn btn-ghost" title="Cloud sync (simulated)">Sync</button>
  <button id="viewCloudQueueBtn" class="btn btn-ghost" title="View pending uploads" style="margin-left:6px">View queue</button>
  <div id="cloudQueueBadge" style="display:inline-block;margin-left:8px;vertical-align:middle"><span class="badge cloud-badge" id="cloudQueueCount" style="display:none">0</span></div>
        <button id="calendarToggle" class="btn btn-ghost" title="Toggle calendar view">Calendar</button>
        <button id="startChallengeBtn" class="btn btn-ghost" title="Start challenge">Start Challenge</button>
        <select id="autoWorkerInterval" style="margin-left:6px"><option value="15000">Auto-worker 15s</option><option value="30000">30s</option><option value="60000">60s</option></select>
        <select id="autoWorkerMaxDiff"><option value="1">Max diff 1</option><option value="2">Max diff 2</option><option value="3">Max diff 3</option></select>
        <button id="exportUndoBtn" class="btn btn-ghost">Export Undo</button>
        <input id="importUndoFile" type="file" accept="application/json" style="display:none" />
        <button id="importUndoBtn" class="btn btn-ghost">Import Undo</button>
        <select id="themePicker" style="margin-left:6px"><option value="default">Theme</option><option value="tan">Tan</option><option value="blue">Blue</option></select>
        <button id="highContrastBtn" class="btn btn-ghost">High Contrast</button>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation" title="Toggle navigation" aria-expanded="false">
        <!-- hamburger -->
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
      </button>
    </header>

    <div class="app-shell">
      <aside class="sidebar" role="navigation" aria-label="Sidebar" aria-expanded="false">
        <nav class="main-nav" aria-label="Main">
            <button type="button" data-nav="dashboard" class="nav-btn" aria-controls="dashboard"> <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" fill="currentColor"/></svg><span>Dashboard</span></button>
            <button type="button" data-nav="tasks" class="nav-btn" aria-controls="tasks"> <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11H7v2h2v-2zm0-4H7v2h2V7zm4 0h6v2h-6V7zm0 4h6v2h-6v-2zM3 5v14c0 1.1.9 2 2 2h14v-2H5V5H3z" fill="currentColor"/></svg><span>Tasks</span></button>
            <button type="button" data-nav="upgrades" class="nav-btn" aria-controls="upgrades"> <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5.5 7 12 4.5 18.5 7 12 9.5zM2 17l10 5 10-5V11l-10 5-10-5v6z" fill="currentColor"/></svg><span>Upgrades</span></button>
            <button type="button" data-nav="quests" class="nav-btn" aria-controls="quests"> <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" fill="currentColor"/></svg><span>Quests</span></button>
            <button type="button" data-nav="analytics" class="nav-btn" aria-controls="analytics"> <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17h3v4H3v-4zm5-6h3v10H8V11zm5-4h3v14h-3V7zm5 8h3v6h-3v-6z" fill="currentColor"/></svg><span>Analytics</span></button>
        </nav>
        <div class="status">
          <div id="coins" class="chip"> <svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#f2d7b3"/><path d="M12 8v8M9 11h6" stroke="#2b1f14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg> <span>Coins: <strong><span id="coinsValue">0</span></strong></span></div>
          <div id="level" class="chip"> <svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16 7.5 20l2-7L4 9h7z" fill="#f2d7b3"/></svg> <span>Level: <strong><span id="levelValue">1</span></strong></span></div>
          <div id="prestigeDisplay" class="chip">Prestige: <span id="prestigeMul">x1.00</span></div>
          <div><button id="prestigeBtn" class="btn btn-ghost">Prestige</button></div>
          <div id="premiumStatus" class="chip" style="margin-left:8px"><svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2L15 8l6 .5-4.5 3.5L19 20l-7-4-7 4 2.5-8L2 8.5 8 8 12 2z" fill="#f2d7b3"/></svg> <span>Free</span></div>
        </div>
      </aside>

  <!-- sidebar backdrop for mobile slide-over -->
  <div id="sidebarBackdrop" class="sidebar-backdrop" hidden aria-hidden="true"></div>

  <!-- live region for accessible announcements -->
  <div id="announcer" aria-live="polite" style="position:fixed;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden"></div>

  <main class="app-pane">
  <div class="app-content">
  <section class="xp-section page" data-page="dashboard">
    <div class="dashboard-grid">
      <div class="kpi-card">
  <div class="kpi-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16 7.5 20l2-7L4 9h7z" fill="#f2d7b3"/></svg></div>
        <div class="kpi-label">XP</div>
        <div class="kpi-value" id="xpText">0 / 100</div>
        <div class="kpi-bar"><div id="xpFill" class="xp-fill" style="width:0"></div></div>
      </div>
      <div class="kpi-card">
  <div class="kpi-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#f2d7b3"/><path d="M12 8v8M9 11h6" stroke="#2b1f14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        <div class="kpi-label">Coins</div>
        <div class="kpi-value" id="coinsKPI">0</div>
      </div>
      <div class="kpi-card">
  <div class="kpi-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16 7.5 20l2-7L4 9h7z" fill="#f2d7b3"/></svg></div>
        <div class="kpi-label">Level</div>
        <div class="kpi-value" id="levelKPI">1</div>
      </div>
      <div class="kpi-card">
  <div class="kpi-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M2 12h6l2 6 4-12 2 6 6-6" stroke="#2b1f14" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        <div class="kpi-label">Streak</div>
        <div class="kpi-value" id="dailyStreakKPI">0</div>
      </div>
      <div class="kpi-card">
  <div class="kpi-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M9 11H7v2h2v-2zm0-4H7v2h2V7zm4 0h6v2h-6V7zm0 4h6v2h-6v-2zM3 5v14c0 1.1.9 2 2 2h14v-2H5V5H3z" fill="#2b1f14"/></svg></div>
        <div class="kpi-label">Tasks</div>
        <div class="kpi-value" id="tasksKPI">0</div>
      </div>
      <div class="kpi-card">
  <div class="kpi-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5.5 7 12 4.5 18.5 7 12 9.5zM2 17l10 5 10-5V11l-10 5-10-5v6z" fill="#2b1f14"/></svg></div>
        <div class="kpi-label">Upgrades</div>
        <div class="kpi-value" id="upgradesKPI">0</div>
      </div>
    </div>
    <div class="idle-rates">Idle: <span id="idleRates">XP: 1/s • Coins: 1/s</span></div>
    <div class="dashboard-row">
      <div class="upgrade"><div>2x Idle for 10m</div><div><button type="button" class="btn btn-small btn-primary" data-booster-id="booster_2x">Buy (100)</button></div></div>
      <div class="upgrade"><div>1.5x Task Rewards for 30m</div><div><button type="button" class="btn btn-small btn-primary" data-booster-id="booster_15">Buy (150)</button></div></div>
      <div id="boostersInfo" aria-live="polite" style="margin-left:16px"></div>
    </div>
    <div id="dashboardUpgrades" class="upgrades-summary" aria-live="polite"></div>
  </section>
  <section class="templates" style="padding:12px;margin-top:8px">
    <h3>Templates</h3>
    <div style="display:flex;gap:8px;align-items:center"><input id="tplTitle" placeholder="Template title"/><button id="tplAdd" class="btn btn-small btn-primary">Add template</button><select id="tplApply"><option value="">Apply template...</option></select></div>
  </section>
  </div>
  <div class="right-rail">
    <section class="templates" style="padding:12px;margin-top:8px">
    </section>
    <!-- Extra features panel physically placed in right-rail for layout stability -->
    <section id="extraFeaturesPanel" class="page" style="padding:12px;">
      <div class="extra-panel-header" style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <div style="display:flex;gap:12px;align-items:center"><h3 style="margin:0">Additional Features</h3><div class="muted">(50)</div><div>Active: <strong id="featuresActiveCount">0</strong></div></div>
        <div style="display:flex;gap:8px;align-items:center">
          <button id="featuresCollapse" class="btn btn-ghost" title="Close panel">Close</button>
          <button id="featuresCloseX" class="btn btn-ghost" aria-label="Close" title="Close">✕</button>
        </div>
      </div>
      <div id="extraFeaturesGrid" class="features-grid" aria-live="polite" style="min-height:40px"></div>
    </section>
  </div>
  <div class="left-col page" data-page="dashboard-left">
  <section class="tasks page" data-page="tasks">
        <h2>Tasks</h2>
  <form id="taskForm" class="task-form" novalidate>
          <input id="taskTitle" name="taskTitle" placeholder="Task title" required />
          <input id="taskCategory" name="taskCategory" placeholder="Category (e.g. Work, Study)" />
          <select id="taskDifficulty" name="taskDifficulty">
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
          </select>
          <button type="submit" class="btn btn-primary">Add Task</button>
        </form>

        <ul id="taskList" class="task-list"></ul>
  </section>

  <section id="calendarSection" class="page" style="padding:12px;display:none">
    <h2>Calendar</h2>
  <div id="calendarToolbar" style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><button id="prevMonth" class="btn btn-ghost">◀</button><div id="calendarMonthLabel"></div><button id="nextMonth" class="btn btn-ghost">▶</button><label style="margin-left:12px">Reminder: <input id="reminderPicker" type="datetime-local" /></label></div>
  <div id="calendarView" style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px"></div>
  </section>

  <section id="leaderboardSection" class="page" style="padding:12px;display:none">
    <h2>Leaderboard</h2>
    <div id="leaderboardView">Local leaderboard (stub)</div>
  </section>

  <section id="archiveSection" class="page" style="padding:12px;display:none">
    <h2>Archive</h2>
    <div id="archiveList">No archived tasks</div>
  </section>

  <section class="pomodoro page" data-page="pomodoro">
        <h2>Pomodoro</h2>
        <div>
          <div id="pomodoroDisplay">00:00</div>
          <button id="pomodoroStart" class="btn btn-primary">Start Pomodoro</button>
          <button id="pomodoroStop" class="btn btn-ghost" style="margin-left:8px">Stop</button>
        
        </div>
  </section>

  <section class="achievements page" data-page="achievements">
        <h2>Achievements</h2>
        <ul id="achievementsList"></ul>
      </section>
  </div>

  <section class="upgrades page" data-page="upgrades">
        <h2>Upgrades</h2>
        <div id="upgradesList" class="upgrades-list"></div>
      </section>
      
  <section class="quests page" data-page="quests">
        <h2>Daily Quests</h2>
        <ul id="questsList"></ul>
      </section>

  <section class="boosters page" data-page="boosters">
        <h2>Boosters</h2>
        <div id="boostersShop">
          <div class="upgrade"><div>2x Idle for 10m</div><div><button data-booster-id="booster_2x">Buy (100 coins)</button></div></div>
          <div class="upgrade"><div>1.5x Task Rewards for 30m</div><div><button data-booster-id="booster_15">Buy (150 coins)</button></div></div>
        </div>
      </section>

      <section class="premium">
        <h2>Premium</h2>
        <p>Premium features (non-blocking): auto double rewards, exclusive themes, analytics. <em>Not required for core gameplay.</em></p>
        <button id="premiumBtn">Learn about Premium</button>
      </section>

  <section class="analytics page" id="analyticsPanel" data-page="analytics">
        <h2>Analytics</h2>
        <div id="analyticsContent">
          <div>Daily streak: <span id="dailyStreak">0</span></div>
          <div>Total XP: <span id="totalXP">0</span></div>
          <div>Total Coins: <span id="totalCoins">0</span></div>
          <div>Last completed: <span id="lastComplete">—</span></div>
          <div style="margin-top:8px"><button id="exportCsv" class="btn btn-ghost">Export Analytics CSV</button></div>
        </div>
      </section>
  </main>
  </div> <!-- /.app-shell -->

    <script>
      // Basic SPA nav: show/hide pages using data-page and nav buttons
      (function(){
        function showPage(name){
          document.querySelectorAll('.page').forEach(el=> el.classList.toggle('hidden', !(el.dataset.page===name || (name==='dashboard' && el.dataset.page==='dashboard-left'))))
        }
        document.querySelectorAll('.main-nav .nav-btn').forEach(b=>{
          b.addEventListener('click', ()=>{
            document.querySelectorAll('.main-nav .nav-btn').forEach(x=>x.classList.remove('active'))
            b.classList.add('active')
            showPage(b.dataset.nav)
          })
        })
        // default
        const first = document.querySelector('.main-nav .nav-btn')
        if(first) { first.classList.add('active'); showPage(first.dataset.nav) }
  })();
  // sidebar toggle for mobile
  (function(){
        const toggle = document.querySelector('.nav-toggle')
        const sidebar = document.querySelector('.sidebar')
        if(toggle && sidebar){
          toggle.addEventListener('click', ()=>{ sidebar.classList.toggle('collapsed'); })
        }
      })()
    </script>

  <!-- Premium modal -->
  <div id="premiumModalBackdrop" class="modal-backdrop" aria-hidden="true">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="premiumTitle">
      <h3 id="premiumTitle">Premium Subscription</h3>
      <p>Premium features (non-blocking): auto double rewards for completed tasks, exclusive cosmetic themes, and an analytics dashboard.</p>
      <p><strong>Simulated price:</strong> $2.99 / month (demo only)</p>
        <div id="premiumActions">
        <button id="purchasePremiumBtn" class="btn btn-primary">Purchase Premium</button>
        <button id="cancelPremiumBtn" class="btn btn-ghost" style="margin-left:8px;display:none;">Cancel Premium</button>
        <button id="closePremiumBtn" class="btn btn-ghost" style="margin-left:8px;">Close</button>
      </div>
    </div>
  </div>

  <!-- Event edit modal (used by calendar / quick edit) -->
  <div id="eventEditModalBackdrop" class="modal-backdrop" aria-hidden="true">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="eventEditTitle">
      <h3 id="eventEditTitle">Edit Event</h3>
      <div style="display:flex;flex-direction:column;gap:8px">
        <label>Title: <input id="eventEditTitleInput" /></label>
        <label>Date / Time: <input id="eventEditDatetime" type="datetime-local" /></label>
  <label>Recurrence:
    <select id="eventEditRecurrence">
      <option value="">None</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  </label>
  <div id="eventEditRecurrenceControls" style="display:flex;flex-direction:column;gap:6px;">
    <label id="eventEditRecurrenceIntervalLabel" style="display:none">Interval: <input id="eventEditRecurrenceInterval" type="number" min="1" value="1" style="width:64px" /> </label>
    <div id="eventEditRecurrenceWeekdays" style="display:none">Weekdays:
      <label><input type="checkbox" data-wday="1"/> Mon</label>
      <label><input type="checkbox" data-wday="2"/> Tue</label>
      <label><input type="checkbox" data-wday="3"/> Wed</label>
      <label><input type="checkbox" data-wday="4"/> Thu</label>
      <label><input type="checkbox" data-wday="5"/> Fri</label>
      <label><input type="checkbox" data-wday="6"/> Sat</label>
      <label><input type="checkbox" data-wday="0"/> Sun</label>
    </div>
    <div id="eventEditRecurrenceEnd" style="display:none">
      End: <label><input type="radio" name="rec_end" value="never" checked /> Never</label>
      <label><input type="radio" name="rec_end" value="after" /> After <input id="eventEditRecurrenceCount" type="number" min="1" value="1" style="width:64px" /> occurrences</label>
      <label><input type="radio" name="rec_end" value="until" /> Until <input id="eventEditRecurrenceUntil" type="date" /></label>
    </div>
  </div>
  <label style="display:flex;align-items:center;gap:8px;margin-top:8px"><input id="eventEditReminder" type="checkbox" /> <span>Set reminder for this event</span></label>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:6px">
          <button id="eventEditSaveBtn" class="btn btn-primary">Save</button>
          <button id="eventEditCloseBtn" class="btn btn-ghost">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Cloud queue viewer modal -->
  <div id="cloudQueueModal" class="modal-backdrop" aria-hidden="true">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="cloudQueueTitle">
      <h3 id="cloudQueueTitle">Pending Cloud Uploads</h3>
      <div style="max-height:320px;overflow:auto;margin-top:8px">
        <ul id="cloudQueueList" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px"></ul>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <div>
          <button id="cloudForceRetryBtn" class="btn btn-small btn-primary">Force retry now</button>
          <button id="cloudRetryAllBtn" class="btn btn-primary" style="margin-left:8px">Retry all</button>
          <button id="cloudClearAllBtn" class="btn btn-ghost" style="margin-left:8px">Clear all</button>
        </div>
        <div>
          <button id="cloudQueueCloseBtn" class="btn btn-ghost">Close</button>
        </div>
      </div>
    </div>

      <!-- Cloud queued payload preview modal -->
      <div id="cloudPreviewModal" class="modal-backdrop" aria-hidden="true">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="cloudPreviewTitle">
          <h3 id="cloudPreviewTitle">Queued Payload Preview</h3>
          <div style="max-height:420px;overflow:auto;margin-top:8px">
            <pre id="cloudPreviewContent" style="white-space:pre-wrap;word-break:break-word;background:#f7f7f7;padding:12px;border-radius:6px;max-height:380px;overflow:auto"></pre>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
            <button id="cloudPreviewCopyBtn" class="btn btn-small btn-ghost">Copy</button>
            <button id="cloudPreviewDownloadBtn" class="btn btn-small btn-ghost">Download</button>
            <button id="cloudPreviewCloseBtn" class="btn btn-ghost">Close</button>
          </div>
        </div>
      </div>

      <!-- Confirm modal (replaces native confirm for consistent UI) -->
      <div id="cloudConfirmModal" class="modal-backdrop" aria-hidden="true">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="cloudConfirmTitle">
          <h3 id="cloudConfirmTitle">Confirm</h3>
          <div style="margin-top:8px">
            <div id="cloudConfirmMessage">Are you sure?</div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
            <button id="cloudConfirmCancelBtn" class="btn btn-ghost">Cancel</button>
            <button id="cloudConfirmConfirmBtn" class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
  </div>

    <footer>
      <small>Progress is saved to localStorage. This is an MVP — expand themes, analytics, and premium hooks in JS modules.</small>
    </footer>
  </div>

  <script type="module" src="js/main.js"></script>
</body>
<!-- Optional client-side PDF/export libraries (used when online) -->
<script src="https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
</html>
