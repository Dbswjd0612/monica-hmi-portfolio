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
      video: 'https://youtu.be/xhdx7LHqDKc',
      next: { label: 'Shopcord Linesheet', href: '/shopcord/' }
    },

    overview: {
      kicker: 'Amazon Developer Hackathon 2026 · Ring Track · Mobile-first web prototype',
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
      demoLabel: 'View demo',
      videoLabel: 'Watch video',
      caption: 'Care Spots → Compare → Decide. Screens show a design scenario. The hosted demo replays saved Ring checks.',
      screensLabel: 'Care Spots, Compare and Decide screens',
      screens: [
        { src: P + 'hero-care-spots.png', w: 932, h: 2016, label: 'Care Spots', alt: 'Monitoring setup step 2 of 2: three owner-drawn Care Spots outlined on a reference photo, listed as Rear Exit, Back Door and Shelf, with a Save Care Spots button.' },
        { src: P + 'hero-compare.png', w: 932, h: 2016, label: 'Compare', alt: 'Compare screen with Before and After photos of the rear exit, the observation "Looks like something new", and three owner choices with none selected yet.' },
        { src: P + 'hero-decide.png', w: 932, h: 2016, label: 'Decide', alt: 'The same screen with the photos dimmed, so the observation and the owner choices stand out. Needs review is selected.' }
      ]
    },

    problem: {
      label: 'Problem and pivot',
      // Each sentence takes its own line where the column fits the longer one comfortably. Narrower, the heading wraps naturally.
      heading: ['Ring captures activity.', 'We wanted to know what was still there.'],
      body: [
        'At the sushi restaurant my teammate runs, Ring cameras were already part of the routine. I help out there sometimes, and we started asking what else they could do.',
        'A motion alert can flag activity near the rear exit. On its own, it does not show the condition of the space later: whether a box is still by the door or whether the door closed fully.'
      ],
      // The lead-in sits right above the question it introduces. The question renders in bold, inside curly quotes.
      lead: 'At closing, we wanted to be able to answer:',
      question: 'Is everything still where it should be?',
      context: { src: null, w: 16, h: 9, label: 'Restaurant or Ring camera context photo', alt: '' },
      pair: [
        // Each caption sits under its photo at the left, in the same light grey as the page's other figure captions.
        { caption: 'Before', image: { src: P + 'rear-exit-before.png', w: 2677, h: 1506, label: 'Rear exit, before', alt: 'The closed rear exit door, with metal shelving on the left and a stainless bin against the wall on the right. The floor in front of the door is clear.' } },
        { caption: 'After', image: { src: P + 'rear-exit-after.png', w: 2677, h: 1506, label: 'Rear exit, after', alt: 'The same rear exit with a cardboard box on the floor beside the door, outlined in blue, and a dark mat in front of the door.' } }
      ],
      pivotHeading: 'Event → State',
      pivotBody: 'We first explored a closing checklist with reminders and alerts. Ring already captured moments throughout the day, but understanding how the space had changed between them still required manual review. We became more interested in comparing those moments than simply tracking events.',
      compare: [
        { title: 'Closing checklist', note: 'Initial idea', items: ['Reminders and alerts around closing', 'Focus on what happened and when'] },
        { title: 'State comparison', note: 'Direction we built', items: ['Compare selected areas against a saved reference', 'Focus on what changed and what remains'] }
      ]
    },

    flow: {
      label: 'Product approach',
      heading: ['What the owner does.', 'What Scena handles.'],
      ownerLabel: 'Owner',
      systemLabel: 'System',
      steps: [
        { title: 'Set', owner: 'The owner picks a reference and marks spots.', system: 'Scena saves the reference and each spot.' },
        { title: 'Compare', owner: 'The owner runs a check and reviews photos.', system: 'Scena gets a fresh photo and compares spots.' },
        { title: 'Decide', owner: 'The owner chooses a follow-up.', system: 'Scena keeps the decision and observation apart.' }
      ]
    },

    decisions: {
      label: 'Key design decisions',
      // The chapter heading: two lines on desktop, with "in charge" in the accent
      heading: ['The owner stays in charge', 'at every step.'],
      emphasis: 'in charge',

      a: {
        label: 'Decision 1 · Set',
        heading: 'The owner defines what to watch',
        body: [
          'Scena doesn\'t assume what normal looks like. The owner picks a reference photo and marks up to three Care Spots, the only areas Scena compares.'
        ],
        items: [
          {
            caption: 'Select Reference',
            // Where the chapter's screens come from, under its first screen
            captionNote: 'Screens show a design scenario from the submitted design file.',
            image: { src: P + 'select-reference.png', w: 1071, h: 2317, label: 'Select Reference', alt: 'Monitoring setup step 1 of 2: a selected photo of the rear exit, with three recent photos to choose from and a Continue button.', marks: [{ n: 1, y: 44 }] },
            notes: [{ n: 1, t: 'Expected state', d: 'The selected photo becomes the reference, with its capture time above it.' }]
          },
          {
            caption: 'Care Spot editor',
            image: { src: P + 'care-spot-editor.png', w: 1086, h: 2351, label: 'Care Spot editor', alt: 'Care Spots editor on a dark background: a blue outline with corner handles around the door, a name field reading Rear Exit, and Add another Care Spot.', marks: [{ n: 2, y: 32, side: 'right' }, { n: 3, y: 64, side: 'right' }] },
            notes: [
              { n: 2, t: 'Owner-defined region', d: 'The outline is drawn by the owner. It is not an AI detection.' },
              { n: 3, t: 'Named by the owner', d: 'The owner moves and resizes a spot on the photo, and names it in the field below.' }
            ]
          }
        ]
      },

      b: {
        label: 'Decision 2',
        heading: 'The system observes. The owner decides.',
        body: [
          'A visible difference is not an operational follow-up. A box near the exit might be a delivery or a problem, and only the owner knows which.'
        ],
        main: { caption: 'Compare', image: { src: P + 'compare.png', w: 1086, h: 2334, label: 'Compare', alt: 'Compare screen for Rear Exit: Before and After photos, the observation "Looks like something new", a Review related events link, and three owner choices with Needs review selected.', marks: [{ n: 1, y: 30.4 }, { n: 2, y: 70.2 }, { n: 3, y: 88.5 }] } },
        hierarchy: [
          { n: 1, t: 'Photo evidence', d: 'Before and After, each with its own time.' },
          { n: 2, t: 'System observation', d: 'AI describes what looks different. The result is Different, Similar or Not compared, in words such as “Looks like something new”.' },
          { n: 3, t: 'Owner action', d: 'Needs review, No action needed or Not actually a change.' }
        ],
        supportA: { caption: 'Owner decision', image: { src: P + 'owner-decision.png', w: 1086, h: 752, label: 'Owner decision', alt: 'Close-up of the observation text above the three owner choices, with Needs review selected.' } },
        supportText: 'The selected state uses a filled control and a check mark, so the choice does not rely on color alone.',
        supportB: { caption: 'History keeps both', image: { src: P + 'history-crop.png', w: 1080, h: 1390, label: 'History crop', alt: 'History list: each check shows its date and observation, such as Looks different, with the owner decision on a separate line, such as Needs review or No action needed.' } },
        historyText: 'History shows the observation and the decision on separate lines. A later decision leaves the original observation in place. Status is written in words, and blue or amber only supports it.'
      },

      c: {
        label: 'Decision 3',
        heading: 'Couldn\'t compare ≠ No change',
        lead: 'A dark, blocked or stale image is not evidence that nothing changed. So an unavailable comparison gets its own result and its own set of actions.',
        left: { title: 'Comparable result', caption: 'Different and three choices', image: { src: P + 'compare.png', w: 1086, h: 2334, label: 'Comparable result', alt: 'Compare screen with two photos, the observation "Looks like something new", and three owner choices.', marks: [{ n: 1, y: 70.2 }, { n: 2, y: 88.5 }] } },
        right: { title: 'Too dark', caption: 'Not compared and two choices', image: { src: P + 'too-dark.png', w: 1086, h: 2334, label: 'Too dark comparison', alt: 'Compare screen with a Before photo and an empty After area, a Too dark badge, the heading Couldn\'t compare, and two owner choices: Needs review and No action needed.', marks: [{ n: 1, y: 76.5, side: 'right' }, { n: 2, y: 93, side: 'right' }] } },
        changesLabel: 'What changes',
        changes: [
          { n: 1, t: 'The result', d: 'The observation becomes Not compared: a reason badge with an icon and text, and “Couldn\'t compare” stated plainly.' },
          { n: 2, t: 'The actions', d: 'This screen offers two choices, and Not actually a change is blocked. The owner still has a way forward.' }
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
        distinct: [
          { t: 'No fresh image obtained', d: 'No new check is saved, so there is no new result to review.' },
          { t: 'Image obtained, comparison unavailable', d: 'A not_compared result may be saved, so the owner can still review it.' }
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
          title: 'Capture time and download time differ',
          constraint: 'Retrieving an image does not mean it was just captured.',
          response: 'Each photo shows its capture time. A stale image is not presented as a fresh check.',
          evidence: { caption: 'Capture time above the After photo', image: { src: P + 'capture-time.png', w: 1086, h: 214, label: 'Capture time', alt: 'The After label with its timestamp, Oct 12 at 7:54 AM, above the top of the After photo.' } }
        },
        {
          title: 'Related events provide clues',
          constraint: 'Ring events apply to the whole camera, not to one Care Spot.',
          response: 'The label is Review related events. The events are clues, and they do not establish an exact time or cause. The completed flow has no clip playback.',
          evidence: { caption: 'Entry point on the Compare screen', image: { src: P + 'related-events-link.png', w: 1086, h: 337, label: 'Review related events', alt: 'The observation text with the Review related events link beneath it.' } },
          extra: { caption: 'Evidence needed', image: { src: null, w: 16, h: 7, label: 'Related Ring events sheet, real capture needed', alt: '' } }
        }
      ],
      collaborationLabel: 'Collaboration',
      collaboration: 'I used my interactive front-end prototype to keep the implementation aligned with the MVP. I built it with Claude Code and Codex to communicate the intended flows, interactions, and UI. It served as an implementation reference while Sungwoo built the final application and Ring integration. When the initial build included features beyond the MVP, I reviewed the scope against my prototype. Walking through the build, I checked interaction logic, UI consistency, and alignment with Ring\'s visual language, including colors, icons, and interface patterns. I documented discrepancies in Figma and Markdown, along with the expected behavior and what to prioritize. From there, I worked with Sungwoo, and we refined the experience before submission.'
    },

    validation: {
      label: 'Validation and next steps',
      heading: 'What the prototype showed, and what it didn\'t',
      demonstrated: {
        title: 'What was demonstrated',
        items: ['A working Ring-connected prototype.', 'End-to-end testing at a working restaurant.', 'A complete setup, comparison, owner-review, and history workflow in the prototype.', 'A completed hackathon submission with product story, design, demo, and video.']
      },
      open: [
        { title: 'What remains to validate', items: ['Whether owners distinguish Similar from Couldn\'t compare.', 'Whether they understand the available follow-up choices and can select an appropriate next step.'] },
        { title: 'Possible next improvements', items: ['Clearer feedback and effective recovery when a fresh capture fails.', 'Clear identification of the camera targeted by automatic checks.'] }
      ],
      note: 'Testing here was functional, not a formal usability evaluation. An October 26 audit also found that Home could omit older pending camera results, and whether that has been resolved is unverified.',
      reflection: null, // Monica's text goes here. While null, an editable slot shows on the page.
      reflectionLabel: 'Reflection',
      reflectionSlot: 'Monica to write'
    }
  };
})();
