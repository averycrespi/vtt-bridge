export const ATTACK_WITH_WEAPON = "ATTACK_WITH_WEAPON";
export const CAST_CANTRIP = "CAST_CANTRIP"; //TODO
export const CAST_SPELL = "CAST_SPELL"; //TODO
export const ROLL_ABILITY_SCORE = "ROLL_ABILITY_SCORE";
export const ROLL_INITIATIVE = "ROLL_INITIATIVE";
export const ROLL_SAVING_THROW = "ROLL_SAVING_THROW";
export const ROLL_SKILL = "ROLL_SKILL";
export const USE_ACTION = "USE_ACTION";
export const USE_FEATURE = "USE_FEATURE";

const emote = (...parts) => "/em " + parts.join(" ");
const roll = (mod) => "/roll 1d20" + (mod !== "0" ? mod : "");

/**
 * Render a message as a series of commands.
 *
 * @param {Object} message
 * @returns {String}
 */
export const renderMessage = (message) => {
  let commands = [];
  switch (message.type) {
    case ATTACK_WITH_WEAPON:
      commands = [emote("attacks with", message.weapon), roll(message.mod)];
      break;
    case CAST_CANTRIP:
      break; //TODO
    case CAST_SPELL:
      break; //TODO
    case ROLL_ABILITY_SCORE:
      commands = [
        emote("is rolling", message.stat, "check"),
        roll(message.mod),
      ];
      break;
    case ROLL_INITIATIVE:
      commands = [emote("is rolling initiative"), roll(message.mod)];
      break;
    case ROLL_SAVING_THROW:
      commands = [emote("is rolling", message.stat, "save"), roll(message.mod)];
      break;
    case ROLL_SKILL:
      commands = [
        emote("is rolling", message.skill, "check"),
        roll(message.mod),
      ];
      break;
    case USE_ACTION:
      commands = [emote("uses", message.action), message.details];
      break;
    case USE_FEATURE:
      commands = [emote("uses", message.feature), message.details];
      break;
    default:
      console.error("Unknown message: ", JSON.stringify(message));
  }
  return commands.join("\n");
};
