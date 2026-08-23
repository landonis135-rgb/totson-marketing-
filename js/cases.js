/* ==========================================================================
   Totson Marketing — the three account types

   ┌──────────────────────────────────────────────────────────────────────┐
   │  THE TEXT IN THE RESULTS SECTION LIVES IN THE `CASES` OBJECT BELOW.  │
   │  Edit it here and the page follows. Nothing past the divider needs   │
   │  touching.                                                           │
   └──────────────────────────────────────────────────────────────────────┘

   These describe the SHAPE of the accounts we take over and the work we do
   on them. They deliberately contain no revenue figures, no multiples and
   no outcome claims, because we do not yet have client results we can put
   a name and a number against.

   When you do have a real, permissioned client result, that belongs in a
   named case study with the client's agreement — not in here.
   ========================================================================== */

const CASES = {
  skincare: {
    title: 'Cold-process skincare',
    meta: 'Few SKUs · founder-led · sold direct',
    story:
      "Skincare lives or dies on repeat purchase, so the account has to be built " +
      "for the second bottle rather than the first. Most of the ones we open have " +
      "been optimised for the first sale and nothing else.",
    inherit: [
      'One broad always-on campaign carrying years of stale learning.',
      'A single packshot doing all of the creative work.',
      'No post-purchase flow, so the second order never gets asked for.',
      'Pixel events firing on the wrong action, or firing twice.'
    ],
    change: [
      'Split the account by intent instead of running everything through one campaign.',
      "Rebuild the creative around the founder and the process, not the bottle.",
      'Fix attribution before touching budget, so the decisions use real numbers.',
      'Work on average order value before touching spend.'
    ]
  },

  streetwear: {
    title: 'Streetwear label, drop-based',
    meta: 'Organic following · revenue concentrated around releases',
    story:
      "A drop model concentrates a whole quarter into a few days, which makes the " +
      "account look like it is working during a release and dead the rest of the " +
      "time. The catalogue is usually the asset nobody is using.",
    inherit: [
      'The whole business living in a handful of releases a year.',
      'Paid switched on days before a drop and off again the week after.',
      'No always-on structure holding the back catalogue up.',
      'An audience built organically that the ad account has never been taught to use.'
    ],
    change: [
      'Build an always-on engine underneath the drops so the catalogue keeps working.',
      'Warm the list ahead of a release instead of buying attention on launch day.',
      'Separate the drop campaign from the catalogue campaign so neither eats the other.',
      'Carry the creative that worked on the last release into the next one.'
    ]
  },

  supplements: {
    title: 'Supplement brand, hero product',
    meta: 'Repeat-purchase category · growth flattened',
    story:
      "Supplements are a subscription business whether or not the brand sells a " +
      "subscription. When growth flattens here it is almost never the ad account " +
      "on its own — it is what happens after the first order.",
    inherit: [
      'A stuck account rather than a broken one — flat for months.',
      'A new customer costing roughly what their first order is worth.',
      'No subscription offer, so lifetime value stops at order one.',
      'Budget increases that move spend without moving profit.'
    ],
    change: [
      'Fix the back end first: subscription offer, then post-purchase flow.',
      'Make the second order the job of the first one.',
      'Only then work on the bid, with more room to pay per customer than before.',
      'Report on contribution margin, so a "working" campaign has to prove it.'
    ]
  }
};

/* ==========================================================================
   Hand-off — main.js reads this
   ========================================================================== */
window.GM = window.GM || {};
window.GM.CASES = CASES;
