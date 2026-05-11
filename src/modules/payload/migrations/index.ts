import * as migration_20260425_151449_i18n_localized_fields from './20260425_151449_i18n_localized_fields';
import * as migration_20260425_164359_open_graph_global from './20260425_164359_open_graph_global';
import * as migration_20260511_224454_add_displayLabel_to_socialLinks from './20260511_224454_add_displayLabel_to_socialLinks';

export const migrations = [
  {
    up: migration_20260425_151449_i18n_localized_fields.up,
    down: migration_20260425_151449_i18n_localized_fields.down,
    name: '20260425_151449_i18n_localized_fields',
  },
  {
    up: migration_20260425_164359_open_graph_global.up,
    down: migration_20260425_164359_open_graph_global.down,
    name: '20260425_164359_open_graph_global',
  },
  {
    up: migration_20260511_224454_add_displayLabel_to_socialLinks.up,
    down: migration_20260511_224454_add_displayLabel_to_socialLinks.down,
    name: '20260511_224454_add_displayLabel_to_socialLinks'
  },
];
