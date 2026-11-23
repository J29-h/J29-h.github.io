/* Project pages, opened from the Explore buttons on My Work.
   Every project keeps the portfolio's look (night sky, gold frames, tarot-card motion)
   but has its own layout: its own hero and its own way of showing the work.
   Text comes from the Figma designs. script.js adds the motion. */
(function () {
  const I = (p, n) => `assets/projects/${p}/${n}.webp`;
  const V = (p, n) => `assets/projects/${p}/${n}.mp4`;
  const r = (d = 0, k = 'up', x = '') => `data-r="${k}" style="--d:${d};${x}"`;

  const DATA = {
    rk: {
      cat: 'Game', accent: '#e0a458', title: 'Recycling Kingdoms', hv: 'cinema', img: I('rk', 'g-island'),
      tag: 'Augmented Reality gaming for children to boost environmental awareness in waste sorting and recycling.',
      facts: [['Type', 'AR Game'], ['Audience', 'Children'], ['Focus', 'Waste sorting & recycling']],
      scene: I('rk', 'g-island'), video: V('rk', 'trailer'),
      sections: [
        { t: 'intro', center: 1, k: 'Game Introduction', h: 'Learning that feels like play',
          p: ['With climate change posing growing challenges, promoting environmental awareness is essential, especially among younger generations. Saudi Arabia’s population shows increasing interest in digital gaming, creating a unique opportunity to integrate learning with play.',
            'Recycling Kingdoms leverages Augmented Reality (AR) to teach children about waste sorting and recycling, making these practices engaging and interactive — fostering responsible habits by immersing children in an AR environment where they can learn and practice waste management.'] },
        { t: 'band', split: 1, k: 'Why it matters', img: I('rk', 'mood'), img2: I('rk', 'g-meadow'), q: 'Every bottle in the right bin is a step toward a cleaner kingdom.',
          p: 'Real sorting habits, practised inside a game world children want to keep playing.' },
        { t: 'chapters', k: 'Game Story', h: 'A world drowning in waste', items: [
          ['The fall', 'Five ancient kingdoms have fallen into chaos. Nature is overrun by pollution, forgotten technologies lie buried under trash, and mythical guardians of balance have vanished.', I('rk', 'g-island')],
          ['The hero', 'An awakened hero, summoned by the Council of Nature Spirits, with a single mission: restore balance to the kingdoms.', I('rk', 'g-hero')],
          ['The journey', 'With a loyal pet companion and the kingdom’s spirit as a guide, travel from the overgrown ruins of Plastia to the scorched scrap-metal deserts of Metallica.', I('rk', 'g-map')]] },
        { t: 'quote', q: 'Restore balance and bring the kingdoms back to life — one piece of recycling at a time.' },
        { t: 'videos', k: 'Gameplay', h: 'Watch it play', items: [[V('rk', 'story'), I('rk', 'g-map'), 'The five kingdoms and their story'], [V('rk', 'modes'), I('rk', 'g-modes'), 'Game modes, levels and AR sorting']] },
        { t: 'fan', k: 'In the Game', h: 'Pick a card', screens: [[I('rk', 'g-meadow'), 'The meadow'], [I('rk', 'g-room'), 'Home, with the pet companion'], [I('rk', 'g-elder'), 'Talking to the village elder'], [I('rk', 'g-run'), 'Exploring the wasteland'], [I('rk', 'g-modes'), 'Quest, level and timer modes'], [I('rk', 'g-level'), 'Level one: plastic and glass'], [I('rk', 'g-map'), 'The kingdom map']] },
      ] },

    patient: {
      cat: 'Game', accent: '#c0392b', title: 'The Patient', hv: 'film', img: I('patient', 'g1'),
      tag: 'A short-form psychological horror mini-game driven by audio, environmental storytelling and tension through limited information.',
      facts: [['Genre', 'Horror · Mystery'], ['Style', 'Low-poly, PS1'], ['Engine', 'Unity'], ['Platform', 'macOS, Windows'], ['Role', 'Developer & Designer']],
      links: [['itch', 'Play on itch.io', 'https://leenaalthekair.itch.io/the-patient-tpg']],
      scene: I('patient', 'kitchen'),
      sections: [
        { t: 'intro', k: 'Overview', h: 'Follow the voice. Don’t trust it.', side: I('patient', 'door'),
          p: ['The Patient challenges players to follow unclear instructions under pressure while navigating an unsettling, low-poly PS1-style environment.',
            'I worked as both a developer and designer. Responsibilities were shared across gameplay logic, interaction systems, level design and overall experience design — implementing core mechanics, designing player interactions, shaping the visual atmosphere and integrating audio-driven gameplay.'] },
        { t: 'vsteps', k: 'Gameplay', h: 'The loop', items: [['Listen', 'Voicemail messages carry every instruction.'], ['Interpret', 'Instructions are vague on purpose.'], ['Explore', 'Search the house for what they mean.'], ['Perform', 'Act on the right object, in the right order.'], ['Escalate', 'Each step tightens the tension.']] },
        { t: 'cards', k: 'Key Systems', h: 'What makes it work', items: [
          ['Audio-Driven Instructions', 'Delivers gameplay instructions through voicemail messages instead of on-screen prompts. Audio cues trigger at specific progression points; players must listen, remember and interpret.'],
          ['Environmental Interaction & Progression', 'Players interact with specific objects to progress. Only selected objects are interactable, interactions are context-sensitive, and progression depends on the correct sequence.']] },
        { t: 'decisions', k: 'Design Decisions & Constraints', h: 'Choices with a cost', items: [
          ['PS1 Visual Style', 'Low-poly, PS1-inspired visuals instead of realism.', 'Reduced visual detail and clarity.'],
          ['Limited Interactivity', 'Only specific objects are interactable.', 'Players cannot freely interact with everything they see.'],
          ['Short Runtime', 'A short, contained experience.', 'Limited playtime and scope.']] },
        { t: 'band', img: I('patient', 'mood'), q: 'Nurse MJ is stuck in traffic. The patient still needs taking care of.' },
        { t: 'scenes', k: 'In the Game', h: 'Walk the halls', screens: [[I('patient', 'g1'), 'Title screen'], [I('patient', 'g3'), 'The kitchen'], [I('patient', 'g4'), 'The front door'], [I('patient', 'g2'), 'Pause menu']] },
        { t: 'quote', q: 'Best experienced with headphones. Pay attention — instructions matter.' },
        { t: 'cta', h: 'Brave enough to play?', p: 'The Patient is published on itch.io for macOS and Windows.' },
      ] },

    nba: {
      cat: 'Web', accent: '#3b6fe0', title: 'NBA', hv: 'court', img: I('nba', 'n-home'),
      tag: 'A sports-themed website powered by the NBA API: teams, rosters, positions and curated insights.',
      facts: [['Type', 'Website'], ['Data', 'NBA API'], ['Built with', 'HTML · CSS · JavaScript']],
      links: [['github', 'View on GitHub', 'https://github.com/J29-h/NBA-API']],
      scene: I('nba', 'ball'), credit: 'Photo: Kylie Osullivan / Unsplash', mq: ['Live data', 'Team pages', 'Player profiles', 'Team insights', 'NBA-themed design'],
      sections: [
        { t: 'quote', k: 'The Beginning', q: 'I chose the NBA API to stand out from typical API projects and to design a more engaging, sports-themed experience.' },
        { t: 'stats', k: 'The Website’s Features', h: 'Built for fans', items: [
          ['Dynamic Team Pages', 'Pulled live data from the NBA API to display each team’s roster, including player positions.'],
          ['Player Profiles', 'Showcased player details, with emphasis on popular figures across different NBA eras.'],
          ['Team Insights', 'Curated text and visuals describing each team’s history and standout moments.'],
          ['NBA-Themed Design', 'A sports-inspired color scheme, team logos and responsive layouts for a basketball fan experience.']] },
        { t: 'intro', k: 'The Process', h: 'Learning from the official site',
          p: ['I began by analyzing the official NBA website to understand its visual identity, layout structure, and how information is prioritized for users — studying the dominant colors, typography and branding that make the NBA recognizable.',
            'I adapted those principles while simplifying the layout for clarity and usability: a clean, themed interface that highlights teams and players without overwhelming the user, while keeping a strong NBA-inspired feel.'] },
        { t: 'band', img: I('nba', 'mood'), q: 'Built for the fans who know every jersey number.' },
        { t: 'bento', k: 'The Website', h: 'Tip-off to final buzzer', screens: [[I('nba', 'n-home'), 'Home carousel'], [I('nba', 'n-2k'), 'NBA 2K23 slide'], [I('nba', 'n-hall'), 'Hall of Famers'], [I('nba', 'n-teams'), 'Famous teams']] },
        { t: 'cta', h: 'Read the code', p: 'Two pages, plain HTML, CSS and JavaScript, with players loaded from a REST API.' },
      ] },

    fs: {
      cat: 'Web', accent: '#8fae5d', title: 'Plants & Gardening', hv: 'garden', img: I('fs', 'site-home'),
      tag: 'Health Plants: an educational plant knowledge platform where users both learn and contribute — built to practice database integration.',
      facts: [['Type', 'Web course project'], ['Built with', 'Node · Express · MySQL'], ['Features', 'Auth · Listings']],
      bg: I('fs', 'bg'), arches: [[I('fs', 'pop-snake'), 'snake plant'], [I('fs', 'pop-bamboo'), 'money tree'], [I('fs', 'pop-laurel'), 'leafy laurel']],
      sections: [
        { t: 'intro', mag: 1, k: 'The Beginning', h: 'Not a static website',
          p: ['This project was developed in a web development course with the goal of practicing database integration and persistent data management. Instead of a static website, I designed a plant knowledge platform where users can both learn and contribute.',
            'Connecting the site to database tables for user accounts and plant listings let me work with real user-generated data — and understand how information flows between the frontend, backend and database.'] },
        { t: 'list', k: 'The Features', h: 'Full-stack, end to end', items: [
          ['User Authentication', 'Register and log in; sessions keep data saved per user.'],
          ['Dynamic Operations', 'Users create and read plant listings connected to the database.'],
          ['Database Integration', 'Backend tables store user and plant data for persistent storage and retrieval.'],
          ['Responsive Display', 'Browsable plant listings loaded dynamically with user content.'],
          ['Clean UI Flow', 'Listings, account settings and submission forms grouped clearly.']] },
        { t: 'vsteps', vine: 1, k: 'The Process', h: 'From idea to platform', items: [
          ['Research & Inspiration', 'Defined an educational platform with two users: visitors who browse and registered users who contribute.'],
          ['Planning & Database Design', 'Tables for users, plant listings and contact info, with relationships for efficient, dynamic retrieval.'],
          ['Frontend Development', 'Login, registration and listing forms with validation, updating without manual refreshes.'],
          ['Backend & Database Integration', 'Persistent storage of accounts and listings; users add and view their listings.'],
          ['Testing & Refinement', 'Tested connections, authentication and screen sizes so the flow stayed smooth.']] },
        { t: 'band', img: I('fs', 'mood'), q: 'Every listing is a plant someone cared enough to share.' },
        { t: 'browser', k: 'The Website', h: 'Inside Health Plants', screens: [
          [I('fs', 'site-home'), 'Home: the welcome carousel', 'home.html'],
          [I('fs', 'site-tips'), 'Plant care tips', 'home.html#'],
          [I('fs', 'site-books'), 'Best guiding books', 'home.html#'],
          [I('fs', 'site-info'), 'Plants information, loaded from the database', 'home.html#'],
          [I('fs', 'site-login'), 'Log in to the plants store', 'index.html'],
          [I('fs', 'site-add'), 'Add a new plant', 'add.html'],
          [I('fs', 'site-contact'), 'Send a message', 'contact.html'],
          [I('fs', 'site-about'), 'About us and the developers team', 'about.html'],
          [I('fs', 'site-db'), 'The MySQL tables behind it, in phpMyAdmin', 'localhost:8888/phpMyAdmin5']] },
        { t: 'quote', k: 'The Result', q: 'Database-driven development, authentication, and turning technical requirements into a meaningful, user-focused platform.' },
      ] },

    ah: {
      cat: 'UX / UI', accent: '#4aa7e0', title: 'Ana Huna', hv: 'orbit', img: I('ah', 'app1'),
      tag: 'Do differences mean limitations, or simply a different perspective? An iPad app that helps non-speaking children communicate.',
      facts: [['Industry', 'Education'], ['Device', 'iPad App'], ['Status', 'On the App Store']],
      links: [['appstore', 'Download on the App Store', 'https://apps.apple.com/sa/app/ana-huna-%D8%A7%D9%86%D8%A7-%D9%87%D9%86%D8%A7/id6756348723'], ['behance', 'Case study on Behance', 'https://www.behance.net/gallery/247693273/Anna-Huna-Case-Study'], ['github', 'View on GitHub', 'https://github.com/rana998/accApps']],
      scene: I('ah', 'logo'), mq: ['Picture-based communication', 'Real-life images', 'Bigger buttons', 'Custom card colors', 'Simpler navigation'],
      sections: [
        { t: 'intro', k: 'The Question', h: 'Different, not limited',
          p: ['Ana Huna (انا هنا, “I am here”) is an iPad app that helps non-speaking children with autism express their needs, feelings and daily choices, using picture cards and voice recordings in their own dialect.',
            'It started from interviews with speech and rehabilitation specialists and was tested with children and their families. It is now published on the App Store in English and Arabic.'] },
        { t: 'band', img: I('ah', 'mood'), q: 'Every child deserves to be heard and understood.' },
        { t: 'chat', k: 'User Interview', h: 'What we asked', img: I('ah', 'kid'), alt: 'A child tapping a picture on an iPad', items: [
          'What challenges do specialists or caregivers face when training children to use picture-based communication?',
          'How can a digital app make communication easier for children with developmental disorders?',
          'Are iPads and smart devices more effective than the PECS method in teaching communication?',
          'Is using real-life images from the child’s environment more effective than generic symbols?',
          'What are the biggest challenges you face when a child cannot express emotions?',
          'What communication challenges do children with developmental disorders face daily?'] },
        { t: 'checks', k: 'Improvements', h: 'Feedback, then action', items: [['Bigger buttons', 'All key buttons enlarged for easier tapping.'], ['Custom colors', 'Card colors can be customized.'], ['Fewer steps', 'Navigation simplified.'], ['Clearer icons', 'Icons made more recognizable.']] },
        { t: 'reel', wide: 1, k: 'The App', h: 'Inside Ana Huna', screens: [[I('ah', 'ui1'), 'Start'], [I('ah', 'ui2'), 'Choose a level'], [I('ah', 'ui3'), 'Choose from the menu'], [I('ah', 'ui4'), 'An empty category, ready for cards'], [I('ah', 'ui5'), 'Picture cards with voice recordings']] },
        { t: 'store', k: 'The Published App', h: 'Live on the App Store', icon: I('ah', 'logo'), name: 'Ana Huna | انا هنا', sub: 'Education · iPad · Free',
          screens: [[I('ah', 'app1'), 'Every child deserves a voice'], [I('ah', 'app2'), 'Words start here'], [I('ah', 'app3'), 'Communicate without barriers'], [I('ah', 'app4'), 'Watch progress grow']] },
      ] },

    abyan: {
      cat: 'UX / UI', accent: '#5c6fe0', title: 'Abyan Capital', hv: 'product', img: I('abyan', 's0'),
      tag: 'A UI/UX case study redesigning three key features of an investment app so new users feel clear, calm and in control.',
      stats: [['11', 'days, 23 Dec – 6 Jan'], ['4', 'users interviewed'], ['3', 'features redesigned']],
      links: [['behance', 'Case study on Behance', 'https://www.behance.net/gallery/247694055/Abyan-Case-Study']],
      phones: [I('abyan', 'hf-features'), I('abyan', 'hf-splash'), I('abyan', 'hf-wallets')], tools: I('abyan', 'tools'),
      sections: [
        { t: 'split', items: [['Problem', 'Abyan Financial can feel complex for new users in their early interactions. Understanding portfolio performance, tracking investment status and navigating core actions lack simplicity and emotional reassurance — leading to confusion, reduced trust and inconsistent usage.'],
          ['Goal', 'Enhance and redesign 3 key features to make the app simpler and smoother for new users, improving understanding, trust and consistent usage.']] },
        { t: 'steps', k: 'Design Process', h: 'Five stages, eleven days', items: [['Empathize', 'Interviews & survey'], ['Define', 'Persona, empathy map'], ['Ideate', 'Affinity & journey maps'], ['Design', 'Low to high fidelity'], ['Test', 'Usability & A/B testing']] },
        { t: 'persona', k: 'User Persona', img: I('abyan', 'persona'), name: 'Sarah', sub: '29 · Saudi · HR manager · Beginner to intermediate investor',
          q: '“I don’t mind investing — I just want to understand what’s happening to my money.”',
          groups: [['Needs', ['Simple, human language', 'Step-by-step guidance', 'Clear numbers, not just percentages']], ['Pain points', ['Confusing wallet types', 'Technical financial terms', 'Lost during onboarding']]] },
        { t: 'band', img: I('abyan', 'mood'), q: '“I just want to understand what’s happening to my money.”' },
        { t: 'notes', k: 'Affinity Map', h: 'What users told us', items: [
          ['Knowledge', 'Users need simple language and step-by-step explanations; wallets and outcomes are unclear.'],
          ['Emotion', 'Users hesitate and feel overwhelmed at times; depositing feels smooth.'],
          ['Usability', 'The interface is simple, but instructions are not sufficient.'],
          ['Feedback', 'Weak progress and profit updates; returns are not clearly notified.'],
          ['Trust', 'Users feel safe with Abyan; Islamic investing increases confidence.'],
          ['Comparison', 'Competitors explain outcomes more clearly; Abyan is easier but offers less guidance.']] },
        { t: 'compare', k: 'Low to High Fidelity', h: 'Drag to see the redesign', pairs: [[I('abyan', 'lf1'), I('abyan', 'hf1'), 'Splash & onboarding'], [I('abyan', 'lf2'), I('abyan', 'hf2'), 'Investment wallet']] },
        { t: 'quote', k: 'A/B Testing', q: 'With the redesign, users recognized the main screen, found their savings wallets and said the UI is clearer and easier to understand.' },
        { t: 'cta', h: 'Read the whole story', p: 'The full case study is on Behance: research, usability testing, A/B results and every redesigned screen.' },
      ] },

    taptical: {
      cat: 'Programming', accent: '#9a6ad6', title: 'Taptical', hv: 'float', img: I('taptical', 'app1'),
      tag: 'Turn overthinking into clear, manageable steps through interactive gameplay.',
      facts: [['Type', 'iPhone App'], ['Audience', 'Young adults'], ['Focus', 'Stress & overthinking']],
      scene: I('taptical', 'tapti-full'), phones: [I('taptical', 'app2'), I('taptical', 'app1')],
      sections: [
        { t: 'flips', k: 'About', h: 'Tap a card', items: [
          ['About Taptical', 'A mobile app designed to help young adults manage stress and overthinking through interactive game-based reflection.'],
          ['Challenge', 'Many mental wellness apps feel repetitive, passive, or hard to stay engaged with — especially for young adults seeking something more interactive.'],
          ['Solution', 'A gamified mobile experience where users answer guided questions mentally while playing, releasing stress and organizing their thoughts.']] },
        { t: 'bubbles', k: 'Key Features', h: 'What it offers', items: ['Stress-relief gameplay', 'Interactive user flow', 'Gamified engagement', 'Mobile-friendly interface'] },
        { t: 'band', img: I('taptical', 'mood'), q: 'Slow down, tap, breathe. One small question at a time.' },
        { t: 'shuffle', phone: 1, k: 'The App', h: 'Shuffle the deck', screens: [[I('taptical', 'app1'), 'Press to start'], [I('taptical', 'app2'), 'Meet Tapti, an over-thinker friend'], [I('taptical', 'app3'), 'Find the number, tap it and have fun'], [I('taptical', 'app4'), 'The puzzle in play'], [I('taptical', 'app5'), 'Great! On to the next question']] },
      ] },
  };

  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const n2 = (i) => String(i + 1).padStart(2, '0');
  const head = (s) => `${s.k ? `<span class="pv-k" ${r(0)}>${esc(s.k)}</span>` : ''}${s.h ? `<h2 class="pv-h" ${r(1)}>${esc(s.h)}</h2>` : ''}`;
  // gold link buttons: GitHub, Figma, App Store, itch.io
  const ICON = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    figma: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.5 24a4 4 0 0 0 4-4v-4h-4a4 4 0 0 0 0 8Zm-4-12a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4Zm0-8a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4Zm8-4h4a4 4 0 0 1 0 8h-4V0Zm8 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>',
    appstore: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5a4.3 4.3 0 0 0-3.4-1.8c-1.4-.1-2.8.9-3.5.9s-1.9-.9-3.1-.8a4.6 4.6 0 0 0-3.9 2.4c-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.4s1.6-.8 3-.8 1.8.8 3.1.7 2-1.1 2.8-2.3a9 9 0 0 0 1.3-2.6 4 4 0 0 1-2.4-3.7ZM14.1 5.8A4 4 0 0 0 15 2.9a4.2 4.2 0 0 0-2.7 1.4 3.9 3.9 0 0 0-1 2.8 3.5 3.5 0 0 0 2.8-1.3Z"/></svg>',
    itch: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l10.5-6.5L8 5.5Z"/></svg>',
    behance: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.2 11.4c.9-.4 1.5-1.2 1.5-2.4 0-2.2-1.6-2.9-3.6-2.9H1v12h5.3c2 0 3.9-1 3.9-3.3 0-1.4-.7-2.5-2-3.4ZM3.4 8.1h2.3c.9 0 1.6.2 1.6 1.2 0 .9-.6 1.3-1.5 1.3H3.4V8.1Zm2.5 8H3.4v-3.2h2.6c1 0 1.7.4 1.7 1.6 0 1.2-.8 1.6-1.8 1.6ZM20.6 8.1h-5.3V6.8h5.3v1.3Zm2.4 6.2c0-2.8-1.6-5.1-4.6-5.1-2.9 0-4.8 2.2-4.8 5 0 2.9 1.8 4.9 4.8 4.9 2.2 0 3.7-1 4.4-3.2h-2.3c-.2.8-1.2 1.2-2 1.2-1.5 0-2.3-.8-2.3-2.3H23v-.5Zm-6.8-1.1c.1-1.2.9-2 2.1-2 1.3 0 1.9.7 2 2h-4.1Z"/></svg>',
  };
  const links = (d, d0 = 5) => d.links ? `<div class="pv-links">${d.links.map(([k, label, url], i) =>
    `<a class="pv-link ${k}" href="${esc(url)}" target="_blank" rel="noopener" ${r(d0 + i)}>${ICON[k]}<span>${esc(label)}</span><i aria-hidden="true">↗</i></a>`).join('')}</div>` : '';
  const facts = (d, k = 'up') => `<ul class="pv-facts">${d.facts.map(([a, b], i) => `<li ${r(i + 4, k)}><span>${esc(a)}</span>${esc(b)}</li>`).join('')}</ul>${links(d, d.facts.length + 4)}`;
  const title = (d) => `<span class="pv-k" ${r(0)}>${esc(d.cat)} · Case study</span><h1 class="pv-title" data-split>${esc(d.title)}</h1><p class="pv-tag" ${r(3)}>${esc(d.tag)}</p>`;
  const zoom = (src, cap, i, cls = '') => `<button type="button" class="${cls}" data-zoom="${src}" aria-label="View ${esc(cap)} larger"><img src="${src}" alt="${esc(cap)}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async" /></button>`;
  const cue = '<span class="pv-cue" aria-hidden="true"><i></i>Scroll</span>';
  const ribbon = (w) => { const s = w.map((x) => `<span>${esc(x)}</span><i>✦</i>`).join(''); return `<div class="pv-marquee" aria-hidden="true"><div>${s}${s}</div></div>`; };

  /* each project's opening screen */
  const HERO = {
    // a game title screen: the trailer fills the whole screen, letterboxed, with the title over it
    cinema: (d) => `<section class="pv-hero hv-cinema"><div class="pv-cine"><video src="${d.video}" poster="${d.scene}" muted loop playsinline autoplay preload="metadata" aria-label="Recycling Kingdoms trailer"></video></div><i class="pv-cine-shade"></i>
      <div class="pv-hero-txt">${title(d)}${facts(d)}</div>
      <div class="pv-cine-ui" ${r(6, 'up')}><span class="pv-live"><i></i>Trailer</span><button type="button" class="pv-sound" aria-pressed="false"><span class="off">Sound off</span><span class="on">Sound on</span></button></div>${cue}</section>`,
    // storybook: the game world seen through a gold arched window that opens as you scroll
    portal: (d) => `<section class="pv-hero hv-portal"><div class="pv-hero-txt">${title(d)}</div>
      <div class="pv-portal" ${r(2, 'grow-up')}><div class="pv-portal-in">${d.video
        ? `<video src="${d.video}" poster="${d.scene}" muted loop playsinline autoplay preload="metadata" aria-label="Recycling Kingdoms trailer"></video>`
        : `<img src="${d.scene}" alt="The Recycling Kingdoms world" />`}</div></div>${facts(d)}</section>`,
    // horror: a dark room; the pointer is a flashlight
    film: (d) => `<section class="pv-hero hv-film"><img class="pv-film-bg" src="${d.scene}" alt="" /><i class="pv-dark"></i><i class="pv-grain"></i>
      <div class="pv-hero-txt">${title(d)}</div>${facts(d)}<span class="pv-hint" ${r(6)}>Move to look around</span>${cue}</section>`,
    // sports: slanted panels, a scoreboard and a big outlined "NBA"
    court: (d) => `<section class="pv-hero hv-court"><i class="pv-stripe"></i><span class="pv-ghost" aria-hidden="true">NBA</span>
      <div class="pv-hero-txt">${title(d)}${facts(d)}</div><div class="pv-player" ${r(2, 'slide')}><img src="${d.scene}" alt="A close-up of a basketball in warm light" /></div>${d.credit ? `<small class="pv-credit">${esc(d.credit)}</small>` : ''}${cue}</section>`,
    // garden: three arched plant windows that sway, ferns along the bottom
    garden: (d) => `<section class="pv-hero hv-garden"><img class="pv-garden-bg" src="${d.bg}" alt="" /><i class="pv-garden-shade"></i><div class="pv-hero-txt">${title(d)}${facts(d)}</div>
      <div class="pv-arches">${d.arches.map(([a, n], i) => `<div class="pv-arch pop" ${r(i + 2, 'up')}><span class="pv-arch-in"></span><img class="pv-pop" src="${a}" alt="A ${n} illustration from the Health Plants website" /></div>`).join('')}</div>${cue}</section>`,
    // iPad app: the app icon in a round window with gold rings orbiting it
    orbit: (d) => `<section class="pv-hero hv-orbit"><div class="pv-orbit" ${r(1, 'grow-up')}><i class="pv-ring a"></i><i class="pv-ring b"></i><div class="pv-orbit-in logo"><img src="${d.scene}" alt="The Ana Huna app icon" /></div></div>
      <div class="pv-hero-txt">${title(d)}${facts(d)}</div>${cue}</section>`,
    // product case study: big numbers and the app in hand
    product: (d) => `<section class="pv-hero hv-product"><div class="pv-hero-txt">${title(d)}
      <ul class="pv-stats">${d.stats.map(([a, b], i) => `<li ${r(i + 4)}><b>${a}</b>${esc(b)}</li>`).join('')}</ul>${links(d, 7)}</div>
      <div class="pv-trio" ${r(2, 'slide')}>${d.phones.map((p, i) => `<span class="pv-iph p${i}"><img src="${p}" alt="Abyan redesigned screen ${i + 1}" /></span>`).join('')}<div class="pv-tools"><small>Made with</small><span><svg viewBox="0 0 38 57" aria-hidden="true"><path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/><path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/><path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>Figma</span><span><svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#ffd02f"/><path fill="#050038" d="M21.4 7h-3.6l3 5.3L14.2 7h-3.6l3.3 7.6L6.6 7H3l4.3 18h3.6L7.8 12.7 14.6 25h3.6l-3.4-12.7L21.6 25h3.6l-3.4-13.2L28.6 25H29L24.4 7h-3.6l3 5.2z"/></svg>Miro</span></div></div>${cue}</section>`,
    // playful: the character bounces, phones float
    float: (d) => `<section class="pv-hero hv-float"><i class="pv-spark s1">✦</i><i class="pv-spark s2">✦</i><i class="pv-spark s3">✦</i>
      <div class="pv-blob" ${r(1, 'pop')}><img src="${d.scene}" alt="The Taptical character" /></div>
      <div class="pv-hero-txt">${title(d)}${facts(d, 'pop')}</div>
      <div class="pv-phones" ${r(3, 'slide')}>${d.phones.map((p, i) => `<span class="pv-phone p${i}"><img src="${p}" alt="Taptical app screen ${i + 1}" /></span>`).join('')}</div>${cue}</section>`,
  };

  const SECTION = {
    intro: (s) => `<section class="pv-sec pv-intro${s.center ? ' center' : ''}${s.mag ? ' mag' : ''}${s.side ? ' has-side' : ''}"><div>${head(s)}<i class="pv-rule" ${r(2, 'grow')}></i>${s.side ? `<img class="pv-side" src="${s.side}" alt="" ${r(3, 'up')} />` : ''}</div><div>${s.p.map((x, i) => `<p ${r(i + 2)}>${esc(x)}</p>`).join('')}</div></section>`,
    quote: (s) => `<section class="pv-sec pv-quote">${s.k ? `<span class="pv-k" ${r(0)}>${esc(s.k)}</span>` : ''}<blockquote data-words>${esc(s.q)}</blockquote></section>`,
    cards: (s) => `<section class="pv-sec">${head(s)}<div class="pv-cards">${s.items.map(([h, p], i) =>
      `<article class="pv-card" ${r(i % 3, 'deal', `--t:${(i % 2 ? 1 : -1) * (2 + i % 3)}deg`)}><span class="pv-num">${n2(i)}</span>${h ? `<h3>${esc(h)}</h3>` : ''}<p>${esc(p)}</p></article>`).join('')}</div></section>`,
    steps: (s) => `<section class="pv-sec pv-steps-sec">${head(s)}<ol class="pv-steps"><i class="pv-line"></i>${s.items.map(([h, p], i) =>
      `<li ${r(i, 'up')}><span class="pv-dot">${i + 1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol></section>`,
    // a tall numbered list down the page; the line between steps fills as you scroll
    vsteps: (s) => `<section class="pv-sec pv-vsteps-sec${s.vine ? ' vine' : ''}">${head(s)}<ol class="pv-vsteps"><i class="pv-line"></i>${s.items.map(([h, p], i) =>
      `<li ${r(0, 'side')}><span class="pv-vn">${n2(i)}</span><div><h3>${esc(h)}</h3><p>${esc(p)}</p></div></li>`).join('')}</ol></section>`,
    // story text beside a picture that stays in place; the picture changes with each chapter
    chapters: (s) => `<section class="pv-sec pv-chapters">${head(s)}<div class="pv-ch-grid"><div class="pv-ch-pin"><div class="pv-ch-img" ${r(1, 'grow-up')}>${s.items.map(([h, , src], i) =>
      `<img class="${i ? '' : 'on'}" src="${src}" alt="Chapter ${i + 1}: ${esc(h)}" ${i ? 'loading="lazy"' : ''} />`).join('')}<span class="pv-ch-n"><b>I</b> / ${['I', 'II', 'III', 'IV'][s.items.length - 1]}</span></div></div>
      <ol>${s.items.map(([h, p], i) => `<li ${r(0, 'up')} data-ch="${i}"><span>Chapter ${['I', 'II', 'III', 'IV'][i]}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol></div></section>`,
    // the screens fan out like a hand of tarot cards
    fan: (s) => `<section class="pv-sec pv-fan-sec">${head(s)}<div class="pv-fan" data-r="fan" style="--n:${s.screens.length}">${s.screens.map(([src, cap], i) =>
      `<figure class="pv-fcard" style="--i:${i};--o:${(i - (s.screens.length - 1) / 2).toFixed(1)}">${zoom(src, cap, i)}<figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div></section>`,
    // screens pile on top of each other as you scroll
    scenes: (s) => `<section class="pv-sec pv-scenes">${head(s)}<div class="pv-scene-list">${s.screens.map(([src, cap], i) =>
      `<figure class="pv-scene" style="--i:${i}">${zoom(src, cap, i)}<figcaption><b>Scene ${n2(i)}</b>${esc(cap)}</figcaption></figure>`).join('')}</div></section>`,
    decisions: (s) => `<section class="pv-sec pv-dec-sec">${head(s)}<div class="pv-dec" role="table"><div class="pv-dec-row head" role="row"><span role="columnheader"></span><span role="columnheader">Decision</span><span role="columnheader">Constraint</span></div>
      ${s.items.map(([h, a, b], i) => `<div class="pv-dec-row" role="row" ${r(i, 'side')}><h3 role="rowheader">${esc(h)}</h3><p role="cell">${esc(a)}</p><p role="cell">${esc(b)}</p></div>`).join('')}</div></section>`,
    // features as scoreboard tiles
    stats: (s) => `<section class="pv-sec pv-stats-sec">${head(s)}<div class="pv-tiles">${s.items.map(([h, p], i) =>
      `<article class="pv-tile" ${r(i, 'up')}><span class="pv-jersey">${n2(i)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div></section>`,
    bento: (s) => `<section class="pv-sec">${head(s)}<div class="pv-bento">${s.screens.map(([src, cap], i) =>
      `<figure class="pv-bt" ${r(i % 3, 'grow-up')}>${zoom(src, cap, i)}<figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div></section>`,
    // an editorial list: one row per feature
    list: (s) => `<section class="pv-sec pv-list-sec">${head(s)}<ol class="pv-list">${s.items.map(([h, p], i) =>
      `<li ${r(0, 'up')}><span>${n2(i)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol></section>`,
    // the long pages side by side; each scrolls itself on hover
    pages: (s) => `<section class="pv-sec pv-pages-sec">${head(s)}<div class="pv-pages">${s.screens.map(([src, cap], i) =>
      `<figure class="pv-page tall" ${r(i, 'up')}><button type="button" class="pv-frame" data-zoom="${src}" aria-label="View ${esc(cap)} larger"><span class="pv-dots"><i></i><i></i><i></i></span><span class="pv-pview"><img src="${src}" alt="${esc(cap)}" loading="lazy" /></span></button><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div><p class="pv-note" ${r(3)}>Hover a page to scroll it</p></section>`,
    // real browser windows with the site's own screenshots
    browser: (s) => `<section class="pv-sec pv-browser-sec">${head(s)}<div class="pv-browsers">${s.screens.map(([src, cap, url], i) =>
      `<figure class="pv-win${i ? '' : ' big'}" ${r(i % 2, 'up')}><button type="button" data-zoom="${src}" aria-label="View ${esc(cap)} larger"><span class="pv-win-bar"><span class="pv-dots"><i></i><i></i><i></i></span><span class="pv-url">${esc(url.includes(':') ? url : 'localhost:7500/' + url)}</span></span><img src="${src}" alt="${esc(cap)}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async" /></button><figcaption><b>${n2(i)}</b>${esc(cap)}</figcaption></figure>`).join('')}</div></section>`,
    // interview questions as chat messages
    chat: (s) => `<section class="pv-sec pv-chat-sec"><div>${head(s)}<img class="pv-chat-img" src="${s.img}" alt="${esc(s.alt || '')}" ${r(2, 'up')} /></div><ul class="pv-chat">${s.items.map((q, i) =>
      `<li class="${i % 2 ? 'b' : 'a'}" ${r(0, i % 2 ? 'from-r' : 'from-l')}><span>Q${i + 1}</span>${esc(q)}</li>`).join('')}</ul></section>`,
    checks: (s) => `<section class="pv-sec pv-checks-sec">${head(s)}<ul class="pv-checks">${s.items.map(([h, p], i) =>
      `<li ${r(i, 'up')}><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" /><path d="M12 21l5 5 11-12" /></svg><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ul></section>`,
    reel: (s) => `<section class="pv-reel${s.wide ? ' wide' : ''}" style="--n:${s.screens.length}"><div class="pv-reel-pin"><div class="pv-reel-head"><div>${head(s)}</div><span class="pv-reel-count"><b>01</b> / ${String(s.screens.length).padStart(2, '0')}</span></div>
      <div class="pv-track">${s.screens.map(([src, cap], i) => `<figure class="pv-shot"><button type="button" class="pv-frame pv-ipad" data-zoom="${src}" aria-label="View ${esc(cap)} larger"><span class="pv-view"><img src="${src}" alt="${esc(cap)}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async" /></span></button><figcaption><b>${n2(i)}</b>${esc(cap)}</figcaption></figure>`).join('')}</div>
      <div class="pv-reel-bar"><i></i></div></div></section>`,
    split: (s) => `<section class="pv-sec pv-split">${s.items.map(([h, p], i) => `<article ${r(i, 'deal', `--t:${i ? 3 : -3}deg`)}><span class="pv-k">${esc(h)}</span><p>${esc(p)}</p></article>`).join('')}</section>`,
    persona: (s) => `<section class="pv-sec">${head(s)}<div class="pv-persona" ${r(1, 'deal')}><img src="${s.img}" alt="Portrait of ${esc(s.name)}" /><div><h3>${esc(s.name)}</h3><p class="pv-sub">${esc(s.sub)}</p><blockquote>${esc(s.q)}</blockquote>
      <div class="pv-groups">${s.groups.map(([g, l]) => `<div><h4>${esc(g)}</h4><ul>${l.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></div></div></section>`,
    // affinity map as pinned sticky notes
    notes: (s) => `<section class="pv-sec pv-notes-sec">${head(s)}<div class="pv-notes">${s.items.map(([h, p], i) =>
      `<article class="pv-note-card" ${r(i % 3, 'drop', `--t:${[-3, 2, -1.5, 3, -2.5, 1.5][i]}deg`)}><i class="pv-pin"></i><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div></section>`,
    // drag the handle to wipe from the low-fidelity wireframe to the final design
    compare: (s) => `<section class="pv-sec pv-compare-sec">${head(s)}<div class="pv-compares">${s.pairs.map(([a, b, cap], i) =>
      `<figure class="pv-compare" ${r(i, 'up')}><div class="pv-cmp" style="--c:50%"><img src="${a}" alt="${esc(cap)}, low fidelity" loading="lazy" /><img class="hi" src="${b}" alt="${esc(cap)}, high fidelity" loading="lazy" /><i class="pv-cmp-bar"><b>⇆</b></i>
        <input type="range" min="0" max="100" value="50" aria-label="Compare low and high fidelity: ${esc(cap)}" /><span class="l">Low</span><span class="h">High</span></div><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div></section>`,
    long: (s, d) => `<section class="pv-sec pv-long-sec">${head(s)}<div class="pv-long" ${r(2, 'up')}><span class="pv-dots"><i></i><i></i><i></i></span><div class="pv-long-view"><img src="${s.src}" alt="The full Abyan case study page" loading="lazy" /></div><span class="pv-long-hint">Hover to scroll the page</span></div>${s.link ? `<div class="pv-long-cta" ${r(3, 'up')}><p>Read the full case study, with the usability test and A/B results, on Behance.</p>${links({ links: d.links.filter((l) => l[0] === s.link) }, 0)}</div>` : ''}</section>`,
    // cards that flip over when tapped or hovered
    flips: (s) => `<section class="pv-sec pv-flips-sec">${head(s)}<div class="pv-flips">${s.items.map(([h, p], i) =>
      `<button type="button" class="pv-flip" ${r(i, 'pop')} aria-pressed="false"><span class="pv-flip-in"><span class="f"><i>✦</i><b>${esc(h)}</b><small>Tap to flip</small></span><span class="bk"><b>${esc(h)}</b>${esc(p)}</span></span></button>`).join('')}</div></section>`,
    bubbles: (s) => `<section class="pv-sec pv-bubbles-sec">${head(s)}<ul class="pv-bubbles">${s.items.map((h, i) => `<li ${r(i, 'pop', `--b:${i}`)}><span>${esc(h)}</span></li>`).join('')}</ul></section>`,
    // a deck of screens: click the deck and the top one flies to the back
    shuffle: (s) => `<section class="pv-sec pv-shuffle-sec${s.phone ? ' phone' : ''}"><div>${head(s)}<p class="pv-sh-cap" aria-live="polite">${esc(s.screens[0][1])}</p>
      <p class="pv-sh-hint" ${r(3)}><i aria-hidden="true">✦</i>Tap the deck to shuffle · <b class="pv-sh-n">1</b> / ${s.screens.length}</p></div>
      <button type="button" class="pv-shuffle" aria-label="Show the next screen" ${r(2, 'pop')}>${s.screens.map(([src, cap], i) => `<span class="pv-sh" style="--k:${i}" data-cap="${esc(cap)}"><img src="${src}" alt="${esc(cap)}" ${i > 1 ? 'loading="lazy"' : ''} /></span>`).join('')}</button></section>`,
    // a full-width mood photo with a line of text over it; the photo drifts as you scroll
    band: (s) => s.split
      // two stacked photos beside the quote, like cards on a table
      ? `<section class="pv-sec pv-mood"><div class="pv-mood-pics"><img class="a" src="${s.img}" alt="" loading="lazy" ${r(0, 'deal', '--t:-5deg')} /><img class="b" src="${s.img2}" alt="" loading="lazy" ${r(2, 'deal', '--t:4deg')} /></div>
        <div class="pv-mood-txt">${head(s)}<blockquote data-words>${esc(s.q)}</blockquote><i class="pv-rule" ${r(2, 'grow')}></i><p ${r(3)}>${esc(s.p)}</p></div></section>`
      : `<section class="pv-band" ${r(0, 'up')}><img src="${s.img}" alt="" loading="lazy" /><p data-words>${esc(s.q)}</p></section>`,
    // looping gameplay clips that play while they are on screen
    videos: (s) => `<section class="pv-sec pv-videos-sec">${head(s)}<div class="pv-videos">${s.items.map(([src, poster, cap], i) =>
      `<figure class="pv-video" ${r(i, 'grow-up')}><div class="pv-vframe"><video src="${src}" poster="${poster}" muted loop playsinline preload="none" aria-label="${esc(cap)}"></video><span class="pv-live"><i></i>Gameplay</span></div><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div></section>`,
    // the published app: store card and its App Store screenshots
    store: (s, d) => `<section class="pv-sec pv-store-sec"><div class="pv-store-head"><div>${head(s)}</div><div class="pv-store-card" ${r(2, 'up')}><img src="${s.icon}" alt="" /><div><b>${esc(s.name)}</b><small>${esc(s.sub)}</small></div>${links({ links: d.links.filter((l) => l[0] === 'appstore') }, 3)}</div></div>
      <div class="pv-strip" ${r(1, 'up')}><div class="pv-strip-in">${s.screens.map(([src, cap], i) => `<figure class="pv-st">${zoom(src, cap, i)}<figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div></div><p class="pv-note" ${r(2)}>The App Store screenshots join into one picture · drag or scroll sideways</p></section>`,
    // closing call to action with the project's links
    cta: (s, d) => `<section class="pv-sec pv-cta"><div class="pv-cta-in" ${r(0, 'grow-up')}><span class="pv-k">${esc(d.title)}</span><h2 class="pv-h">${esc(s.h)}</h2><p>${esc(s.p)}</p>${links(d, 1)}</div></section>`,
  };

  function render(key) {
    const d = DATA[key];
    return `<div class="pv pv-${key}" style="--acc:${d.accent}">${HERO[d.hv](d)}${d.mq ? ribbon(d.mq) : ''}${d.sections.map((s) => SECTION[s.t](s, d)).join('')}</div>`;
  }

  window.PROJECT_PAGES = Object.fromEntries(Object.keys(DATA).map((k) => [k, () => render(k)]));
  window.PROJECT_INFO = Object.fromEntries(Object.entries(DATA).map(([k, d]) => [k, { title: d.title, img: d.img, tag: d.tag }]));
})();
