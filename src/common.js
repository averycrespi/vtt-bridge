export const classes = {
  attackWithSpell: "vtt-attack-with-spell",
  attackWithWeapon: "vtt-attack-with-weapon",
  castSpell: "vtt-cast-spell",
  rollAbilityScore: "vtt-roll-ability-score",
  rollInitiative: "vtt-roll-initiative",
  rollProficiency: "vtt-roll-proficiency",
  rollSavingThrow: "vtt-roll-saving-throw",
  rollSkill: "vtt-roll-skill",
  rollWeaponDamage: "vtt-roll-weapon-damage",
  toggleVisibility: "vtt-toggle-visibility",
  useFeature: "vtt-use-feature",
};

export const messageType = { enqueue: 0, dequeue: 1, clear: 2 };

/**
 * Run a callback after an element loads.
 */
export const onElementLoad = (selector, callback) => onPredicate(() => !!document.querySelector(selector), callback);

/**
 * Run a callback after an element's child loads.
 */
export const onChildLoad = (element, selector, callback) =>
  onPredicate(() => !!element.querySelector(selector), callback);

/**
 * Run a callback after a predicate is satisfied.
 *
 * Uses exponential backoff with limited attempts.
 */
const onPredicate = (predicate, callback, attempts = 10, timeout = 100) => {
  if (predicate()) {
    callback();
  } else if (attempts <= 0) {
    console.warn("Maximum number of attempts exceeded");
  } else {
    setTimeout(function () {
      onPredicate(predicate, callback, attempts - 1, timeout * 2);
    }, timeout);
  }
};
