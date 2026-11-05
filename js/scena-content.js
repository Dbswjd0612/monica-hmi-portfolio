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
        { label: 'Team', value: '2 people' },
        { label: 'Timeline', value: 'About 2 weeks' },
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
      heading: 'Ring captures the moments. Scena connects them to show what changed.',
      question: 'Is everything still where it should be?',
      body: [
        'After a long closing shift at a working sushi restaurant, small things can get missed: a door not fully closed, prep items left out.',
        'A Ring alert says a moment of activity occurred. Connecting those moments into the condition of the space, across time, is still the owner\'s job.'
      ],
      context: { src: null, w: 16, h: 9, label: 'Restaurant or Ring camera context photo', alt: '' },
      pair: [
        { caption: 'Before', image: { src: null, w: 16, h: 10, label: 'Approved before photo', alt: '' } },
        { caption: 'After', image: { src: null, w: 16, h: 10, label: 'Approved after photo', alt: '' } }
      ],
      pivotHeading: 'Event → State',
      pivotBody: 'The first idea was a closing checklist. It overlapped with Ring Modes and Motion Schedules, so we moved from following events to comparing states. The owner chooses a reference, chooses Care Spots, and decides the follow-up.',
      compare: [
        { title: 'Closing checklist', note: 'Initial idea', items: ['Reminders and alerts around closing', 'Follows events', 'Overlapped with Ring Modes and Motion Schedules'] },
        { title: 'State comparison', note: 'Direction we built', items: ['A saved reference of how the space should look', 'Compares owner-chosen areas across time', 'The owner decides the follow-up'] }
      ]
    },

    flow: {
      label: 'From system to flow',
      heading: 'What the owner asks, and what the system does',
      columns: ['User question', 'User action', 'System support'],
      rows: [
        ['What should this space look like?', 'Choose a reference and Care Spots.', 'Save the baseline and selected regions.'],
        ['What looks different?', 'Run a check and review the photos.', 'Obtain and validate the image, compare selected areas, and present an observation.'],
        ['Does this need my attention?', 'Choose a follow-up.', 'Preserve the observation and owner decision separately.']
      ]
    },

    decisions: {
      label: 'Key design decisions',
      heading: 'Evidence, observation and decision stay apart',
      note: 'Screens come from the submitted design file for the mobile-first web prototype and show a design scenario, not field-test captures. The team tested the live integration with real Ring cameras at a working sushi restaurant.',

      a: {
        label: 'Decision 1',
        heading: 'The owner defines what to watch',
        body: [
          'Scena does not assume what normal looks like. The owner picks the photo that shows the expected state, then marks the areas that matter.',
          'Each camera allows up to three Care Spots. Only those regions are compared.'
        ],
        items: [
          {
            caption: 'Select Reference',
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
      collaboration: 'Monica defined and checked the flows, states, and UI. Sungwoo implemented the integration and application behavior. On-site testing was shared.'
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
