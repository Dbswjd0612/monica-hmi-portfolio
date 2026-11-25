// Scena case study: all page copy, image sources, captions and links.
// Edit text here. js/scena.js renders it, so no HTML edit is needed.
//
// Images: set src to a path in /public/images/scena/ and w/h to the file's pixel size.
// src: null shows a labelled placeholder at the ratio in w/h. A missing file falls back to the same placeholder.
// marks: numbered markers, y is a percentage of the image height. Side is left unless side: 'right'.
window.SCENA_CONTENT = (function () {
  var P = '/public/images/scena/';

  return {
    links: {
      demo: 'https://helloscena.com/demo',
      design: 'https://www.figma.com/design/hF0BuWuf3l5d4gUDMHR21L/Scena-%C2%B7-Amazon-Developer-Hackathon-2026?node-id=0-1',
      video: 'https://youtu.be/xhdx7LHqDKc',
      next: { label: 'Shopcord Linesheet', href: '/shopcord/' }
    },

    overview: {
      title: 'Scena',
      tagline: ['See what changed.', 'Decide what matters.'], // each sentence stays on one line
      // The description breaks between these two parts at 768px and wider. Below that it wraps naturally.
      description: ['Scena turns Ring snapshots into before-and-after checks', 'for the spots a business owner cares about.'],
      meta: [
        { label: 'Role', value: 'Product & Design' },
        { label: 'Team', value: '1 designer + 1 engineer' },
        { label: 'Timeline', value: 'About 2 weeks · Oct 2026' },
        { label: 'Status', value: 'Submitted Oct 2026' }
      ],
      designLabel: 'View design',
      videoLabel: 'Watch video',
      caption: 'Three views of Scena: monitoring, setup, and review. Screens show a design scenario. The hosted demo replays saved Ring checks.',
      screensLabel: 'Home, Care Spots and Compare screens',
      screens: [
        // The Home screenshot uses the Too dark badge from the Ring Project H01 export (263:2874).
        { src: '/scena-final/images/hero-home.png', w: 1170, h: 2568, label: 'Home / Monitoring', alt: 'Scena Home for Sushi Restaurant: 3 cameras, last closing at 10:02 PM and a Run a check button. Under "2 spots need a look" it lists Rear Exit, Looks like something new; Dining Aisle, Position looks different; and Back Door, Too dark.' },
        { src: P + 'hero-care-spots.png', w: 932, h: 2016, label: 'Care Spots', alt: 'Monitoring setup step 2 of 2: three owner-drawn Care Spots outlined on a reference photo, listed as Rear Exit, Back Door and Shelf, with a Save Care Spots button.' },
        { src: P + 'hero-compare.png', w: 932, h: 2016, label: 'Compare & Decide', alt: 'Compare screen with Before and After photos of the rear exit, the observation "Looks like something new", and three owner choices with none selected yet.' }
      ]
    },

    problem: {
      label: 'Problem and pivot',
      // Each sentence takes its own line where the column fits the longer one comfortably. Narrower, the heading wraps naturally.
      heading: ['Ring captures activity.', 'We wanted to know what was still there.'],
      body: [
        'At the sushi restaurant my teammate runs, Ring security cameras were already part of the routine. I help out there sometimes, and we started asking what else they could do.',
        'A motion alert can flag activity near the rear exit. On its own, it does not show the condition of the space later: whether a box is still by the door or whether the door closed fully.'
      ],
      // The lead-in sits right above the question it introduces. The question renders in bold, inside curly quotes.
      lead: 'One question came up around closing:',
      question: 'Is everything still where it should be?',
      pair: [
        // Each caption sits under its photo at the left, in the same light grey as the page's other figure captions.
        { caption: 'Before', image: { src: P + 'rear-exit-before.png', w: 2677, h: 1506, label: 'Rear exit, before', alt: 'The closed rear exit door, with metal shelving on the left and a stainless bin against the wall on the right. The floor in front of the door is clear.' } },
        { caption: 'After', image: { src: P + 'rear-exit-after.png', w: 2677, h: 1506, label: 'Rear exit, after', alt: 'The same rear exit with a cardboard box on the floor beside the door, outlined in blue, and a dark mat in front of the door.' } }
      ],
      pivotHeading: 'Event → State',
      // Supporting line under Event → State, in the same left column
      pivotLead: 'From “What happened?” to “What changed?”',
      pivotBody: 'We first explored a closing checklist with reminders and alerts. But another reminder wouldn\'t answer the question we cared about: what was still there later? We shifted toward comparing owner-selected areas against a saved reference, so the owner could review visible changes instead of piecing them together from separate events.',
      compare: [
        { title: 'Closing checklist', note: 'Initial idea', items: ['Reminders and alerts around closing', 'Helps track closing tasks'] },
        { title: 'State comparison', note: 'Direction we built', items: ['Compares selected areas against a saved reference', 'Shows visible differences for the owner to review'] }
      ]
    },

    flow: {
      label: 'Product approach',
      ownerLabel: 'Owner',
      systemLabel: 'System',
      steps: [
        { title: 'Set', owner: 'The owner selects a reference photo and marks Care Spots.', system: 'Scena saves the reference and selected areas.' },
        { title: 'Compare', owner: 'The owner starts a check.', system: 'Scena requests a fresh photo and compares each Care Spot with the reference.' },
        { title: 'Decide', owner: 'The owner reviews the results and chooses what to do next.', system: 'Scena saves the decision separately from its observation.' }
      ],
      optional: { label: 'OPTIONAL · INVESTIGATE', text: 'When needed, the owner can review related Ring events for additional context.' }
    },

    decisions: {
      label: 'Key design decisions',
      // The chapter heading: two lines on desktop, with "in charge" in the accent
      heading: ['The owner stays in charge', 'at every step.'],
      // Right column of the chapter intro, beside the heading (same split as Problem & pivot)
      intro: 'Scena compares selected areas and reports uncertainty. The owner defines what to watch and decides what needs attention.',
      emphasis: 'in charge',

      a: {
        label: 'Decision 1 · Set',
        heading: 'Choose what to watch',
        body: [
          'Scena doesn\'t assume what normal looks like. The owner picks a reference photo and marks up to three Care Spots, areas selected for comparison.'
        ],
        evidence: {
          reference: {
            t: 'Expected state',
            d: 'The selected photo shows how the space should look. Its capture time remains visible.',
            image: { src: P + 'select-reference.png', w: 1071, h: 2317, label: 'Select Reference', alt: 'Monitoring setup step 1 of 2: a selected photo of the rear exit, with three recent photos to choose from and a Continue button.' }
          },
          spots: {
            t: 'Owner-defined Care Spots',
            d: 'The owner draws and resizes each Care Spot. AI doesn\'t automatically identify these areas.',
            // Figma Ring-Project node 263:3958 (E03 · Care Spots / Editor Max 3), exported at 3x. Previous file: care-spot-editor.png
            image: { src: P + 'care-spot-editor-3spots.png', w: 1170, h: 2532, label: 'Care Spot editor', alt: 'Care Spots editor on a dark background with three spots added: Care Spot 3 is selected with corner handles, its name field reads Shelf, and Add another Care Spot is disabled because the maximum is reached.' }
          },
          caption: 'Screens show a design scenario from the submitted design file.'
        }
      },

      b: {
        label: 'Decision 2',
        heading: 'The system observes. The owner decides.',
        body: [
          'A box near the exit could be a delivery or something that needs attention. Scena shows what looks different, while the owner reviews the photos and decides what to do next.'
        ],
        // Figma Ring-Project node 263:3457, exported at 3x (compare.png is still used by Decision 3)
        main: { caption: 'Compare', image: { src: P + 'compare-v2.png', w: 1170, h: 2616, label: 'Compare', alt: 'Compare screen for Rear Exit: Before and After photos, the observation "Looks like something new", a Find when it changed link, and three owner choices with Needs review selected.', marks: [{ n: 1, y: 30.4 }, { n: 2, y: 70.2 }, { n: 3, y: 88.5 }] } },
        hierarchy: [
          { n: 1, t: 'Reference Selection', d: 'The owner selects an earlier photo as a reference. Scena compares it with a new capture.' },
          { n: 2, t: 'Scena\'s Observation', d: 'Scena reports whether each Care Spot looks Different, Similar, or couldn\'t be compared.' },
          { n: 3, t: 'Owner\'s Decision', d: 'The owner reviews the evidence and marks it as Needs review, No action needed, or Not actually a change. Their decision is saved separately from Scena\'s observation.' }
        ],
        supportA: { caption: 'Owner decision', image: { src: P + 'owner-decision-v3.png', w: 1160, h: 886, label: 'Owner decision', alt: 'Close-up of the observation text above the three owner choices, with Needs review selected.' } },
        supportText: 'The selected state uses a filled control and a check mark, so the choice does not rely on color alone.',
        // Keep the History crop with the Too dark badge from Ring Project (682:245).
        supportB: { caption: 'History keeps both', image: { src: '/scena-final/images/history-crop-v2.png', w: 1080, h: 1439, label: 'History crop', alt: 'History list: each check shows its date and observation, such as Looks different, with the owner decision on a separate line, such as Needs review or No action needed.' } },
        historyText: 'History shows the observation and the decision on separate lines. A later decision leaves the original observation in place. Status is written in words, and blue or amber only supports it.'
      },

      c: {
        label: 'Decision 3',
        heading: 'Couldn\'t compare ≠ No change',
        lead: 'Camera photos aren\'t always clear enough to compare. Sometimes a Care Spot is too dark or blocked from view. Scena marks the result as Not compared rather than assuming nothing changed, and adjusts which decisions the owner can make.',
        left: { title: 'Comparable result', caption: 'Different and three choices', image: { src: P + 'compare-v3.png', w: 1086, h: 2443, label: 'Comparable result', alt: 'Compare screen with two photos, the observation "Looks like something new", and three owner choices.', marks: [{ n: 1, y: 70.2 }, { n: 2, y: 88.5 }] } },
        // Keep the existing follow-up controls with the Too dark badge from Ring Project (263:3598).
        right: { title: 'Too dark', caption: 'Not compared and two choices', image: { src: '/scena-final/images/too-dark-v3.png', w: 1086, h: 2443, label: 'Too dark comparison', alt: 'Compare screen with a Before photo and an empty After area, a Too dark badge, the heading Couldn\'t compare, and two owner choices: Needs review and No action needed.', marks: [{ n: 1, y: 76.5, side: 'right' }, { n: 2, y: 93, side: 'right' }] } },
        changesLabel: 'What changes',
        changes: [
          { n: 1, t: 'Make uncertainty visible', d: 'Scena makes it clear when a photo can\'t be compared, rather than suggesting nothing changed.' },
          { n: 2, t: 'Avoid unsupported decisions', d: 'Without a reliable comparison, the owner cannot dismiss the result as a false change.' }
        ],
        rulesHeading: 'Follow-up rules for an unavailable comparison',
        rulesColumns: ['Owner choice', 'Status'],
        rules: [
          { name: 'Needs review', state: 'Available', on: true },
          { name: 'No action needed', state: 'Available', on: true },
          { name: 'Not actually a change', state: 'Blocked', on: false }
        ],
        why: [
          'Not actually a change corrects a false positive. A comparison that never happened has nothing to correct.',
          'An owner follow-up also leaves the observation alone. Choosing No action needed clears the task, and the check stays unavailable.'
        ],
        distinctHeading: 'Two failures that look similar and are not',
        distinctLead: 'The example above shows a photo that couldn\'t be compared. But what if no fresh photo arrives at all?',
        distinct: [
          { t: 'No fresh image obtained', d: 'No new check is saved, so there is no new result to review.' },
          { t: 'Image obtained, comparison unavailable', d: 'A “Couldn’t compare” result may be saved, so the owner can still review it.' }
        ],
        reasonsLabel: 'Other reason labels',
        reasons: ['Too blurry', 'View blocked', 'Low confidence', 'View alignment uncertain', 'Image unavailable', 'Image too old']
      }
    },

    constraints: {
      label: 'Working with real constraints',
      heading: 'How the device and API shaped the experience',
      labels: ['Constraint', 'UX response', 'Evidence'],
      cases: [
        {
          title: 'Capture time and retrieval time differ',
          constraint: 'A newly retrieved image isn\'t necessarily a newly captured one. Without that distinction, an owner might mistake an older photo for the current state of the space.',
          response: 'Each photo shows its actual capture time. Scena doesn\'t treat an older image as a fresh check.',
          evidence: { caption: 'Capture timestamp displayed above the photo', image: { src: P + 'capture-time-full-white.png', w: 1160, h: 769, label: 'Capture time', alt: 'The Before label with its capture timestamp, Oct 11 at 10:02 PM, above the full Before photo of the rear exit.' } }
        },
        {
          title: 'Ring events are clues, not proof',
          constraint: 'Ring detects movement across the camera\'s view, not just within a selected Care Spot. Event timestamps can suggest moments worth investigating, but cannot confirm exactly when or why a change occurred.',
          response: 'The post-submission design explores how owners could review camera events between two photos, using timestamps and visual previews as investigation leads rather than confirmed change times.',
          evidence: { caption: 'Related events entry point', image: { src: P + 'related-events-review-link-white.png', w: 1160, h: 449, label: 'Review related events', alt: 'The observation text with the Review related events link beneath it. The link label is revised for this presentation; the submitted screen read Find when it changed.' } },
          extra: { caption: 'Related Ring events · Post-submission design scenario', captionNote: 'Event times and AI-generated illustrative images are examples, not verified Ring event records.', image: { src: P + 'related-ring-events-c07.png', w: 780, h: 890, label: 'Related Ring events, post-submission design scenario', alt: 'Post-submission Figma design of the Related Ring events bottom sheet: Back camera, 3 sample events; Events between photos, Oct 11 at 10:02 PM to Oct 12 at 7:54 AM; three sample events with illustrative thumbnails at 10:36 PM, 10:38 PM and 10:41 PM; and the note that related events may help explain a change, but don\'t confirm exactly when or why it happened. A design scenario, not the implemented product.' } }
        }
      ],
      collaborationLabel: 'Collaboration',
      collaboration: [
        'Before I set the MVP scope, my teammate and I worked out what we could build in two weeks. I built an interactive prototype with Claude Code and Codex to show how owners would move through a check and what they could do next, even when a comparison was unavailable. My teammate used the prototype while building the Ring-connected app, and I used it to review the first build.',
        'On the Home screen, long AI descriptions made the results hard to scan. I suggested keeping a short observation on each card so owners could quickly choose which Care Spot to open for the full description. I tracked this and other issues in a QA table, noting the affected screen, expected behavior, and priority for each.'
      ]
    },

    validation: {
      label: 'Validation and next steps',
      heading: 'What the prototype showed, and what it didn\'t',
      blocks: [
        { title: '01 · What we tested', text: 'My teammate and I tested Scena with the restaurant’s Ring cameras. We marked an area on a reference photo, ran a check, and reviewed the before-and-after photos in the app.' },
        { title: '02 · What we’d test next', text: 'We’d first explore whether checking a space against a reference fits naturally into an owner’s routine. We’d also test whether owners understand the difference between “Similar” and “Couldn’t compare,” and what they would do next.' }
      ]
    }
  };
})();
